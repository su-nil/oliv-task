import React, { Component } from 'react';
import { Dialog, Button, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';
import { withStyles, mergeClasses } from '@material-ui/styles';

const styles = {
	dialog: {
		marginTop: '10px'
	},
	dialogContentText: {
		margin: '10px 0 10px 0',
		'@media (max-width: 600px)': {
			fontSize: '14px'
		}
	},
	dialogActions: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
		padding: '0 0 15px 0'
	}
};

class ErrorDialog extends Component {
	render() {
		const { error: { message, show }, handleDialogClose, classes } = this.props;

		return (
			<div className={classes.root}>
				<Dialog
					open={show}
					onClose={handleDialogClose}
					aria-labelledby="alert-dialog-title"
					aria-describedby="alert-dialog-description"
					className={classes.dialog}
				>
					<DialogContent className={classes.dialogContent}>
						<DialogContentText id="alert-dialog-description" className={classes.dialogContentText}>
							{message}
						</DialogContentText>
					</DialogContent>
					<DialogActions className={classes.dialogActions}>
						<Button onClick={handleDialogClose} variant="outlined" color="secondary">
							OKAY
						</Button>
					</DialogActions>
				</Dialog>
			</div>
		);
	}
}

export default withStyles(styles)(ErrorDialog);
