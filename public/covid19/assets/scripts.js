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
;(async () => {
  const data = await getData()
  const moreThanTenThousand = data.filter((cases) => cases.confirmed > 2000000)
  console.log(moreThanTenThousand)

 
  //-----------
  const graph = moreThanTenThousand.map((location) => {
    const label = location.location
    return label
    
  })
  const confirmed = moreThanTenThousand.map(p => p.confirmed)
  const deaths = moreThanTenThousand.map(p => p.deaths)
  console.log(deaths)
  const recovered = moreThanTenThousand.map(p => p.recovered)
  const active = moreThanTenThousand.map(p => p.active)
  
  // Gráfico
  const data2 = {
    labels: graph,
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
      }

    ]
  };
const ctx = document.getElementById('myChart').getContext('2d')
const myChart = new Chart(ctx, {
    type: 'bar',
    data: data2,
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'top',
        },
        title: {
          display: true,
          text: 'Chart.js Bar Chart'
        }
      }
    },
})

  console.log (graph)
  //------------------
})()
