import React from 'react';
import uuid from 'uuid';

import autocomplete from './autocompleteHelper';
import placeSearch from './placeSearchHelper';
import MyLocation from './MyLocation';
import Autosuggest from 'react-autosuggest';
import match from 'autosuggest-highlight/match';
import parse from 'autosuggest-highlight/parse';

import { TextField, Grid, MenuItem, Button, InputAdornment, Paper, Hidden } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { makeStyles } from '@material-ui/core/styles';
import { withStyles } from '@material-ui/styles';

const useStyles = makeStyles((theme) => ({
	root: {
		display: 'flex',
		flexDirection: 'row',
		flexWrap: 'nowrap',
		justifyContent: 'flex-start',
		alignItems: 'center',
		margin: 'auto',
		flexGrow: 1,
		minWidth: '500px'

		// '@media (max-width: 960px)': {
		// 	display: 'flex',
		// 	flexDirection: 'column',
		// 	width: '100%',
		// 	justifyContent: 'center',
		// 	alignItems: 'center'
		// }
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
	// buttons: {
	// 	display: 'flex',
	// 	justifyContent: 'flex-start'

	// 	// alignItems: 'stretch'
	// },
	searchButton: {
		margin: '0px 10px',
		height: '56px',
		flexGrow: 0
		// padding: '15px'
	},
	inputContainer: {
		margin: '0px 7px',
		// flex: '1 1 300px'
		flexGrow: 1
		// flexShrink: 0
		// minWidth: '100wh'
		// '@media (max-width: 960px)': {
		// 	width: '100%'
		// }
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
		e.preventDefault();
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
		renderSuggestion,
		highlightFirstSuggestion: true
	};

	// console.log(props);

	return (
		<div className={classes.root}>
			<Grid className={classes.inputContainer} item>
				<form onSubmit={handleSubmit} id="search-form">
					<Autosuggest
						{...autosuggestProps}
						inputProps={{
							classes,
							id: 'autosuggest',
							placeholder: 'Search restaurants near...',
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
				</form>
			</Grid>

			<Button
				onClick={handleSubmit}
				form="search-form"
				variant="contained"
				color="primary"
				className={classes.searchButton}
			>
				<Hidden mdDown>
					<span>Search</span>
				</Hidden>
				<Hidden lgUp>
					<SearchIcon />
				</Hidden>
			</Button>
			{/* <MyLocation submitMyLocation={props.submitMyLocation} /> */}
		</div>
	);
}
