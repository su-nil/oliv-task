// TODO Move inline styles to style object
// TODO Routing with location?
// TODO Pagination, More, nextPage and prevPage?
// TODO Refactor to Hooks

import React, { Component } from 'react';
import SearchResult from './SearchResult';
import uuid from 'uuid';

import { CircularProgress } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = {
	root: {
		height: '100%',
		width: '100%',
		display: 'flex',
		flexDirection: 'column',
		border: '1px solid lightgrey',
		'@media (max-width: 960px)': {
			// width: '100%'
		}
	},
	startSearch: {
		'& h4': {
			textAlign: 'center',
			color: 'grey',
			fontWeight: 300,
			fontSize: '1.3rem',
			margin: '50px 20px'
		}
	},
	loader: {
		alignSelf: 'center',
		margin: 'auto'
	},
	results: {
		overflow: 'scroll'
	}
};

class ResultsArea extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const { results, classes, resultsArea } = this.props;
		let renderResults;

		switch (resultsArea) {
			case 'startsearch':
				renderResults = (
					<div className={classes.startSearch}>
						<h4>Your search results will appear here...</h4>
					</div>
				);
				break;
			case 'loading':
				renderResults = <CircularProgress size={80} thickness={5} className={classes.loader} />;
				break;
			case 'results':
				renderResults = (
					<div className={classes.results}>
						{results.map((result) => <SearchResult result={result} key={uuid()} />)}
					</div>
				);
				break;
		}

		return <div className={classes.root}>{renderResults}</div>;
	}
}

export default withStyles(styles)(ResultsArea);
