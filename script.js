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

      let currentIcon = document.querySelector("#icon");
      currentIcon.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-temperature-icon"/>`;

      let currentForecast = document.querySelector("#current-forecast");
      currentForecast.innerHTML = response.data.condition.description;

      let humidity = document.querySelector("#humidity-percentage");
      humidity.innerHTML = `${response.data.temperature.humidity}%`;

      let wind = document.querySelector("#wind-speed");
      wind.innerHTML = `${response.data.wind.speed}km/h`;
    })
    .catch(function (error) {
      console.error("Error fetching weather data:", error);
    });
}

function displayForecast() {
  let forecastElement = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHTML = "";
  days.forEach(function (day) {
    forecastHTML =
      forecastHTML +
      `
<div class="weather-forecast-day">
  <div class="weather-forecast-date">${day}</div>
  <div class="weather-forecast-icon"></div>
  <div class="weather-forecast-temperatures">
    <div class="weather-forecast-temperature">
      <strong>15°</strong>
      </div>
  <div class="weather-forecast-temperature">
       <strong>9°</strong>
       </div>
  </div>
</div>`;
  });

  forecastElement.innerHTML = forecastHTML;
}
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

displayForecast();
