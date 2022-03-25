import { getData, getContries } from './apicall.js'
import { barChart } from './modalgraph.js'

const modalItemTitleSelector = document.querySelector('#modal-item-title')
const closeBtnModalSelector = [...document.querySelectorAll('.close-btn-modal')]
const modalFade = document.querySelector('#exampleModal')

// Informacion de la API - funcion IIFE
;(async () => {
	const data = await getData()
	const moreThanTenThousand = data.filter((cases) => cases.confirmed > 2000000)
	const countriesList = moreThanTenThousand.map((location) => location.location)
	const confirmed = moreThanTenThousand.map((p) => p.confirmed)
	const deaths = moreThanTenThousand.map((p) => p.deaths)
	const recovered = moreThanTenThousand.map((p) => p.recovered)
	const active = moreThanTenThousand.map((p) => p.active)

	// Gráfico
	barChart(countriesList, confirmed, deaths, recovered, active)
	//------------------
	const creaTabla = (array) => {
		const tabla = document.querySelector('#table')
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
				<button data-location="${array[i].location}" class="btn btn-link boton-modal text-white">Ver detalles</button></td>
			<tr>`
			col += row
			tabla.innerHTML = col
		}
		const btns = document.querySelectorAll('.boton-modal')
		btns.forEach((element) => {
			element.addEventListener('click', async (e) => {
				const location = e.target.dataset.location
				var myModal = new bootstrap.Modal(
					document.getElementById('exampleModal')
				)
				myModal.show()
				modalItemTitleSelector.innerHTML = location
				const countryData = await getContries(location)
				const { confirmed, deaths } = countryData

				const ctx2 = document.getElementById('myChart2').getContext('2d')
				const myChart2 = new Chart(ctx2, {
					type: 'pie',
					data: {
						labels: ['Confirmed', 'Deaths'],
						datasets: [
							{
								label: '# of Votes',
								data: [confirmed, deaths],
								backgroundColor: [
									'rgba(226, 125, 10, 0.2)',
									'rgba(132, 207, 71, 0.2)',
								],
								borderColor: ['rgba(226, 125, 10, 1)', 'rgba(132, 207, 71, 1)'],
								borderWidth: 1,
							},
						],
					},
					options: {
						scales: {
							y: {
								beginAtZero: true,
							},
						},
					},
				})
				closeBtnModalSelector.forEach(element => {
					element.addEventListener('click', () => {
						myChart2.destroy()
					})
				});
				modalFade.addEventListener('click', () =>{
					myChart2.destroy()
				})
			})
		})
	}
	creaTabla(moreThanTenThousand)
})()
