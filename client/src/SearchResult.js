// TODO Add Opening hours, phone number to search result
// TODO Add photo slider if there are more than one photo

import React, { Component } from 'react';
import Rating from '@material-ui/lab/Rating';
import { Typography, CardContent, Card, CardMedia } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = {
	root: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		margin: '2px 0px',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	title: {
		fontSize: '16px'
	},
	details: {},
	ratingPriceContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	price: {
		fontSize: '14px',
		color: 'grey',
		marginLeft: '10px',
		fontWeight: '600'
	},
	address: { fontSize: '14px' },
	image: {
		margin: '2% 20px 2% auto',
		height: '100px',
		width: '100px'
	}
};
export class SearchResult extends Component {
	render() {
		const { classes } = this.props;
		const { name, rating, photos, location: { formatted_address }, price } = this.props.result;
		return (
			<Card className={classes.root} raised>
				<CardContent className={classes.details}>
					<span variant="h6" className={classes.title}>
						{name}
					</span>
					<span className={classes.ratingPriceContainer}>
						<Rating value={rating} precision={0.5} size="small" />
						<Typography className={classes.price} variant="subtitle1">
							{price}
						</Typography>
					</span>
					<span variant="subtitle1" className={classes.address}>
						{formatted_address}
					</span>
				</CardContent>
				<CardMedia className={classes.image} image={photos[0]} title={name} />
			</Card>
		);
	}
}

export default withStyles(styles)(SearchResult);
