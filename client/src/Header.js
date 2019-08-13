import React, { Component } from 'react';
import SearchBox from './SearchBox';
import MyLocation from './MyLocation';

import { Switch, Hidden, FormControlLabel } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = {
	root: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-evenly',
		flexWrap: 'wrap',
		padding: '1%',
		'@media (max-width: 960px)': {
			paddingBottom: '0'
		}
	},
	searchBox: {},
	myLocationButton: {},
	showMapButton: {}
};

class Header extends Component {
	render() {
		const { classes, fetchResults, submitMyLocation } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.searchBox}>
					<SearchBox fetchResults={fetchResults} />
				</div>
				<div className={classes.myLocationButton}>
					<MyLocation submitMyLocation={submitMyLocation} />
				</div>
				<Hidden mdUp>
					<div className={classes.showMapButton}>
						<Switch color="primary" value="showMap" />
						<span>Show Map</span>
					</div>
				</Hidden>
			</div>
		);
	}
}

export default withStyles(styles)(Header);
