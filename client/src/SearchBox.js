// TODO Refactor styles, move to new file
// TODO Separate styling between App and this component
// TODO try catch for all async/await/promises
// TODO Refactor Autosuggest component

import React, { Component } from 'react';
import uuid from 'uuid';
import to from 'await-to-js';
import getSuggestions from './suggestionsHelper';
import placeSearch from './placeSearchHelper';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import { TextField, MenuItem, Button, Paper } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { withStyles } from '@material-ui/core/styles';

const styles = (theme) => ({
	root: {
		display: 'grid',
		width: '100%',
		gridTemplateColumns: '75% 25%',
		gridTemplateRows: '100%',
		'@media (max-width: 960px)': {
			width: '100%',
			display: 'grid',
			gridTemplateColumns: '80.5% 19.5%',
			gridTemplateRows: '100%'
		}
	},
	input: {
		maxHeight: '56px',
		height: '1vh'
	},
	container: {
		position: 'relative'
	},
	suggestionsContainer: {
		'@media (max-width: 600px)': {
			width: '100vw'
		}
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		zIndex: 1,
		marginTop: theme.spacing(1),
		left: 0,
		right: 0
	},
	suggestion: {
		display: 'block',
		'@media (max-width: 600px)': {
			'& > *': {
				fontSize: '12px'
			}
		}
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none'
	},
	searchButton: {
		gridRow: '1 / 2',
		gridColumn: '2 / 3',
		padding: '0 10px',
		'& button': {
			width: '100%',
			height: '100%'
		},
		'@media (max-width: 960px)': {
			padding: '0 0 0 5px',
			'& button': {
				minWidth: 'auto',
				height: '100%',
				marginLeft: 'auto'
			}
		}
	},
	searchText: {
		marginLeft: '5%',
		fontSize: '12px',
		'@media (max-width: 960px)': {
			display: 'none'
		}
	},
	inputContainer: {
		width: '100%',
		gridRow: '1 / 2',
		gridColumn: '1 / 2'
	}
});

function renderInputComponent(inputProps) {
	const { classes, inputRef = () => {}, ref, ...other } = inputProps;
	return (
		<TextField
			fullWidth
			variant="outlined"
			InputProps={{
				inputRef: (node) => {
					ref(node);
					inputRef(node);
				},
				classes: {
					input: classes.input
				}
			}}
			{...other}
		/>
	);
}

function getSuggestionValue(suggestion) {
	return suggestion.value;
}

function renderSuggestion(suggestionObject, { query, isHighlighted }) {
	const suggestion = getSuggestionValue(suggestionObject);
	const matches = match(suggestion, query);
	const parts = parse(suggestion, matches);
	return (
		<MenuItem selected={isHighlighted} component="div">
			<div>
				{parts.map((part) => (
					<span key={uuid()} style={{ fontWeight: part.highlight ? 500 : 400 }}>
						{part.text}
					</span>
				))}
			</div>
		</MenuItem>
	);
}

class SearchBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			suggestions: []
		};
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	async handleSubmit(e) {
		e.preventDefault();
		this.setState({ value: '' });
		const place = await placeSearch(this.state.value);
		await this.props.fetchResults(place[0]);
	}

	onSuggestionsFetchRequested = async ({ value }) => {
		let error, err, suggestions;

		[ err, suggestions ] = await to(getSuggestions(value));
		if (!suggestions) {
			error = 'Google Maps Autosuggest API not working.';
			console.error(err);
			this.props.handleError(error);
			return;
		} else {
			this.setState((state) => ({ ...state, suggestions }));
		}
	};

	onSuggestionsClearRequested = () => {
		this.setState((state) => ({
			...state,
			suggestions: []
		}));
	};

	onChange = (event, { newValue }) => {
		this.setState((state) => ({
			...state,
			value: newValue
		}));
	};

	render() {
		const { classes, handleError } = this.props;
		const { suggestions, value } = this.state;
		const autosuggestProps = {
			renderInputComponent,
			suggestions,
			onSuggestionsFetchRequested: this.onSuggestionsFetchRequested,
			onSuggestionsClearRequested: this.onSuggestionsClearRequested,
			renderSuggestion,
			getSuggestionValue,
			handleError,
			highlightFirstSuggestion: true
		};
		return (
			<div className={classes.root}>
				<div className={classes.inputContainer}>
					<form onSubmit={this.handleSubmit} id="search-form">
						<Autosuggest
							{...autosuggestProps}
							inputProps={{
								classes,
								id: 'autosuggest',
								placeholder: 'Search restaurants...',
								value,
								onChange: this.onChange
							}}
							theme={{
								container: classes.container,
								suggestionsContainerOpen: classes.suggestionsContainerOpen,
								suggestionsList: classes.suggestionsList,
								suggestion: classes.suggestion,
								suggestionsContainer: classes.suggestionsContainer
							}}
							renderSuggestionsContainer={(options) => (
								<Paper {...options.containerProps} square>
									{options.children}
								</Paper>
							)}
						/>
					</form>
				</div>
				<div className={classes.searchButton}>
					<Button onClick={this.handleSubmit} form="search-form" variant="contained" color="primary">
						<SearchIcon />
						<span className={classes.searchText}>Search</span>
					</Button>
				</div>
			</div>
		);
	}
}

export default withStyles(styles)(SearchBox);
