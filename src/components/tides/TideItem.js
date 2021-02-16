import React, { Component } from 'react';
import { ListItem, ListItemSecondaryAction, ListItemText } from '@material-ui/core';
import moment from 'moment';

export class TideItem extends Component {
	render() {
		const tide = this.props.tide;
		const date = moment(tide.t, 'YYYY-MM-DD hh:mm').toDate();
		const time = moment(date).format('h:mm a');
		return (
			<ListItem divider>
				<ListItemText primary={time} />
				<ListItemSecondaryAction>{(parseFloat(tide.v)).toFixed(1)} FT</ListItemSecondaryAction>
			</ListItem>
		)
	}
}

export default TideItem
