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
		borderRight: '1px solid lightgrey',
		'@media (max-width: 960px)': {
			border: 'none'
		}
	},
	startSearch: {
		'& h4': {
			textAlign: 'center',
			color: 'grey',
			fontWeight: 300,
			fontSize: '20px',
			margin: '20% 20% auto 20%'
		},
		'@media (max-width: 600px)': {
			'& h4': {
				fontSize: '15px'
			}
		}
	},
	loader: {
		alignSelf: 'center',
		margin: '20%',
		'@media (max-width: 600px)': {}
	},
	results: {
		overflow: 'scroll'
	}
};

class ResultsArea extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		// Update component only if the resultsArea prop has changed
		// this avoids re-render everytime showMap is toggled
		if (nextProps.resultsArea === this.props.resultsArea) return false;
		return true;
	}

	render() {
		const { results, classes, resultsArea } = this.props;
		let renderResults;
		switch (resultsArea) {
			// Display progress animation when results are loading
			case 'loading':
				renderResults = <CircularProgress thickness={5} className={classes.loader} />;
				break;
			// Display results when loaded
			case 'results':
				renderResults = (
					<div className={classes.results}>
						{results.map((result) => <SearchResult result={result} key={uuid()} />)}
					</div>
				);
				break;
			// Default to start searching area
			default:
				renderResults = (
					<div className={classes.startSearch}>
						<h4>Your search results will appear here...</h4>
					</div>
				);
		}

		return <div className={classes.root}>{renderResults}</div>;
	}
}

export default withStyles(styles)(ResultsArea);
