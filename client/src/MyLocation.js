// TODO Refactor to Hooks
// TODO Move inline styles to style object

import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { Hidden, Button } from '@material-ui/core';

const styles = {
	button: {
		margin: '10px',
		padding: '15px',
		height: '56px'
	}
};
export class MyLocation extends Component {
	render() {
		const { classes, submitMyLocation } = this.props;
		return (
			<div className="CurrentLocation">
				<Button onClick={submitMyLocation} className={classes.button} variant="contained" color="primary">
					<MyLocationIcon />
					<Hidden only={[ 'sm', 'md' ]}>
						<span style={{ marginLeft: '3%', whiteSpace: 'nowrap' }}>Use My Location</span>
					</Hidden>
				</Button>
			</div>
		);
	}
}

export default withStyles(styles)(MyLocation);
