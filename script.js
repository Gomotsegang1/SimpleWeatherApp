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

let currentDateElement = document.querySelector("#current-date");
let currentDate = new Date();

currentDateElement.innerHTML = formatDate(currentDate);

function search(event) {
  event.preventDefault();
  let apiKey = "afb0efto49219ecce84c4925352dabbe";
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value.trim();
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

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

      getForeCast(response.data.city);
    })
    .catch(function (error) {
      console.error("Error fetching weather data:", error);
    });
}

function getForeCast(city) {
  let apiKey = "afb0efto49219ecce84c4925352dabbe";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}&units=metric`;
  axios
    .get(apiUrl)
    .then(displayForecast)
    .catch(function (error) {
      console.error("Error fetching forecast data:", error);
    });
}

function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = "";
  response.data.daily.forEach(function (day, index) {
    if (index < 5) {
      forecastHTML += `
      <div class="weather-forecast-day">
        <div class="weather-forecast-date">${formatDay(day.time)}</div>
        <div class="weather-forecast-icon">
          <img src="${day.condition.icon_url}" alt="${
        day.condition.description
      }">
        </div>
        <div class="weather-forecast-temperatures">
          <div class="weather-forecast-temperature">
            <strong>${Math.round(day.temperature.maximum)}°</strong>
          </div>
          <div class="weather-forecast-temperature">
            ${Math.round(day.temperature.minimum)}°
          </div>
        </div>
      </div>`;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Fetch initial weather data for Paris
function initialLoad(city) {
  let apiKey = "afb0efto49219ecce84c4925352dabbe";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

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

      getForeCast(response.data.city);
    })
    .catch(function (error) {
      console.error("Error fetching weather data:", error);
    });
}

// Load initial weather data for Paris
initialLoad("Paris");
