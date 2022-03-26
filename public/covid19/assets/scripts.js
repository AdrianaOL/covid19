import { getData, getContries } from './apicall.js'
import { barChart, modalGraph } from './graph.js'

// selectores
const modalItemTitleSelector = document.querySelector('#modal-item-title')
const closeBtnModalSelector = document.querySelectorAll('.close-btn-modal')
const tableSelector = document.querySelector('#table')

// function iife
;(async () => {
	// filtrando datos
	const data = await getData()
	const filteredData = data.filter((cases) => cases.confirmed > 6000000)
	const countriesList = filteredData.map((location) => location.location)
	const confirmed = filteredData.map((p) => p.confirmed)
	const deaths = filteredData.map((p) => p.deaths)
	const recovered = filteredData.map((p) => p.recovered)
	const active = filteredData.map((p) => p.active)

	// Mostrando grafico de barra con sus datos
	barChart(countriesList, confirmed, deaths, recovered, active)
	// creando table y sus datos
	const createTable = (array) => {
		let col = `
				<tr>
					<th scope="col">LOCATION</th>
					<th scope="col">CONFIRMED</th>
					<th scope="col">DEATHS</th>
					<th scope="col">RECOVERED</th>
					<th scope="col">ACTIVE</th>
					<th scope="col">DETAILS</th>
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
		// seleccion de los botones 
		const btns = document.querySelectorAll('.boton-modal')
		// agregando event listener a cada boton
		btns.forEach((btn) => {
			btn.addEventListener('click', async (e) => {
				// guardando el pais del dataset en una variable
				const location = e.target.dataset.location
				const myModal = new bootstrap.Modal(
					document.getElementById('modal-country'),
					{
						keyboard: false,
						backdrop: false
					}
				)
				// muestra modal
				myModal.show()
				// titulo del modal
				modalItemTitleSelector.innerHTML = location
				// llamando al api, pasando el nombre del pais y guardando en una variable
				const countryData = await getContries(location)
				// destructuring a la variable countryData
				const { confirmed, deaths, recovered, active } = countryData
				const graphModal = modalGraph(confirmed, deaths, recovered, active)

				// event listener a los botones que cierrran el modal
				// para destruir el grafico y poder actualizarlo
				closeBtnModalSelector.forEach((element) => {
					element.addEventListener('click', () => {
						graphModal.destroy()
					})
				})
			})
		})
	}
	// creando table
	createTable(filteredData)
})()
