// TODO Fetch API key from backend
// TODO Marker Design
// TODO Decide zoom automatically based on area size

import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';

const Marker = ({ text }) => <h4>{text}</h4>;

class Map extends Component {
	static defaultProps = {
		center: {
			lat: 59.95,
			lng: 30.33
		},
		zoom: 13
	};

	render() {
		const markers = this.props.results.map((result) => {
			const { name, coordinates, url } = result;
			const { latitude, longitude } = coordinates;
			return <Marker lat={latitude} lng={longitude} text={name} key={name} />;
		});
		return (
			// Important! Always set the container height explicitly

			<div style={{ height: '100vh', width: '100%' }}>
				<GoogleMapReact
					bootstrapURLKeys={{ key: 'AIzaSyDAQOhuvUriLPgDzVblnSSH7BUj-s2EMSw' }}
					// defaultCenter={this.props.center}
					// defaultZoom={this.props.zoom}
					center={this.props.center}
					zoom={this.props.zoom}
				>
					{markers}
				</GoogleMapReact>
			</div>
		);
	}
}

export default Map;
