export const jwt = localStorage.getItem('jwt')
// const URL = 'http://localhost:3000/api/'
// getData
export const getData = async () => {
	try {
		const response = await fetch(`http://localhost:3000/api/total`)
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

export const getDeathsChile = async () => {
	const jwt = localStorage.getItem('jwt')
	try {
		const response = await fetch('http://localhost:3000/api/deaths', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		})
		const { data } = await response.json()
		return data
	} catch (err) {
		console.error(`Error: ${err}`)
	}
}
export const getConfirmedChile = async () => {
	const jwt = localStorage.getItem('jwt')

	try {
		const response = await fetch('http://localhost:3000/api/confirmed', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		})
		const { data } = await response.json()
		return data
	} catch (err) {
		console.error(`Error: ${err}`)
	}
}
export const getRecoveredChile = async () => {
	const jwt = localStorage.getItem('jwt')

	try {
		const response = await fetch('http://localhost:3000/api/recovered', {
			method: 'GET',
			headers: {
				Authorization: `Bearer ${jwt}`,
			},
		})
		const { data } = await response.json()
		return data
	} catch (err) {
		console.error(`Error: ${err}`)
	}
}

// log in function
export const postData = async (email, password) => {
	try {
		const response = await fetch('http://localhost:3000/api/login', {
			method: 'POST',
			body: JSON.stringify({ email: email, password: password }),
		})
		const { token } = await response.json()
		localStorage.setItem('jwt', token)
		return token
	} catch (err) {
		console.error(err)
	}
}