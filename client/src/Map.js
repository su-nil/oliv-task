// TODO Marker location offset, or use google API for markers
// TODO Marker clustering and hover/click

import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import uuid from 'uuid';

import MarkerIcon from '@material-ui/icons/LocationOn';
import { withStyles } from '@material-ui/styles';

const styles = {
	root: {
		width: '100%',
		height: '100%',
		borderTop: '1px solid lightgrey'
	},
	marker: {
		display: 'flex',
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
		width: 'auto',
		flexWrap: 'row wrap'
	},
	markerText: {
		textAlign: 'center',
		fontSize: 12,
		padding: '1px 4px',
		border: '1px solid grey',
		borderRadius: '5px',
		backgroundColor: 'white',
		maxWidth: '9rem',
		overflowWrap: 'normal'
	},
	markerIcon: {
		color: '#cc3333'
	}
};

const Marker = ({ text, classes }) => {
	return (
		<div className={classes.marker}>
			<span className={classes.markerText}>{text}</span>
			<MarkerIcon className={classes.markerIcon} />
		</div>
	);
};

class Map extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		// Update component only when the results change
		// Avoids rer-ender every time showMap is toggled
		const { lat: nxtLat, lng: nxtLng } = nextProps.center;
		const { lat, lng } = this.props.center;
		if (lat === nxtLat && lng === nxtLng) return false;
		return true;
	}

	render() {
		const { center, zoom, classes, results, apiKey } = this.props;

		// Create Markers
		const markers = results.map((result) => {
			const { name, coordinates } = result;
			const { latitude, longitude } = coordinates;
			return <Marker lat={latitude} lng={longitude} text={name} key={uuid()} classes={classes} />;
		});

		return (
			<div className={classes.root}>
				<GoogleMapReact bootstrapURLKeys={{ key: apiKey }} center={center} zoom={zoom}>
					{markers}
				</GoogleMapReact>
			</div>
		);
	}
}

export default withStyles(styles)(Map);
