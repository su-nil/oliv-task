// TODO Yelpresults not return empty if place is not searchable

import React, { Component } from 'react';
import to from 'await-to-js';
import ResultsArea from './ResultsArea';
import Map from './Map';
import Header from './Header';

import yelpResults from './yelpHelper';
import geoLocate from './geolocationHelpher';

import styled from 'styled-components';
import { withStyles } from '@material-ui/styles';

const MAPS_API_KEY = 'AIzaSyDAQOhuvUriLPgDzVblnSSH7BUj-s2EMSw';

const styles = {
	root: {
		display: 'grid',
		height: '100vh',
		borderTop: '1px solid lightgrey',
		gridTemplateRows: '90px 1fr',
		gridTemplateColumns: '30vw 70vw',
		'@media (max-width: 960px)': {
			width: '100vw',
			display: 'grid',
			gridTemplateRows: '100vh',
			gridTemplateColumns: '100vw'
		}
	},
	header: {
		gridRow: '1 / 2',
		gridColumn: '2 / 3',
		margin: 'auto 20px',
		zIndex: 100
	},
	results: {
		gridRow: '1 / 3',
		gridColumn: '1 / 2',
		zIndex: 0,
		'@media (max-width: 960px)': {
			paddingTop: '120px',
			width: '100vw',
			gridRow: '1 / -1',
			gridColumn: '1 / -1'
		}
	},
	map: {
		gridRow: '2 / 3',
		gridColumn: '2 / 3',
		zIndex: 0,
		'@media (max-width: 960px)': {
			paddingTop: '120px',
			width: '100vw',
			gridRow: '1 / -1',
			gridColumn: '1 / -1'
		}
	},
	fixedDiv: {
		display: 'none',
		zIndex: 1,
		'@media (max-width: 960px)': {
			display: 'block',
			position: 'fixed',
			top: 0,
			left: 0,
			height: '120px',
			width: '100vw',
			backgroundColor: 'white',
			boxShadow: '0px 1px 3px 1px rgba(0,0,0,0.15)'
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
			showMap: false,
			error: ''
		};
		this.fetchResults = this.fetchResults.bind(this);
		this.submitMyLocation = this.submitMyLocation.bind(this);
		this.handleShowMap = this.handleShowMap.bind(this);
		this.handleErrorChange = this.handleErrorChange.bind(this);
	}

	async fetchResults(place) {
		this.setState((state) => ({ ...state, resultsArea: 'loading' }));
		const { geometry: { location: coordinates } } = place;

		let error, err, restaurants;

		[ err, restaurants ] = await to(yelpResults(coordinates));
		if (!restaurants) {
			error = 'Yelp API not working.';
			console.error(err);
			console.log('ERROR:', error);
			this.handleErrorChange(error);
			return;
		} else if (restaurants.length === 0) {
			error = 'Unable to find restaurants in the searched location.';
			console.error(err);
			console.log('ERROR:', error);
			this.handleErrorChange(error);
			return;
		} else {
			this.setState((state) => ({ ...state, restaurants, coordinates, resultsArea: 'results' }));
		}
	}

	async submitMyLocation() {
		let error, err, coordinates, restaurants;

		[ err, coordinates ] = await to(geoLocate());
		if (!coordinates) {
			error = 'Unable to fetch your location.';
			console.error(err);
			console.log('ERROR:', error);
			this.handleErrorChange(error);
			return;
		} else {
			this.setState((state) => ({ ...state, coordinates }));
		}

		[ err, restaurants ] = await to(yelpResults(coordinates));
		if (!restaurants) {
			error = 'Yelp API not working.';
			console.error(err);
			console.log('ERROR:', error);
			this.handleErrorChange(error);
			return;
		} else if (restaurants.length === 0) {
			error = 'Unable to find restaurants in your current location. Try searching in some other location.';
			console.error(err);
			console.log('ERROR:', error);
			this.handleErrorChange(error);
			return;
		} else {
			this.setState((state) => ({ ...state, restaurants }));
		}
	}

	handleShowMap(event, checked) {
		this.setState((state) => ({ ...state, showMap: checked }));
	}

	handleErrorChange(error) {
		this.setState((state) => ({ ...state, restaurants: [], resultsArea: 'startsearch', error }));
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
						handleErrorChange={this.handleErrorChange}
					/>
				</div>
				<div className={classes.fixedDiv} />
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
