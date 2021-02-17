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

		const url = `https://www.worldtides.info/api/v2?extremes&date=${today}&days=2&localtime&datum=MLLW&lat=41.931330&lon=-70.019140&key=ffd0d3cc-4491-46fd-989a-b68191f1b166`


		axios.get(url).then(res => {
			this.setState({ predictions: res.data.extremes })
		}).catch(err => {
			console.log(err);
		});

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
				<Typography variant="h5" align='center'>Wellfleet Tides</Typography>
				<Typography variant='body2' align='center'>{displayDate}</Typography>
				<Box my={3} />
				<TideTypeSelector predictions={this.state.predictions} />
				<Box my={3} />
				<Typography variant='body2' align='center'>Sunrise: {this.state.sunrise}</Typography>
				<Typography variant='body2' align='center'>Sunset: {this.state.sunset}</Typography>
			</div>
		)
	}
}

export default Tides
