import React from 'react';
import autocomplete from './autocompleteHelper';
import placeSearch from './placeSearchHelper';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';
import TextField from '@material-ui/core/TextField';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';

import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';
import MyLocation from './MyLocation';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';

import uuid from 'uuid';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		// flexBasis: 'auto',
		flexDirection: 'row',
		width: '100%',
		flexWrap: 'wrap',
		justifyContent: 'flex-start',
		alignItems: 'center',
		margin: '20px 15px'
	},
	container: {
		position: 'relative'
	},
	suggestionsContainerOpen: {
		position: 'absolute',
		zIndex: 1,
		marginTop: theme.spacing(1),
		left: 0,
		right: 0
	},
	suggestion: {
		display: 'block'
	},
	suggestionsList: {
		margin: 0,
		padding: 0,
		listStyleType: 'none'
	},
	buttons: {
		display: 'flex',
		justifyContent: 'flex-start'
		// alignItems: 'stretch'
	},
	button: {
		margin: '0px 10px',
		padding: '15px'
	},
	inputContainer: {
		margin: '0px 7px'
	}
}));

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
				},
				startAdornment: (
					<InputAdornment position="start">
						<SearchIcon style={{ margin: '10px' }} />
					</InputAdornment>
				)
			}}
			{...other}
		/>
	);
}

function renderSuggestion(suggestion, { query, isHighlighted }) {
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

async function getSuggestions(value) {
	try {
		const suggestions = await autocomplete(value).then((res) => res);
		return suggestions;
	} catch (error) {
		console.log('error');
		return [];
	}
}

function getSuggestionValue(suggestion) {
	return suggestion;
}

export default function SearchBox(props) {
	const classes = useStyles();
	const [ value, setValue ] = React.useState('');

	const [ stateSuggestions, setSuggestions ] = React.useState([]);

	const handleSubmit = async (e) => {
		// e.preventDefault();
		// console.log('Hi');
		setValue('');
		const place = await placeSearch(value);
		await props.fetchResults(place[0]);
	};

	const handleSuggestionsFetchRequested = async ({ value }) => {
		const suggestions = await getSuggestions(value);
		setSuggestions(suggestions);
	};

	const handleSuggestionsClearRequested = () => {
		setSuggestions([]);
	};

	const onChange = (event, { newValue }) => {
		setValue(newValue);
	};

	const autosuggestProps = {
		renderInputComponent,
		suggestions: stateSuggestions,
		onSuggestionsFetchRequested: handleSuggestionsFetchRequested,
		onSuggestionsClearRequested: handleSuggestionsClearRequested,
		getSuggestionValue,
		renderSuggestion
	};

	// console.log(props);

	return (
		<div className={classes.root}>
			<Grid xs={7} className={classes.inputContainer} item>
				<Autosuggest
					{...autosuggestProps}
					inputProps={{
						classes,
						id: 'autosuggest',
						placeholder: 'Search Restaurants...',
						value,
						onChange
					}}
					theme={{
						container: classes.container,
						suggestionsContainerOpen: classes.suggestionsContainerOpen,
						suggestionsList: classes.suggestionsList,
						suggestion: classes.suggestion
					}}
					renderSuggestionsContainer={(options) => (
						<Paper {...options.containerProps} square>
							{options.children}
						</Paper>
					)}
				/>
			</Grid>
			<Grid xs={4} className={classes.buttons} item>
				<Button onClick={handleSubmit} variant="contained" color="primary" className={classes.button}>
					Search
				</Button>
				<MyLocation submitMyLocation={props.submitMyLocation} />
			</Grid>
		</div>
	);
}
