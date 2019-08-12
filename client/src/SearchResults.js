// TODO Loading Icon
// TODO Routing with location
// TODO Pagination
// TODO More, back and forward
// TODO Pagination

import React, { Component } from 'react';
import SearchResult from './SearchResult';
import uuid from 'uuid';

export class SearchResults extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		const results = this.props.results.map((result) => <SearchResult result={result} key={uuid()} />);
		return <div className="SearchResults">{results}</div>;
	}
}

export default SearchResults;
