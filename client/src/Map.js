// TODO Marker location offset
// TODO Cluster Markers
// TODO use fitBounds() for deciding zoom automatically
// TODO Refactor to hooks

import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import { getCenter } from 'google-map-react/utils';
import uuid from 'uuid';

import MarkerIcon from '@material-ui/icons/LocationOn';
import Typography from '@material-ui/core/Typography';
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
		alignItems: 'center'
	},
	markerText: {
		textAlign: 'center',
		fontSize: 12,
		padding: '1px 4px',
		border: '1px solid grey',
		borderRadius: '5px',
		backgroundColor: 'white',
		maxWidth: '8rem',
		overflowWrap: 'normal'
	},
	markerIcon: {
		color: '#cc3333'
	}
};

// const Marker = ({ text, classes }) => {
// 	return (
// 		<div className={classes.marker}>
// 			<span className={classes.markerText}>{text}</span>
// 			<MarkerIcon className={classes.markerIcon} />
// 		</div>
// 	);
// };

class Map extends Component {
	constructor(props) {
		super(props);
		this.state = {
			mapsApiKey: '',
			map: {},
			maps: {},
			markers: []
		};
		this.handleApiLoaded = this.handleApiLoaded.bind(this);
		this.handleChange = this.handleChange.bind(this);
	}

	handleApiLoaded({ map, maps }) {
		this.setState((state) => ({ ...state, map, maps }));
		const map1 = this.state.map;

		if (!(Object.entries(map1).length === 0 && map1.constructor === Object)) {
			map1.addListener('idle', () => {
				const coordinates = {
					lat: map1.center.lat(),
					lng: map1.center.lng()
				};
				console.log(this);
				this.props.fetchResultsWhenBoundsChange(coordinates, map);
			});
		}
	}

	handleChange() {
		console.log('moving');
		console.log(this);
		const map = this.state.map;
	}

	componentWillReceiveProps(nextProps) {
		// console.log('inside cmp will receive props');

		const { map, maps } = this.state;
		const { results } = nextProps;

		console.log('inside will receiece props', results);

		// Clear old markers before adding new ones
		// this.setState((state) => {
		// 	state.markers.map((marker) => marker.setMap(null));
		// 	return { ...state, markers: [] };
		// });
		// console.log('1', this.state.markers);

		let markers = results.map((result) => {
			const { name, coordinates } = result;
			const { latitude: lat, longitude: lng } = coordinates;
			// Add new marker for each result
			const marker = new maps.Marker({
				position: { lat, lng },
				map: map,
				title: name
			});
			return marker;
		});

		this.setState(
			(state) => ({ ...state, markers }),
			() => console.log(' inside comp will recive props markers:', this.state.markers)
		);
		// console.log(' inside comp will recive props markers:', this.state.markers);
	}

	shouldComponentUpdate(nextProps, nextState) {
		const { lat: nxtLat, lng: nxtLng } = nextProps.center;
		const { lat, lng } = this.props.center;
		if (lat === nxtLat && lng === nxtLng) return false;
		return true;
	}

	// componentWillUpdate() {
	// 	console.log('inside comp d updt', this.state.markers);
	// }

	// componentDidMount() {
	// 	console.log('inside comp did mount', this.state.markers);
	// }

	render() {
		const { map, maps } = this.state;
		const { center, zoom, classes, results, apiKey } = this.props;

		console.log(center);

		// const markers = results.map((result) => {
		// 	const { name, coordinates } = result;
		// 	const { latitude, longitude } = coordinates;
		// 	return <Marker lat={latitude} lng={longitude} text={name} key={uuid()} classes={classes} />;
		// });

		return (
			<div className={classes.root}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: apiKey }}
					center={center}
					zoom={zoom}
					yesIWantToUseGoogleMapApiInternals={true}
					onGoogleApiLoaded={({ map, maps }) => this.handleApiLoaded({ map, maps })}
					onChange={this.handleChange}
				>
					{/* {markers} */}
				</GoogleMapReact>
			</div>
		);
	}
}

export default withStyles(styles)(Map);

// { lat: 36.778261, lng: -119.4179324 }

// top: -5251.12px
