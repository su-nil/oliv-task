import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
// import Paper from '@material-ui/core/Paper';

import Rating from '@material-ui/lab/Rating';
// import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

// TODO Design Search Result

export class SearchResult extends Component {
	render() {
		const { name, rating, url, coordinates, price } = this.props.result;
		return (
			<Card>
				<CardContent>
					<Typography variant="h6">{name}</Typography>
					<Rating value={rating} precision={0.5} size="small" />
					<Typography variant="subtitle1">{price}</Typography>
				</CardContent>
			</Card>
		);
	}
}

export default SearchResult;
