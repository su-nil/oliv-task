// TODO Move inline styles to style object
// TODO Add Opening hours, phone number to search result
// TODO Add photo slider if there are more than one photo

import React, { Component } from 'react';
import Rating from '@material-ui/lab/Rating';
import { Grid, Typography, CardContent, Card, CardMedia } from '@material-ui/core';
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
	details: {},
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
					<Typography variant="h6" style={{ fontSize: '16px' }}>
						{name}
					</Typography>
					<Grid
						container
						style={{
							display: 'flex',
							flexDirection: 'row',
							alignItems: 'center',
							justifyContent: 'flex-start'
						}}
					>
						<Rating value={rating} precision={0.5} size="small" />
						<Typography
							variant="subtitle1"
							style={{ fontSize: '14px', color: 'grey', marginLeft: '10px', fontWeight: '600' }}
						>
							{price}
						</Typography>
					</Grid>

					<Typography variant="subtitle1" style={{ fontSize: '14px' }}>
						{formatted_address}
					</Typography>
				</CardContent>
				<CardMedia className={classes.image} image={photos[0]} title={name} />
			</Card>
		);
	}
}

export default withStyles(styles)(SearchResult);
