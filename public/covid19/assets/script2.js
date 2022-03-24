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
    const moreThanTenThousand = data.filter((cases) => cases.confirmed > 10000)
   
    //-----------
    const graph = moreThanTenThousand.map((location) => {
      const label = location.location
      return label
      
    })
    // Gráfico
    const paises = [
      {
        nombre: 'Chile',
        activos: 1000,
        muertos: 342,
      },
      {
        nombre: 'US',
        activos: 1000,
        muertos: 433,
      }
    ]
    const data2 = {
      labels: paises.map(p => p.nombre),
      datasets: [
        {
          label: 'Activos',
          data: paises.map(p => p.activos),
          borderColor: 'red',
          backgroundColor: 'red',
        },
        {
          label: 'Muertos',
          data: paises.map(p => p.muertos),
          borderColor: 'blue',
          backgroundColor: 'blue',
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
  