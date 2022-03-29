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
			labels: ['Confirmed', 'Deaths', 'recovered', 'active'],
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

// export const lineChart = () => {
// 	const labels = Utils.months({ count: 7 })
// 	const ctx2 = document.getElementById('line-chart').getContext('2d')
// 	const myChart3 = new Chart(ctx2, {
// 		type: 'line',
// 		data: {
// 			labels: labels,
// 			datasets: [
// 				{
// 					label: 'My First Dataset',
// 					data: [65, 59, 80, 81, 56, 55, 40],
// 					fill: false,
// 					borderColor: 'rgb(75, 192, 192)',
// 					tension: 0.1,
// 				},
// 			],
// 		},
// 		options: {
// 			scales: {
// 				y: {
// 					beginAtZero: true,
// 				},
// 			},
// 		},
// 	})
// 	return myChart3
// }

// const labels = Utils.months({ count: 7 })
// const data = {
// 	labels: labels,
// 	datasets: [
// 		{
// 			label: 'My First Dataset',
// 			data: [65, 59, 80, 81, 56, 55, 40],
// 			fill: false,
// 			borderColor: 'rgb(75, 192, 192)',
// 			tension: 0.1,
// 		},
// 	],
// }
// const config = {
// 	type: 'line',
// 	data: data,
// }
