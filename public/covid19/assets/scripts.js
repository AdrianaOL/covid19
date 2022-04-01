// importacion de modulos
import { getData, getContries, postData, jwt } from './apicalls.js'
import { barChart, modalGraph } from './graphs.js'
import {
	getElementBySelector,
	getElementByAllSelectors,
	getValueByElement,
} from './functions.js'

// selectores del DOM
const modalItemTitleSelector = getElementBySelector('#modal-item-title')
const closeBtnModalSelector = getElementByAllSelectors('.close-btn-modal')
const tableSelector = getElementBySelector('#table')
const logInSelector = getElementBySelector('#log-in')
const formSelector = getElementBySelector('#form-log-in')
const logInToggle = getElementBySelector('#log-in')
const logOutToggle = getElementBySelector('#log-out')
const chileSituationToggle = getElementBySelector('#chile-situation')

// function iife
;(async () => {
	// guarda los datos recibidos del api en la constante data
	const data = await getData()
	// filtrando y desglosando datos de la api
	const filteredData = data.filter((cases) => cases.confirmed > 6000000)
	const countriesList = filteredData.map((location) => location.location)
	const confirmed = filteredData.map((p) => p.confirmed)
	const deaths = filteredData.map((p) => p.deaths)
	const recovered = filteredData.map((p) => p.recovered)
	const active = filteredData.map((p) => p.active)

	// event listener para abrir modal login
	logInSelector.addEventListener('click', () => {
		const myModal2 = new bootstrap.Modal(
			document.getElementById('modal-login'),
			{
				keyboard: false,
				backdrop: false,
			}
		)
		// muestra modal
		myModal2.show()
		// event listener para el evento submit del formulario de login
		formSelector.addEventListener('submit', async (e) => {
			e.preventDefault()
			// obtiene el valor de los inputs del formulario
			const mail = getValueByElement('#mail')
			const password = getValueByElement('#password')
			const token = await postData(mail, password)
			// si el token es valido agrega o remueve clases a los elementos del DOM
			if (token) {
				logInToggle.classList.toggle('d-none')
				logOutToggle.classList.remove('d-none')
				chileSituationToggle.classList.remove('d-none')
			}
			// timeout para cerrar modal de login
			setTimeout(() => {
				myModal2.hide()
			}, 500)
		})
	})
	// event listener al boton logout, elimina el JSON web token y recarga la pagina
	logOutToggle.addEventListener('click', () => {
		localStorage.clear()
		location.reload()
	})
	// Mostrando grafico de barra con sus datos
	barChart(countriesList, confirmed, deaths, recovered, active)
	// creando table y sus datos
	const createTable = (array) => {
		let col = `
				<tr>
					<th scope="col">País</th>
					<th scope="col">Confirmados</th>
					<th scope="col">Muertos</th>
					<th scope="col">Recuperados</th>
					<th scope="col">Activos</th>
					<th scope="col">Detalles</th>
				</tr>`
		for (let i = 0; i < array.length; i++) {
			const row = `<tr>
				<td>${array[i].location}</td>
				<td>${array[i].confirmed}</td>
				<td>${array[i].deaths}</td>
				<td>${array[i].recovered}</td>
				<td>${array[i].active}</td>
				<td>
				<button data-location="${array[i].location}" class="btn btn-link boton-modal">Ver detalles</button></td>
			<tr>`
			col += row
			tableSelector.innerHTML = col
		}
		// seleccion de los botones(ver detalle) por la clase .boton-modal del innerHTML (linea 84)
		const btns = getElementByAllSelectors('.boton-modal')
		// agregando event listener a cada boton
		btns.forEach((btn) => {
			btn.addEventListener('click', async (e) => {
				// guardando el nombre del pais que contiene el dataset en una variable llamada location
				const location = e.target.dataset.location
				// creando un modal por cada click del boton ver detalle
				const myModal = new bootstrap.Modal(
					document.getElementById('modal-country'),
					{
						keyboard: false,
						backdrop: false,
					}
				)
				// muestra modal
				myModal.show()
				// inserta titulo del pais en el modal
				modalItemTitleSelector.innerHTML = location
				// llamando al api, obteniendo los datos del pais seleccionado y guardandolos en una variable llamada countryData
				const countryData = await getContries(location)
				// destructuring a la variable countryData que guarda los datos entre llaves en constantes separadas
				const { confirmed, deaths, recovered, active } = countryData
				// guarda en la constante graphModal la funcion que muestra el grafico pie y sus parametros
				const graphModal = modalGraph(confirmed, deaths, recovered, active)

				// event listener a los botones que cierran el modal
				// para destruir el grafico y poder reutilizarlo
				closeBtnModalSelector.forEach((e) => {
					e.addEventListener('click', () => {
						graphModal.destroy()
					})
				})
			})
		})
	}
	// creando tabla
	createTable(filteredData)
})()

// iife para que los items se muestren u oculten en el DOM
;(() => {
	// condicion que verifica si el JSON web token existe
	if (jwt) {
		// si el JSON web token existe, agrega o remueve clases a los elementos del DOM
		logInToggle.classList.add('d-none')
		logOutToggle.classList.remove('d-none')
		chileSituationToggle.classList.remove('d-none')
	}
})()
