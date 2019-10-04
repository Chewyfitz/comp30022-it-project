import React from 'react';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Badge from '@material-ui/core/Badge';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import MatLink from '@material-ui/core/Link';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import NotificationsIcon from '@material-ui/icons/Notifications';
import { SideOpenStore } from '../../index.js';
import { createStore } from 'redux'
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import ReactDOM from 'react-dom';

//const SideOpenStore=index.SideOpenStore;

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <MatLink color="inherit" href="https://material-ui.com/">
        Your Website
      </MatLink>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
	position: 'fixed',
  },
  toolbar: {
    paddingRight: 0, // keep right padding when drawer closed
  },
  toolbarIcon: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: '0 8px',
    ...theme.mixins.toolbar,
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  menuButtonHidden: {
    display: 'none',
  },
  title: {
    flexGrow: 1,
  },
  drawerPaper: {
    position: 'fixed',
    whiteSpace: 'nowrap',
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerPaperClose: {
    overflowX: 'hidden',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    width: theme.spacing(0),
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(0),
    },
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '100vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(4),
    paddingBottom: theme.spacing(4),
  },
  paper: {
    padding: theme.spacing(2),
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
  },
  fixedHeight: {
    height: 240,
  },
}));

export default function Dashboard() {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const handleDrawerOpen = () => {
    SideOpenStore.dispatch({ type: 'Open'});
	setOpen(true);
  };
  const handleDrawerClose = () => {
    SideOpenStore.dispatch({ type: 'Close'});
	setOpen(false);
  };
  const fixedHeightPaper = clsx(classes.paper, classes.fixedHeight);

  return (
  <div className={classes.root}>
      <CssBaseline />
      <AppBar className={clsx(classes.appBar, open && classes.appBarShift)}>
        <Toolbar className={classes.toolbar}>
          <IconButton
            edge="start"
            color="inherit" 
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            className={clsx(classes.menuButton, open && classes.menuButtonHidden)}
          >
            <MenuIcon />
          </IconButton>
          <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <li>
				<Link to="/" style={{ color:'black' }}>Home </Link>
			</li>
          </Typography>
		  <Typography component="h1" variant="h6" color="inherit" noWrap className={classes.title}>
            <li>
				<Link to="/SignUp" style={{ color:'black' }}>Sign Up</Link>
			</li>
          </Typography>
		  <Typography component="h1" variant="h6" color="black" noWrap className={classes.title}>
            <li>
				<Link to="/Album" style={{ color:'black' }}>Search</Link>
			</li>
          </Typography>
		  <Typography component="h1" variant="h6" color="black" noWrap className={classes.title} style={{ color:'black' }}>
            Text
          </Typography>
          {/*<IconButton color="inherit">
		  <Badge badgeContent={4} color="secondary">
              <NotificationsIcon />
		  </Badge>
          </IconButton>*/}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List style={{maxHeight: '100vh', overflow: 'auto'}}>
		<ListItem button>
		<ListItemText primary="Album1" />
		</ListItem>
		<ListItem button>
		<ListItemText primary="Album1" />
		</ListItem>
		<ListItem button>
		<ListItemText primary="Album1" />
		</ListItem>
		<ListItem button>
		<ListItemText primary="Album1" />
		</ListItem>
		<ListItem button>
		<ListItemText primary="Album1" />
		</ListItem>
		<ListItem button>
		<ListItemText primary="Album1" />
		</ListItem>
		<ListItem button>
		<ListItemText primary="Album1" />
		</ListItem>
		<ListItem button>
		<ListItemText primary="Album1" />
		</ListItem>
		<ListItem button>
		<ListItemText primary="Album1" />
		</ListItem>
		<ListItem button>
		<ListItemText primary="Album1" />
		</ListItem>
		<ListItem button>
		<ListItemText primary="Album1" />
		</ListItem>
		<ListItem button>
		<ListItemText primary="Album1" />
		</ListItem>
		<ListItem button>
		<ListItemText primary="Album1" />
		</ListItem>
		<ListItem button>
		<ListItemText primary="Album1" />
		</ListItem>
		<ListItem button>
		<ListItemText primary="Album1" />
		</ListItem>
		</List>
        {//<Divider />
        //<List></List>
		}
      </Drawer>
	  </div>
  );
}
