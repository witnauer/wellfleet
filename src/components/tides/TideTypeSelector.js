import React, { Component } from 'react';
import SwipeableViews from 'react-swipeable-views';
import { AppBar, Tab, Tabs } from '@material-ui/core';
import { TideList } from './TideList';

export class TideTypeSelector extends Component {
	constructor(props) {
		super(props);
		this.state = { value: 0 };
	}
	render() {
		const { predictions } = this.props;
		const lowTides = [];
		const highTides = [];
		predictions.forEach((prediction) => {
			if (prediction.type === "Low") {
				lowTides.push({ prediction });
			} else if (prediction.type === "High") {
				highTides.push({ prediction });
			} else return;
		});

		const handleChange = (e, newValue) => {
			this.setState({ value: newValue });
		}

		const handleChangeIndex = index => {
			this.setState({
				index,
			});
		};

		return (
			lowTides !== [] && highTides !== [] ?
				<div>
					<AppBar position="static" color="default">
						<Tabs
							value={this.state.value}
							onChange={handleChange}
							indicatorColor="primary"
							textColor="primary"
							variant="fullWidth"
							aria-label="full width tabs example">
							<Tab label="Low" />
							<Tab label="High" />
						</Tabs>
					</AppBar>
					<SwipeableViews index={this.state.value} onChangeIndex={handleChangeIndex}>
						<TabPanel value={this.state.value} index={0}>
							<TideList tides={lowTides} />
						</TabPanel>
						<TabPanel value={this.state.value} index={1}>
							<TideList tides={highTides} />
						</TabPanel>
					</SwipeableViews>
				</div>
				: <div>No tides found</div>
		)
	}
}
export default TideTypeSelector

function TabPanel(props) {
	const { children, value, index } = props;
	return (
		<div>
			{value === index && (
				<div>{children}</div>
			)}</div>
	)
}
