// TODO Marker Design offset icon and text
// TODO Cluster Markers
// TODO use fitBounds() for deciding zoom automatically
// TODO Refactor to hooks

import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import MarkerIcon from '@material-ui/icons/LocationOn';
import Typography from '@material-ui/core/Typography';
import { withStyles, mergeClasses } from '@material-ui/styles';

const styles = {
	'&marker > Typography': {
		// whiteSpace: 'nowrap',
		// wordBreak: 'break-word'
	}
};

const Marker = ({ text }) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
			<Typography
				variant="subtitle1"
				style={{
					whiteSpace: 'nowrap',
					textAlign: 'center',
					// wordBreak: 'break-word',
					fontSize: 12,
					padding: '1px 4px',
					border: '1px solid grey',
					borderRadius: '5px',

					backgroundColor: 'white'
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

	render() {
		const { center, zoom, classes, results, apiKey } = this.props;

		const markers = results.map((result) => {
			const { name, coordinates, url } = result;
			const { latitude, longitude } = coordinates;

			return <Marker lat={latitude} lng={longitude} text={name} key={name} className={classes.marker} />;
		});

		return (
			// Important! Always set the container height explicitly

			<div style={{ height: '100%', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: apiKey }}
					center={center}
					zoom={zoom}
					yesIWantToUseGoogleMapApiInternals
				>
					{markers}
					{/* <Marker lat={36.778261} lng={-119.4179324} text={'assda asdasd asdas'} className={classes.marker} /> */}
				</GoogleMapReact>
			</div>
		);
	}
}

export default withStyles(styles)(Map);

// { lat: 36.778261, lng: -119.4179324 }
