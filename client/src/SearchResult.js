import React, { Component } from 'react';
import Card from '@material-ui/core/Card';
import Rating from '@material-ui/lab/Rating';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import { withStyles } from '@material-ui/styles';
import { Grid } from '@material-ui/core';

// TODO Design Search Result
const styles = {
	root: {
		display: 'flex',
		flexDirection: 'row',
		width: '100%',
		margin: '2px 0px',
		justifyContent: 'flex-start',
		alignItems: 'center'
	},
	details: {
		// display: 'flex',
		// flexDirection: 'column'
	},
	image: {
		margin: '2% 20px 2% auto',
		height: '100px',
		width: '100px'
	}
};
export class SearchResult extends Component {
	render() {
		const { classes } = this.props;
		const { name, rating, url, photos, location: { formatted_address }, price } = this.props.result;
		console.log(this.props.result);
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
