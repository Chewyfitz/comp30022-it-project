// server.js Aidan Fitzpatrick (835833)
/*
*	A node.js server to serve an api on http://[url]:process.env.PORT/api/
*	This is the main routing file, and is used in conjunction with database 
*	interactors written by Patrick to send data to a Firebase "FireStore" 
*	database.
*	If you want to use this server in your own environment you can define
*	environment variables, or alternatively create a file titled '.env' in the
*	server's root directory with the firebase access configuration variables
*	defined.
*/

// Base code taken from medium.com
// url: medium.com/javascript-in-plain-english/full-stack-mongodb-react-node-js-express-js-in-one-simple-app-6cc8ed6de274
// though at this point I'm confident it is distinct enough that I can consider it to be my own work.

// ** Components used for logging - not currently used
// var cors = require ('cors');
// const logger = require('morgan');
// app.use(cors());
// app.use(bodyParser.urlencoded({extended: false}));
// app.use(logger('dev'));

const bodyParser = require('body-parser');
const express = require('express');
require('dotenv').config();
const API_PORT = process.env.PORT || 3001;
const app = express();
app.use(bodyParser.json());

const MainRouter = express.Router();

// Route Handlers
MainRouter.use('/image', require('./routes/image'));
MainRouter.use('/album', require('./routes/album'));
MainRouter.use('/user', require('./routes/user'));

// Not yet Implemented:
/* MainRouter.use('/register', require('./routes/signup')); */
// Not sure if /login or /auth would be better (one might be more useful/general)
/* MainRouter.use('/login', require('./routes/login')); */
/* MainRouter.use('/auth', require('./routes/auth')); */

// prepend '/api' for our http requests 
app.use('/api', MainRouter);


// launch our backend into a port
app.listen(API_PORT, () => console.log('LISTENING ON PORT '+API_PORT));

