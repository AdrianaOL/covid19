// getData
export const getData = async () => {
	try {
		const response = await fetch('http://localhost:3000/api/total')
		const { data } = await response.json()
		return data
	} catch (err) {
		console.error(`Error: ${err}`)
	}
}

export const getContries = async (country) => {
	try {
		const response = await fetch(
			`http://localhost:3000/api/countries/${country}`
		)
		const { data } = await response.json()
		return data
	} catch (err) {
		console.error(`Error: ${err}`)
	}
}