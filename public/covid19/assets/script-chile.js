// importacion de modulos
import {
	getDeathsChile,
	getConfirmedChile,
	getRecoveredChile,
	jwt,
} from './apicall.js'
import { lineChart } from './graph.js'
import { getElementBySelector, getElementByAllSelectors } from './functions.js'

// selectores del DOM
const logInToggleSelector = getElementBySelector('#log-in')
const logOutToggleSelector = getElementBySelector('#log-out')
const hideOnLoadSelector = getElementByAllSelectors('.hide-on-load')
const loaderWrapperSelector = getElementBySelector('.loader-wrapper')

// event listener al boton logout del navbar. Borra el JSON web token y redirige a la pagina de inicio
logOutToggleSelector.addEventListener('click', () => {
	localStorage.clear()
	window.location.href = 'index.html'
})
// condicion que verifica si el JSON web token existe
if (jwt) {
	// si el JSON web token existe, agrega o remueve clases a los elementos del DOM
	logInToggleSelector.classList.add('d-none')
	logOutToggleSelector.classList.toggle('d-none')
	// si el jwt no existe muestra un alert
} else {
	alert('Inicia sesión para ver el gráfico')
}

;(async () => {
	// guarda los datos recibidos del api en las contantes confirmed, deaths, recovered
	const deaths = await getDeathsChile()
	const confirmed = await getConfirmedChile()
	const recovered = await getRecoveredChile()
	// condicion que verifica cuando los datos del api son recibidos
	if (recovered) {
		// foreach que a cada elemento de hideOnLoadSelector le agrega la clase d-block para poder ser mostrados
		hideOnLoadSelector.forEach((e) => {
			e.classList.add('d-block')
		})
		// oculta icono de carga
		loaderWrapperSelector.classList.add('d-none')
	}

	// filtrando y desglosando datos de la api
	const deathsDate = deaths.map(({ date }) => date)
	const deathsTotal = deaths.map(({ total }) => total)
	const confirmedTotal = confirmed.map(({ total }) => total)
	const recoveredTotal = recovered.map(({ total }) => total)

	// llamando a la funcion lineChart para crear el grafico con sus parametros
	lineChart(deathsDate, deathsTotal, confirmedTotal, recoveredTotal)
})()
