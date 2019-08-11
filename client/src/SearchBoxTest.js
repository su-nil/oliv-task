/* 

Bug: Autosuggest prevents search from being clicked and takes it as a click elsewhere

*/

import React, { Component } from 'react';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import autocomplete from './autocompleteHelper';
import placeSearch from './placeSearchHelper';
import Autosuggest from 'react-autosuggest';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import './SearchBox.css';

// const renderSuggestion = (suggestion) => <span>{suggestion}</span>;
const getSuggestionValue = (suggestion) => suggestion;

function renderInputComponent(inputProps) {
	const { classes, inputRef = () => {}, ref, ...other } = inputProps;

	return (
		<TextField
			fullWidth
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

async function getSuggestions(value) {
	try {
		const suggestions = await autocomplete(value).then((res) => res);
		return suggestions;
	} catch (error) {
		console.log('error');
		return [];
	}
}

// function renderSuggestion(suggestion, { query, isHighlighted }) {
// 	const matches = match(suggestion.label, query);
// 	const parts = parse(suggestion.label, matches);

// 	return (
// 		<MenuItem selected={isHighlighted} component="div">
// 			<div>
// 				{parts.map((part) => (
// 					<span key={part.text} style={{ fontWeight: part.highlight ? 500 : 400 }}>
// 						{part.text}
// 					</span>
// 				))}
// 			</div>
// 		</MenuItem>
// 	);
// }

export class SearchBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			value: '',
			suggestions: []
		};
		// this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.onSuggestionsFetchRequested = this.onSuggestionsFetchRequested.bind(this);
		this.onSuggestionsClearRequested = this.onSuggestionsClearRequested.bind(this);
	}

	// async handleChange(e) {
	// 	await this.setState({ value: e.target.value });
	// 	const suggestions = await autocomplete(this.state.value).then((res) => res);
	// 	this.setState({ ...this.state, suggestions });
	// }

	async handleSubmit(e) {
		// e.preventDefault();
		console.log('Hi');
		this.setState({ value: '' });
		const place = await placeSearch(this.state.value);
		await this.props.fetchResults(place[0]);
	}

	// async onSuggestionsFetchRequested({ value }) {
	// 	// await this.setState({ value: value });
	// 	// const suggestions = await autocomplete(this.state.value).then((res) => res);
	// 	this.setState({ ...this.state, suggestions });
	// }

	onSuggestionsFetchRequested = async ({ value }) => {
		const suggestions = await getSuggestions(value);
		await this.setState((state) => ({
			...state,
			suggestions: suggestions
		}));
	};

	onSuggestionsClearRequested = async () => {
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
		const { value, suggestions } = this.state;
		const inputProps = {
			placeholder: 'Search Restaurants',
			value,
			onChange: this.onChange,
			type: 'search'
		};

		const autosuggestProps = {
			renderInputComponent,
			suggestions: suggestions,
			onSuggestionsFetchRequested: this.handleSuggestionsFetchRequested,
			onSuggestionsClearRequested: this.handleSuggestionsClearRequested,
			getSuggestionValue,
			renderSuggestion,
			highlightFirstSuggestion: true
		};

		return (
			<div className="SearchBox">
				<form onSubmit={this.handleSubmit.bind(this)}>
					{/* <Autosuggest
						suggestions={suggestions}
						onSuggestionsFetchRequested={this.onSuggestionsFetchRequested.bind(this)}
						onSuggestionsClearRequested={this.onSuggestionsClearRequested}
						getSuggestionValue={getSuggestionValue}
						renderSuggestion={renderSuggestion}
						inputProps={inputProps}
					/> */}
					<Autosuggest {...autosuggestProps} inputProps={inputProps} />
					<Button onClick={this.handleSubmit.bind(this)} variant="contained" color="primary">
						Search
					</Button>
				</form>
			</div>
		);
	}
}

export default SearchBox;

//Autocomplete
//Query Prediction
//places search

// {/* <form onSubmit={this.handleSubmit.bind(this)}>
// 	<input onChange={this.handleChange.bind(this)} placeholder="Search for Restaurants" value={value} />
// 	<button type="button" onClick={this.handleSubmit.bind(this)}>
// 		Search
// 	</button>
// 	{/* <ul>{suggestionsRender}</ul> */}
// </form>; */}
