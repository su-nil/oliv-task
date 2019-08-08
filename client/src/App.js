import React, { Component } from 'react';
import SearchBox from './SearchBox';
import CurrentLocation from './CurrentLocation';
import SearchResults from './SearchResults';
import Map from './Map';
// import MapTest from './MapTest';
import './App.css';

class App extends Component {
	render() {
		return (
			<div className="App">
				<SearchBox />
				<CurrentLocation />
				<SearchResults />
				<Map />
				{/* <MapTest /> */}
			</div>
		);
	}
}

export default App;
