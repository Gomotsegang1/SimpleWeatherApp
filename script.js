function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();

  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  if (hours < 10) {
    hours = `0${hours}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let formattedDay = days[day];
  return `${formattedDay} ${hours}:${minutes}`;
}

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateELement.innerHTML = formatDate(currentDate);

function search(event) {
  event.preventDefault();
  let apiKey = "afb0efto49219ecce84c4925352dabbe";
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;

  axios
    .get(apiUrl)
    .then(function (response) {
      let currentCity = document.querySelector("#current-city");
      currentCity.innerHTML = response.data.city;

      let currentTemperature = document.querySelector(
        ".current-temperature-value"
      );
      currentTemperature.innerHTML = Math.round(
        response.data.temperature.current
      );
    })
    .catch(function (error) {
      console.error("Error fetching weather data:", error);
    });
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);
