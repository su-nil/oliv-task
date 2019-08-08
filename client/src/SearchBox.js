import React, { Component } from 'react';
import './SearchBox.css';
import autocomplete from './autocompleteHelper';
// import axios from 'axios';

// https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap

const MAPS_API_KEY = 'AIzaSyDAQOhuvUriLPgDzVblnSSH7BUj-s2EMSw';

export class SearchBox extends Component {
	constructor(props) {
		super(props);
		this.state = {
			query: ''
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
	}

	handleChange(e) {
		console.dir(e.target.value);
		this.setState({ query: e.target.value });
		autocomplete(this.state.query);
	}

	handleSubmit(e) {
		e.preventDefault();
		console.log('Hello');
		this.setState({ query: '' });
	}

	render() {
		return (
			<div className="SearchBox">
				<form onSubmit={this.handleSubmit.bind(this)}>
					<input
						onChange={this.handleChange.bind(this)}
						placeholder="Search for Restaurants"
						value={this.state.query}
					/>
					<button type="button" onClick={this.handleSubmit.bind(this)}>
						Search
					</button>
				</form>
			</div>
		);
	}
}

export default SearchBox;

//Autocomplete
//Query Prediction
//places search
