import React, { Component } from 'react';
import { List } from '@material-ui/core';
import { TideItem } from './TideItem';

export class TideList extends Component {
	render() {
		const tides = this.props.tides;
		return (
			<List>
				{tides.map((tide, index) => {
					return (
						<TideItem tide={tide.prediction} key={index} />
					)
				})}
			</List>
		)
	}
}

export default TideList
