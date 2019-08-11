import React, { Component } from 'react';
import Button from '@material-ui/core/Button';

export class CurrentLocation extends Component {
	render() {
		return (
			<div className="CurrentLocation">
				<Button>Use My Location</Button>
			</div>
		);
	}
}

export default CurrentLocation;
