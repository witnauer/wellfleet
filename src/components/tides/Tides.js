import React, { Component } from 'react';
import TideTypeSelector from './TideTypeSelector';
import axios from 'axios';
import moment from 'moment';
import { Box, Typography } from '@material-ui/core';

export class Tides extends Component {
	state = {
		predictions: [],
		sun: {},
		sunrise: "",
		sunset: ""
	};

	componentDidMount() {
		const today = moment().format('YYYY-MM-DD');

		fetch(`/.netlify/functions/fetch-tides?today=${today}`)
			.then((res) => res.json())
			.then((tides) => {
				this.setState({ predictions: tides.extremes });
			})

		const sunUrl = "https://api.sunrise-sunset.org/json?lat=41.936100&lng=-70.043671&formatted=0";

		axios.get(sunUrl).then(res => {
			this.setState({ sun: res.data.results });
			const sunrise = moment(res.data.results.sunrise).format('LT');
			const sunset = moment(res.data.results.sunset).format('LT');
			this.setState({ sunrise: sunrise, sunset: sunset })
			console.log(res.data.results);
		}).catch(err => {
			console.log(err);
		});
	}

	render() {
		const displayDate = moment().format('LL');

		return (
			<div>
				<Box my={3} />
				<Typography variant="h2" align='center'>Wellfleet Tides</Typography>
				<Typography variant='h4' align='center'>{displayDate}</Typography>
				<Box my={5} />
				<TideTypeSelector predictions={this.state.predictions} />
				<Box my={5} />
				<Typography variant='h2' align='center'>Solar Times</Typography>
				<Typography variant='body2' align='center'>Sunrise: {this.state.sunrise}</Typography>
				<Typography variant='body2' align='center'>Sunset: {this.state.sunset}</Typography>
			</div>
		)
	}
}

export default Tides
