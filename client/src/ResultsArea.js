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
		width: '50px',
		height: '50px',
		'@media (max-width: 600px)': {
			width: '30px',
			height: '30px'
		}
	},
	results: {
		overflow: 'scroll'
	}
};

class ResultsArea extends Component {
	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.resultsArea === this.props.resultsArea) return false;
		return true;
	}

	render() {
		const { results, classes, resultsArea } = this.props;
		let renderResults;
		switch (resultsArea) {
			case 'loading':
				renderResults = <CircularProgress thickness={5} className={classes.loader} />;
				break;
			case 'results':
				renderResults = (
					<div className={classes.results}>
						{results.map((result) => <SearchResult result={result} key={uuid()} />)}
					</div>
				);
				break;
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
