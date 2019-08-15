// TODO Marker location offset
// TODO Cluster Markers
// TODO use fitBounds() for deciding zoom automatically
// TODO Refactor to hooks

import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import uuid from 'uuid';

import MarkerIcon from '@material-ui/icons/LocationOn';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/styles';

const styles = {
	root: {
		width: '100%',
		height: '100%',
		borderTop: '1px solid lightgrey'
	}
};

const Marker = ({ text }) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
			<Typography
				variant="subtitle1"
				style={{
					textAlign: 'center',
					fontSize: 12,
					padding: '1px 4px',
					border: '1px solid grey',
					borderRadius: '5px',
					backgroundColor: 'white',
					maxWidth: '8rem',
					overflowWrap: 'normal'
				}}
			>
				{text}
			</Typography>

			<MarkerIcon
				style={{
					color: '#cc3333'
				}}
			/>
		</div>
	);
};

class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mapsApiKey: ''
		};
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { lat: nxtLat, lng: nxtLng } = nextProps.center;
		const { lat, lng } = this.props.center;
		if (lat === nxtLat && lng === nxtLng) return false;
		return true;
	}

	render() {
		const { center, zoom, classes, results, apiKey } = this.props;

		const markers = results.map((result) => {
			const { name, coordinates } = result;
			const { latitude, longitude } = coordinates;
			return <Marker lat={latitude} lng={longitude} text={name} key={uuid()} className={classes.marker} />;
		});

		return (
			<div className={classes.root}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: apiKey }}
					center={center}
					zoom={zoom}
					yesIWantToUseGoogleMapApiInternals
				>
					{markers}
				</GoogleMapReact>
			</div>
		);
	}
}

export default withStyles(styles)(Map);

// { lat: 36.778261, lng: -119.4179324 }
