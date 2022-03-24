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
// getContries
const getContries = async (coutry) => {
  try {
    const response = await fetch(`http://localhost:3000/api/countries/${coutry}`, {
      method: 'GET',
      headers: {
      },
    })
    const { data } = await response.json()
    return data
  } catch (err) {
    console.error(`Error: ${err}`)
  }
  
}

// Informacion de la API - funcion IIFE
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
    for (i = 0; i < array.length; i++) {
       const row = `<tr>
             <td>${array[i].location}</td>
             <td>${array[i].confirmed}</td>
             <td>${array[i].deaths}</td>
             <td>${array[i].recovered}</td>
             <td>${array[i].active}</td>
             <td><a>ver detalle</a></td><a></a>
          <tr>`
       col = col + row
       tabla.innerHTML = col
    }
 }
 creaTabla(moreThanTenThousand)
 console.log(await getContries('Bolivia'))
})()
