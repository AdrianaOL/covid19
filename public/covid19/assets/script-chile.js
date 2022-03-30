import {
  getDeathsChile,
  getConfirmedChile,
  getRecoveredChile,
  jwt, 
} from "./apicall.js";
// import { lineChart } from "./graph.js";
const logInToggle = document.querySelector('#log-in')
const logOutToggle = document.querySelector('#log-out')
// const chileSituationToggle = document.querySelector('#chile-situation')


logOutToggle.addEventListener('click', () => {
	localStorage.clear()
	window.location.href = 'index.html'
})
if (jwt) {
	logInToggle.classList.add("d-none");
	logOutToggle.classList.toggle("d-none");
  }
(async () => {
  const deaths = await getDeathsChile();
  const confirmed = await getConfirmedChile();
  const recovered = await getRecoveredChile();
  const deathsDate = deaths.map(({ date }) => date);
  const deathsTotal = deaths.map(({ total }) => total);
  const confirmedTotal = confirmed.map(({ total }) => total);
  const recoveredTotal = recovered.map(({ total }) => total);
  console.log("deaths", deaths);
  console.log("confirmed", confirmed);
  console.log("recovered", recovered);
  const ctx2 = document.getElementById("line-chart").getContext("2d");
  const labels = deathsDate;
  const myChart3 = new Chart(ctx2, {
    type: "line",
    data: {
      labels: labels,
      datasets: [
        {
          label: "Muertos",
          data: deathsTotal,
          borderColor: "#f5d33de0",
          backgroundColor: "#f5d33de0",
        },
        {
          label: "Confirmados",
          data: confirmedTotal,
          borderColor: "#e72626d0",
          backgroundColor: "#e7262696",
        },
        {
          label: "Recuperados",
          data: recoveredTotal,
          borderColor: "#90f74ce0",
          backgroundColor: "#90f74ce0",
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
  });
})();
