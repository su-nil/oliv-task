import React, { Component } from 'react';
import SearchBox from './SearchBox';
import MyLocation from './MyLocation';

import { withStyles } from '@material-ui/styles';

const styles = {
	root: {
		width: '100%',
		display: 'grid',
		gridTemplateColumns: '80% 20%',
		gridTemplateRows: '100%',
		'@media (max-width: 960px)': {
			width: '100%',
			display: 'grid',
			gridTemplateColumns: '85% 15%',
			gridTemplateRows: '100%'
		}
	},
	searchBox: {
		gridRow: '1 / 2',
		gridColumn: '1 / 2'
	},
	myLocationButton: {
		gridRow: '1 / 2',
		gridColumn: '2 / 3'
	}
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
			</div>
		);
	}
}

export default withStyles(styles)(Header);
