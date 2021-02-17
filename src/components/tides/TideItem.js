import React, { Component } from 'react';
import { ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import moment from 'moment';

export class TideItem extends Component {
	render() {
		const { tide, index } = this.props;
		const date = moment(tide.date, 'YYYY-MM-DD hh:mm').toDate();
		const time = moment(date).format('h:mm a');

		return (
			<div>
				{ index < 2 &&
					<ListItem divider>
						<ListItemText primary={time} />
						<ListItemSecondaryAction>{(tide.height * 3.28084).toFixed(1)} FT</ListItemSecondaryAction>
					</ListItem>
				}
			</div>
		)
	}
}

export default TideItem
