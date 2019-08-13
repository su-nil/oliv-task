// TODO try catch for all async/await and promises, display MateriaalUI dialog when there is an error
// TODO Refactor styles, possibly move it to a separate file
// TODO Move inline styles to styles object
// TODO Figure out proper way to fetch API key from backend server
// TODO Use LocalStorage to display restaurants
// TODO Employ react router with LatLng/place as req parameter
// TODO Refactor to Hooks

import React, { Component } from 'react';
import ResultsArea from './ResultsArea';
import Map from './Map';
import Header from './Header';

import yelpResults from './yelpHelper';
import geoLocate from './geolocationHelpher';
import getApiKey from './getApiKey';

import styled from 'styled-components';
import { withStyles } from '@material-ui/styles';

/*
Note: Temporarily using API key on client side since fetching Api Key from backend darkens map 
and prompts that the maps is not rendered properly 
*/

const MAPS_API_KEY = 'AIzaSyDAQOhuvUriLPgDzVblnSSH7BUj-s2EMSw';

const styles = {
	root: {
		display: 'grid',
		height: '100vh',
		gridTemplateRows: '90px 1fr',
		gridTemplateColumns: '30vw 70vw',
		'@media (max-width: 960px)': {
			display: 'grid',
			gridTemplateRows: '130px 1fr',
			gridTemplateColumns: '100vw'
		}
	},

	header: {
		gridRow: '1 / 2',
		gridColumn: '2 / 3',
		margin: 'auto 20px',
		'@media (max-width: 960px)': {
			gridRow: '1 / 2',
			gridColumn: '1 / 2',
			margin: 'auto 10px'
		}
	},
	results: {
		gridRow: '1 / 3',
		gridColumn: '1 / 2',
		'@media (max-width: 960px)': {
			gridRow: '-2 / -1',
			gridColumn: '1 / 2'
		}
	},
	map: {
		gridRow: '2 / 3',
		gridColumn: '2 / 3',
		'@media (max-width: 960px)': {
			gridRow: '-2 / -1',
			gridColumn: '1 / 2'
		}
	}
};

// styled components to toggle display of maps/results
const DisplayMap = styled.div`@media (max-width: 960px) {${(props) => props.displayMap}}`;
const DisplayResults = styled.div`@media (max-width: 960px) {${(props) => props.displayResults}}`;

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mapsApiKey: '',
			restaurants: [],
			coordinates: { lat: 36.778261, lng: -119.4179324 },
			resultsArea: 'startsearch',
			showMap: false
		};
		this.fetchResults = this.fetchResults.bind(this);
		this.submitMyLocation = this.submitMyLocation.bind(this);
		this.handleShowMap = this.handleShowMap.bind(this);
	}

	async fetchResults(place) {
		this.setState((state) => ({ ...state, resultsArea: 'loading' }));
		const { geometry: { location: coordinates } } = place;
		const restaurants = await yelpResults(coordinates);
		this.setState((state) => ({ ...state, restaurants, coordinates, resultsArea: 'results' }));
	}

	async submitMyLocation() {
		const { latitude: lat, longitude: lng } = await geoLocate();
		const coordinates = { lat, lng };
		const restaurants = await yelpResults(coordinates);
		this.setState((state) => ({ ...state, restaurants, coordinates }));
	}

	handleShowMap(event, checked) {
		this.setState((state) => ({ ...state, showMap: checked }));
	}

	render() {
		const { classes } = this.props;
		const { restaurants, coordinates, resultsArea, showMap } = this.state;
		const displayMap = showMap ? '' : 'display: none;';
		const displayResults = showMap ? 'display: none;' : '';

		return (
			<div className={classes.root}>
				<div className={classes.header}>
					<Header
						fetchResults={this.fetchResults}
						submitMyLocation={this.submitMyLocation}
						handleShowMap={this.handleShowMap}
						showMap={showMap}
					/>
				</div>
				{/* <div className={classes.showMapButton}>
					<span>Show Map</span>
					<Switch color="primary" value={showMap} onChange={this.handleShowMap} checked={showMap} />
				</div> */}

				<DisplayMap className={classes.map} displayMap={displayMap}>
					<Map results={restaurants} center={coordinates} zoom={13} apiKey={MAPS_API_KEY} />
				</DisplayMap>
				<DisplayResults className={classes.results} displayResults={displayResults}>
					<ResultsArea results={restaurants} resultsArea={resultsArea} />
				</DisplayResults>
			</div>
		);
	}
}

export default withStyles(styles)(App);
