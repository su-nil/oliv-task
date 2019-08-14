import React, { Component } from 'react';
import SearchBox from './SearchBox';
import MyLocation from './MyLocation';

import { Switch } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = {
	root: {
		width: '100%',
		display: 'grid',
		gridTemplateColumns: '80% 20%',
		gridTemplateRows: '100%',
		backgroundColor: 'white',
		boxSizing: 'border-box',
		'@media (max-width: 960px)': {
			width: '95vw',
			display: 'grid',
			gridTemplateColumns: 'repeat(10, 10%)',
			gridTemplateRows: '55% 45%',
			rowGap: '7px',
			position: 'fixed',
			top: 0,
			left: 0,
			marginTop: '10px',
			marginLeft: '2.5vw'
		}
	},
	searchBox: {
		gridRow: '1 / 2',
		gridColumn: '1 / 2',
		'@media (max-width: 960px)': {
			gridRow: '1 / 2',
			gridColumn: '1 / -1'
		}
	},
	myLocationButton: {
		gridRow: '1 / 2',
		gridColumn: '2 / 3',
		'@media (max-width: 960px)': {
			gridRow: '2 / 3',
			gridColumn: '1 / span 5',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center'
		}
	},
	showMapButton: {
		display: 'none',
		'@media (max-width: 960px)': {
			gridRow: '2 / 3',
			gridColumn: 'span 5 / -1',
			display: 'flex',
			flexDirection: 'row',
			justifyContent: 'center',
			alignItems: 'center',
			fontSize: '0.7rem',
			fontWeight: 500,
			textTransform: 'uppercase',
			padding: '0 10px',
			border: '1px solid lightgrey',
			borderRadius: '4px',
			marginLeft: '5px'
		}
	}
};

class Header extends Component {
	render() {
		const { classes, fetchResults, submitMyLocation, handleShowMap, handleError, showMap } = this.props;
		return (
			<div className={classes.root}>
				<div className={classes.searchBox}>
					<SearchBox fetchResults={fetchResults} handleError={handleError} />
				</div>
				<div className={classes.myLocationButton}>
					<MyLocation submitMyLocation={submitMyLocation} />
				</div>
				<div className={classes.showMapButton}>
					<span>Show Map</span>
					<Switch color="primary" value={showMap} onChange={handleShowMap} checked={showMap} />
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(Header);
