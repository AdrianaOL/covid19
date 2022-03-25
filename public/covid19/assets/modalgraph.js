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
					label: 'Casos Activos',
					data: confirmed,
					borderColor: 'red',
					backgroundColor: 'red',
				},
				{
					label: 'Muertos',
					data: deaths,
					borderColor: 'blue',
					backgroundColor: 'blue',
				},
				{
					label: 'Recuperados',
					data: recovered,
					borderColor: 'yellow',
					backgroundColor: 'yellow',
				},
				{
					label: 'Activos',
					data: active,
					borderColor: 'green',
					backgroundColor: 'green',
				},
			],
		},
		options: {
			responsive: true,
			plugins: {
				legend: {
					position: 'top',
				},
				title: {
					display: true,
					text: 'Casos Covid19',
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