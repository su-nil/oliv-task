// TODO Refactor to Hooks
// TODO Move inline styles to style object

import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { Hidden, Button } from '@material-ui/core';

const styles = {
	root: {
		width: '100%',
		height: '100%',
		'@media (max-width: 960px)': {
			padding: '0 5%'
		}
	},
	myLocationButton: {
		width: '100%',
		height: '100%'
	},
	myLocationButtonText: {
		marginLeft: '5%',
		whiteSpace: 'nowrap',
		'@media (max-width: 960px)': {
			display: 'none'
		}
	}
};
export class MyLocation extends Component {
	render() {
		const { classes, submitMyLocation } = this.props;
		return (
			<div className={classes.root}>
				<Button
					onClick={submitMyLocation}
					className={classes.myLocationButton}
					variant="contained"
					color="primary"
				>
					<MyLocationIcon />
					<span className={classes.myLocationButtonText}>My Location</span>
				</Button>
			</div>
		);
	}
}

export default withStyles(styles)(MyLocation);
