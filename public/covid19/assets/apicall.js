// getData
export const getData = async () => {
	try {
		const response = await fetch('http://localhost:3000/api/total', {
			method: 'GET',
			headers: {
				//Authorization: `Bearer ${jwt}`,
			},
		})
		const { data } = await response.json()
		return data
	} catch (err) {
		console.error(`Error: ${err}`)
	}
}

export const getContries = async (coutry) => {
	try {
		const response = await fetch(
			`http://localhost:3000/api/countries/${coutry}`,
			{
				method: 'GET',
				headers: {},
			}
		)
		const { data } = await response.json()
		return data
	} catch (err) {
		console.error(`Error: ${err}`)
	}
}

