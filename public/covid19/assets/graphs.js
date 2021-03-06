// bar chart
export const barChart = (
	countriesList,
	confirmed,
	deaths,
	recovered,
	active
) => {
	const ctx = document.getElementById('myChart').getContext('2d')
	const myChart = new Chart(ctx, {
		type: 'bar',
		data: {
			labels: countriesList,
			datasets: [
				{
					label: 'Confirmados',
					data: confirmed,
					borderColor: '#f5d33de0',
					backgroundColor: '#f5d33de0',
				},
				{
					label: 'Muertos',
					data: deaths,
					borderColor: '#e72626d0',
					backgroundColor: '#e7262696',
				},
				{
					label: 'Recuperados',
					data: recovered,
					borderColor: '#90f74ce0',
					backgroundColor: '#90f74ce0',
				},
				{
					label: 'Activos',
					data: active,
					borderColor: '#f3943cef',
					backgroundColor: '#f3943cef',
				},
			],
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'top',
				},
			},
		},
	})
	return myChart
}

// pie chart
export const modalGraph = (confirmed, deaths, recovered, active) => {
	const ctx2 = document.getElementById('myChart2').getContext('2d')
	const myChart2 = new Chart(ctx2, {
		type: 'pie',
		data: {
			labels: ['Confirmados', 'Muertos', 'Recuperados', 'Activos'],
			datasets: [
				{
					label: '',
					data: [confirmed, deaths, recovered, active],
					backgroundColor: ['#f5d33de0', '#e72626d0', '#90f74ce0', '#f3943cef'],
					borderColor: ['#f5d33de0', '#e72626d0', '#90f74ce0', 'f3943cef'],
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
	return myChart2
}

// line chart
export const lineChart = (
	deathsDate,
	deathsTotal,
	confirmedTotal,
	recoveredTotal
) => {
	const ctx2 = document.getElementById('line-chart').getContext('2d')
	const labels = deathsDate
	const myChart3 = new Chart(ctx2, {
		type: 'line',
		data: {
			labels: labels,
			datasets: [
				{
					label: 'Muertos',
					data: deathsTotal,
					borderColor: '#f5d33de0',
					backgroundColor: '#f5d33de0',
				},
				{
					label: 'Confirmados',
					data: confirmedTotal,
					borderColor: '#e72626d0',
					backgroundColor: '#e7262696',
				},
				{
					label: 'Recuperados',
					data: recoveredTotal,
					borderColor: '#90f74ce0',
					backgroundColor: '#90f74ce0',
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
	return myChart3
}
