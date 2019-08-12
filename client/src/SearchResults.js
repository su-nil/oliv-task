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
		const { results } = this.props;
		const restaurants = results.map((result) => <SearchResult result={result} key={uuid()} />);
		console.log(restaurants);
		return (
			<div className="SearchResults">
				{restaurants.length === 0 ? (
					<div>
						<h4
							style={{
								textAlign: 'center',
								color: 'grey',
								fontWeight: 300,
								fontSize: '1.3rem',
								margin: '50px 20px'
							}}
						>
							Your search results will appear here...
						</h4>
					</div>
				) : (
					restaurants
				)}
			</div>
		);
	}
}

export default SearchResults;
