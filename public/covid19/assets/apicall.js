export const jwt = localStorage.getItem('jwt')

// variable que guarda la url del api
const URL = 'http://localhost:3000/api'

// llamado del api para obtener los datos de los paises
export const getData = async () => {
	try {
		const response = await fetch(`${URL}/total`)
		const { data } = await response.json()
		return data
	} catch (err) {
		console.error(`Error: ${err}`)
	}
}

// llamado al api para obtener los datos por pais atraves de parametro
export const getContries = async (country) => {
	try {
		const response = await fetch(
			`${URL}/countries/${country}`
		)
		const { data } = await response.json()
		return data
	} catch (err) {
		console.error(`Error: ${err}`)
	}
}

// llamado al api para obtener datos de muertos
export const getDeathsChile = async () => {
	const jwt = localStorage.getItem('jwt')
	try {
		const response = await fetch(`${URL}/deaths`, {
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

// llamado al api para obtener datos de confirmados
export const getConfirmedChile = async () => {
	const jwt = localStorage.getItem('jwt')

	try {
		const response = await fetch(`${URL}/confirmed`, {
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

// llamado al api para obtener datos de recuperados
export const getRecoveredChile = async () => {
	const jwt = localStorage.getItem('jwt')

	try {
		const response = await fetch(`${URL}/recovered`, {
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
		const response = await fetch(`${URL}/login`, {
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