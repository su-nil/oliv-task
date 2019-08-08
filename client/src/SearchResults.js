import React, { Component } from 'react';
import SearchResult from './SearchResult';

export class SearchResults extends Component {
	render() {
		return (
			<div className="SearchResults">
				<SearchResult />
				<SearchResult />
				<SearchResult />
				<SearchResult />
				<SearchResult />
				<SearchResult />
				<SearchResult />
			</div>
		);
	}
}

export default SearchResults;
