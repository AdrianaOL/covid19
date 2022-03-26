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

// export const modalGraph = (confirmed, deaths) => {
// 	const ctx2 = document.getElementById('myChart2').getContext('2d')
// 	const myChart2 = new Chart(ctx2, {
// 		type: 'pie',
// 		data: {
// 			labels: ['Confirmed', 'Deaths'],
// 			datasets: [
// 				{
// 					label: '# of Votes',
// 					data: [confirmed, deaths],
// 					backgroundColor: [
// 						'rgba(226, 125, 10, 0.2)',
// 						'rgba(132, 207, 71, 0.2)',
// 					],
// 					borderColor: ['rgba(226, 125, 10, 1)', 'rgba(132, 207, 71, 1)'],
// 					borderWidth: 1,
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
// 	return myChart2
// }