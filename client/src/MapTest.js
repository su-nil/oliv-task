import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import SearchBox from './SearchBoxTest';
import './Map.css';

// const AnyReactComponent = ({ text }) => <div>{text}</div>;
const API_KEY = 'AIzaSyDAQOhuvUriLPgDzVblnSSH7BUj-s2EMSw';

class MapTest extends Component {
	constructor(props) {
		super(props);

		this.state = {
			mapsApiLoaded: false,
			mapInstance: null,
			mapsapi: null
		};
	}

	apiLoaded = (map, maps) => {
		this.setState({
			mapsApiLoaded: true,
			mapInstance: map,
			mapsapi: maps
		});
	};

	render() {
		const { mapsApiLoaded, mapInstance, mapsapi } = this.state;
		return (
			<div className="Map">
				<GoogleMapReact
					bootstrapURLKeys={{
						key: API_KEY,
						libraries: [ 'places', 'drawing' ]
					}}
					defaultCenter={{
						lat: 59.95,
						lng: 30.33
					}}
					defaultZoom={10}
					yesIWantToUseGoogleMapApiInternals
					onGoogleApiLoaded={({ map, maps }) => {
						this.apiLoaded(map, maps);
					}}
				>
					{mapsApiLoaded && <SearchBox map={mapInstance} mapsapi={mapsapi} />}
				</GoogleMapReact>
			</div>
		);
	}
}

export default MapTest;
