function refreshWeather(response) {
  let temperatureElement = document.querySelector("#current-temp");
  let temperature = response.data.temperature.current;
  let cityHeading = document.querySelector("#city-heading");
  let descriptionElement = document.querySelector("#description");
  let humidityElement = document.querySelector("#humidity");
  let windElement = document.querySelector("#wind");
  let timeElement = document.querySelector("#time");
  let date = new Date(response.data.time * 1000);
  let wind = response.data.wind.speed;
  let humidity = response.data.temperature.humidity;
  let iconElement = document.querySelector("#icon");

  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="weather-icon" />`;

  cityHeading.innerHTML = response.data.city;
  timeElement.innerHTML = formatDate(date);
  descriptionElement.innerHTML = response.data.condition.description;
  humidityElement.innerHTML = `${humidity}%`;
  windElement.innerHTML = `${Math.round(wind)} mph`;
  temperatureElement.innerHTML = Math.round(temperature);

  getForecast(response.data.city);
}
function formatDate(date) {
  let hours = date.getHours();
  let minutes = date.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  if (hours > 12) {
    hours = `${hours - 12}`;
    minutes = `${minutes} pm`;
  } else {
    minutes = `${minutes} am`;
  }
  return `${day} ${hours}:${minutes}, `;
}

function searchCity(city) {
  let apiKey = "0afcd2ao9bb24495ta6dd7a01113764b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(refreshWeather);
}

function handleSearch(event) {
  event.preventDefault();
  let citySearch = document.querySelector("#city-search");
  searchCity(citySearch.value);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

function getForecast(city) {
  let apiKey = "0afcd2ao9bb24495ta6dd7a01113764b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=imperial`;
  axios(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  console.log(response.data);
  let forecastElement = document.querySelector("#forecast");

  let days = ["Tue", "Wed", "Thu", "Fri", "Sat"];
  let forecastHtml = "";

  days.forEach(function (day) {
    forecastHtml =
      forecastHtml +
      `
      <div class="weather-forecast-day">
            <div class="weather-forecast-date">${day}</div>
            <div class="weather-forecast-icon">🌤️</div>
            <div class="weather-forecast-temperatures">
              <div class="weather-forecast-temperature">
                <strong>15º</strong>
              </div>
              <div class="weather-forecast-temperature">9º</div>
            </div>
      </div>
   `;
  });
  forecastElement.innerHTML = forecastHtml;
}
searchCity("San Diego");
