// getData
const getData = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/total', {
        method: 'GET',
        headers: {
          //Authorization: `Bearer ${jwt}`,
        },
      })
      const { data } = await response.json()
      return data
    } catch (err) {
      console.error(`Error: ${err}`)
    }
  }
// Informacion de la API
(async()=>{
const data = await getData()
const moreThanTenThousand = data.filter(cases=>cases.confirmed>10000)
console.log(moreThanTenThousand)
})()
// Gráfico
const ctx = document.getElementById('myChart').getContext('2d');
const myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});