// TODO Refactor to Hooks
// TODO Move inline styles to style object

import React, { Component } from 'react';
import { withStyles } from '@material-ui/styles';
import MyLocationIcon from '@material-ui/icons/MyLocation';
import { Button } from '@material-ui/core';

const styles = {
	root: {
		width: '100%',
		height: '100%',
		padding: '0',
		'@media (max-width: 960px)': {
			marginRight: '5px'
		}
	},
	myLocationButton: {
		width: '100%',
		height: '100%',
		'@media (max-width: 960px)': {
			marginRight: '5px'
		}
	},
	myLocationButtonText: {
		marginLeft: '5%',
		whiteSpace: 'nowrap',
		fontSize: '12px',
		'@media (max-width: 960px)': {
			// display: 'none'
			fontSize: '0.7rem'
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
