const modalItemTitleSelector = document.querySelector('#modal-item-title')
const modalBody = document.querySelector('#modal-body')
const closeBtnModalSelector = document.querySelector('#close-btn-modal')

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
    const response = await fetch(
      `http://localhost:3000/api/countries/${coutry}`,
      {
        method: 'GET',
        headers: {},
      }
    )
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
  //-----------
  const graph = moreThanTenThousand.map((location) => location.location)
  const confirmed = moreThanTenThousand.map((p) => p.confirmed)
  const deaths = moreThanTenThousand.map((p) => p.deaths)
  const recovered = moreThanTenThousand.map((p) => p.recovered)
  const active = moreThanTenThousand.map((p) => p.active)

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
      },
    ],
  }
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
          text: 'Casos Covid19',
        },
      },
    },
  })
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
				<td>
				<button data-location="${array[i].location}" class="btn btn-link boton-modal text-white">Ver detalles</button></td>
			<tr>`
      col += row
      tabla.innerHTML = col
    }
    const btns = document.querySelectorAll('.boton-modal')
    // console.log(btns)
    btns.forEach((element) => {
      element.addEventListener('click', async (e) => {
        const location = e.target.dataset.location
        var myModal = new bootstrap.Modal(
          document.getElementById('exampleModal')
        )
        myModal.show()
        modalItemTitleSelector.innerHTML = location
        const countryData = await getContries(location)
        console.log(countryData)
        const { confirmed, deaths } = countryData
        console.log(confirmed, deaths)

        closeBtnModalSelector.addEventListener('click', () => {
          myChart2.destroy()
        })

        const ctx2 = document.getElementById('myChart2').getContext('2d')
        const myChart2 = new Chart(ctx2, {
          type: 'pie',
          data: {
            labels: ['Confirmed', 'Deaths'],
            datasets: [
              {
                label: '# of Votes',
                data: [confirmed, deaths],
                backgroundColor: [
                  'rgba(226, 125, 10, 0.2)',
                  'rgba(132, 207, 71, 0.2)',
                ],
                borderColor: ['rgba(226, 125, 10, 1)', 'rgba(132, 207, 71, 1)'],
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
      })
    })
  }
  creaTabla(moreThanTenThousand)
})()
