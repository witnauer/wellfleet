const axios = require('axios')

const handler = async (event) => {
	const { today } = event.queryStringParameters
	const API_SECRET = process.env.REACT_APP_API_SECRET
	const url = `https://www.worldtides.info/api/v2?extremes&date=${today}&days=2&localtime&datum=MLLW&lat=41.931330&lon=-70.019140&key=${API_SECRET}`

	try {
		const { data } = await axios.get(url)
		return {
			statusCode: 200,
			body: JSON.stringify(data)
		}
	} catch (error) {
		const { status, statusText, headers, data } = error.response
		return {
			statusCode: status,
			body: JSON.stringify({ status, statusText, headers, data })
		}
	}
}

module.exports = { handler }
