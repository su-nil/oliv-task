// TODO Add Opening hours, phone number to search result
// TODO Add photo slider if there are more than one photo

import React, { Component } from 'react';
import Rating from '@material-ui/lab/Rating';
import { Typography, CardContent, Card, CardMedia } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';

const styles = {
	root: {
		display: 'grid',
		gridTemplateColumns: '75% 25%',
		width: '100%',
		margin: '3px 0'
	},
	details: {
		gridColumn: '1 / 2',
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'start',
		justifyContent: 'flex-start',
		'& > *': {
			marginTop: '5px'
		},
		'@media (max-width: 960px)': {
			'& > *': {
				marginTop: '2px'
			}
		}
	},
	ratingPriceContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start'
	},
	title: {
		fontSize: '16px',
		fontWeight: 500,
		'@media (max-width: 960px)': {
			fontSize: '14px'
		}
	},
	price: {
		fontSize: '14px',
		color: 'grey',
		marginLeft: '10px',
		fontWeight: '500',
		'@media (max-width: 960px)': {
			fontSize: '12px',
			marginLeft: '5px'
		}
	},
	reviewCount: {
		fontSize: '14px',
		color: 'grey',
		marginLeft: '10px',
		'@media (max-width: 960px)': {
			fontSize: '12px',
			marginLeft: '3px'
		}
	},
	rating: {
		'@media (max-width: 960px)': {
			fontSize: '14px'
		}
	},
	address: {
		color: 'grey',
		fontSize: '14px',
		'@media (max-width: 960px)': {
			fontSize: '11px'
		}
	},
	tags: {
		color: 'grey',
		fontSize: '14px',
		fontWeight: 600,

		'@media (max-width: 960px)': {
			fontSize: '12px',
			fontWeight: 600
		}
	},
	image: {
		gridColumn: '2 / 3',
		margin: 'auto auto auto 0',
		height: '90%',
		width: '90%'
	}
};
export class SearchResult extends Component {
	render() {
		const { classes } = this.props;
		const { name, rating, photos, address, review_count, tags, price } = this.props.result;
		return (
			<Card className={classes.root} raised>
				<CardContent className={classes.details}>
					<span className={classes.title}>{name}</span>
					<span className={classes.ratingPriceContainer}>
						<Rating value={rating} precision={0.5} size="small" className={classes.rating} />
						<span className={classes.reviewCount}>({review_count})</span>
						<span className={classes.price}>{price}</span>
					</span>
					<span className={classes.address}>{address}</span>
					<span className={classes.tags}>{tags}</span>
				</CardContent>
				<CardMedia className={classes.image} image={photos[0]} title={name} />
			</Card>
		);
	}
}

export default withStyles(styles)(SearchResult);
