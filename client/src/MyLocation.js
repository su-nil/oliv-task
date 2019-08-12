import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import { withStyles } from '@material-ui/styles';
import MyLocationIcon from '@material-ui/icons/MyLocation';

const styles = {
	button: {
		margin: '0px 10px',
		padding: '15px'
	}
};
export class MyLocation extends Component {
	render() {
		const { classes, submitMyLocation } = this.props;
		return (
			<div className="CurrentLocation">
				<Button onClick={submitMyLocation} className={classes.button} variant="contained" color="primary">
					<MyLocationIcon style={{ marginRight: '7px' }} />
					Use My Location
				</Button>
			</div>
		);
	}
}

export default withStyles(styles)(MyLocation);
