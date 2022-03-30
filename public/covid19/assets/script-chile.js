import {
	getDeathsChile,
	getConfirmedChile,
	getRecoveredChile,
	jwt,
} from './apicall.js'
import { lineChart } from './graph.js'
const logInToggle = document.querySelector('#log-in')
const logOutToggle = document.querySelector('#log-out')

logOutToggle.addEventListener('click', () => {
	localStorage.clear()
	window.location.href = 'index.html'
})
if (jwt) {
	logInToggle.classList.add('d-none')
	logOutToggle.classList.toggle('d-none')
}
;(async () => {
	const deaths = await getDeathsChile()
	const confirmed = await getConfirmedChile()
	const recovered = await getRecoveredChile()
	const deathsDate = deaths.map(({ date }) => date)
	const deathsTotal = deaths.map(({ total }) => total)
	const confirmedTotal = confirmed.map(({ total }) => total)
	const recoveredTotal = recovered.map(({ total }) => total)
	lineChart(deathsDate, deathsTotal, confirmedTotal, recoveredTotal)
})()
