import React, { Component } from 'react';
import axios from 'axios';

class App extends Component {
	// initialize our state
	state = {
		data: [],
		id: 0,
		message: null,
		intervalIsSet: false,
		idToDelete: null,
		idToUpdate: null,
		objectToUpdate: null,
	};
	
	// When the component mounts it fetches existing data from db
	// then add a polling logic to see if our db has changed and update
	// the UI with those changes (NOTE: this is for a messaging app
	// so does not necessarily apply to our app).
	
	componentDidMount() {
	// This code will run once `App` loads.
	// I've left the example in place for a placeholder.
		this.getDataFromDB();
		if(!this.state.intervalIsSet){
			let interval = setInterval(this.getDataFromDb, 1000);
			this.setState({ intervalIsSte: interval });
		}
	}
	
	// kill a process every time we are done using it
	componentWillUnmount() {
		if (this.state.intervalIsSet){
			clearInterval(this.state.intervalIsSet);
			this.setState({ intervalIsSet: null });
		}
	}
	
	/* In the front end we use the id key of the data object to identify
	 * which we want to update or delete.
	 * The backend will use the objectID assigned by firebase to modify
	 * database entries.*/
	
	// get method: uses the backedn api to fetch data from the database.
	getDataFromDB = () => {
		// backend address -- update this if needed
		fetch('https://robbiesapiteam.herokuapp.com/api/getData')
			.then((data) => data.json())
			.then((res)  => this.setState({ data: res.data}));
	};
	
	// put method: use backend api to create new query into database.
	putDataToDB = (message) => {
		let currentIds = this.state.data.map((data) => data.id);
		let idToBeAdded = 0;
		while (currentIds.includes(idToBeAdded)) {
			++idToBeAdded;
		}
		
		axios.post('https://robbiesapiteam.herokuapp.com/api/putData', {
			id: idToBeAdded,
			message: message
		});
	};
	
	// delete method: backend api to delete existing database info
	deleteFromDB = (idTodelete) => {
		parseInt(idTodelete);
		let objIdToDelete = null;
		this.state.data.forEach((dat) => {
			if (dat.id == idTodelete) {
				objIdToDelete = dat._id;
			}
		});
		axios.delete('https://robbiesapiteam.herokuapp.com/api/deleteData', {
			data: {
				id: objIdToDelete,
			}
		});
	};

	// update method: overwrite existing database info
	updateDB = (idToUpdate, updateToApply) => {
		let objIdToUpdate= null;
		parseInt(idToUpdate);
		this.state.data.forEach((dat) => {
			if (dat.id == idToUpdate) {
				objIdToUpdate = dat._id;
			}
		});
		axios.post('https://robbiesapiteam.herokuapp.com/api/updateData', {
			id: objIdToUpdate,
			update: { message: updateToApply }
		});
	};
	
	// UI/render
	render() {
		const { data } = this.state;
		return (
			<div>
				<ul>
					{data.length <= 0
						? 'NO DB ENTRIES YET'
						: data.map((dat) => (
							<li style = {{padding: '10px' }} key={data.message}>
								<span style={{color: 'gray'}}> id: </span>{dat.id} <br />
								<span style={{color: 'gray'}}> data: </span> {dat.message}
							</li>
						))
					}
				</ul>
				<div style={{padding: '10px'}}>
					<input
						type="text"
						onchange={(e) => this.setstate({ message: e.target.value})}
						placeholder="add something in the database"
						style={{width: '200px'}}
					/>
					<button onclick={() => this.putDataToDB(this.state.message)}>
					add
					</button>
				</div>
				<div style={{padding: '10px'}}>
					<input
						type="text"
						onchange={(e) => this.setstate({ idToDelete: e.target.value})}
						placeholder="put id of item to delete here"
						style={{width: '200px'}}
					/>
					<button onclick={() => this.deleteFromDB(this.state.idToDelete)}>
					DELETE
					</button>
				</div>
				<div style={{padding: '10px'}}>
					<input
						type="text"
						onchange={(e) => this.setstate({ idToUpdate: e.target.value})}
						placeholder="put id of item to update here"
						style={{width: '200px'}}
					/>
					<input
						type="text"
						onchange={(e) => this.setstate({ updateToApply: e.target.value})}
						placeholder="put new value of the item here"
						style={{width: '200px'}}
					/>
					<button onclick={() => this.updateDB(this.state.idToUpdate, this.state.updateToApply)}>
					Update
					</button>
				</div>
			</div>
		);
	}
}

/*function App() {
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}
*/
export default App;
