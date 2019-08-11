import React, { Component } from 'react';
import Grid from '@material-ui/core/Grid';
// import SearchBox from './SearchBox';
import SearchBox from './SearchBox';
import SearchResults from './SearchResults';
import Map from './Map';
import yelpResults from './yelpHelper';
import './App.css';
/*
TODO isLoading
TODO Hooks
TODO Layout
TODO Use current Location
TODO Use Geolocation value to send to Yelp API
*/
class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			restaurants: [],
			location: {
				lat: null,
				lng: null
			}
		};

		this.fetchResults = this.fetchResults.bind(this);
	}

	async fetchResults(place) {
		const { formatted_address: name, geometry: { location } } = place;
		const restaurants = await yelpResults(name);
		this.setState({ restaurants, location });
	}

	async submitMyLocation() {
		// fetch results with current location
	}

	render() {
		return (
			<div className="App">
				<Grid container>
					<Grid item xs={8}>
						<SearchBox fetchResults={this.fetchResults} />
					</Grid>
					<Grid item xs={4}>
						<SearchResults results={this.state.restaurants} />
					</Grid>
					<Grid item xs={8}>
						<Map results={this.state.restaurants} center={this.state.location} />
					</Grid>
				</Grid>
			</div>
		);
	}
}

export default App;
