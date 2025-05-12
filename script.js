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

function getWeatherEmoji(icon) {
  const icons = {
    "clear-sky-day": "☀️",
    "clear-sky-night": "🌙",
    "few-clouds-day": "🌤️",
    "few-clouds-night": "🌥️",
    "scattered-clouds-day": "⛅",
    "scattered-clouds-night": "☁️",
    "broken-clouds-day": "🌥️",
    "broken-clouds-night": "☁️",
    "shower-rain-day": "🌧️",
    "shower-rain-night": "🌧️",
    "rain-day": "🌧️",
    "rain-night": "🌧️",
    "thunderstorm-day": "⛈️",
    "thunderstorm-night": "⛈️",
    "snow-day": "❄️",
    "snow-night": "❄️",
    "mist-day": "🌫️",
    "mist-night": "🌫️",
  };
  return icons[icon] || "🌈";
}

function displayWeather(response) {
  let cityElement = document.querySelector("#current-city");
  let temperatureElement = document.querySelector(".current-temperature-value");
  let weatherDetails = document.querySelector(".current-details");
  let iconElement = document.querySelector(".current-temperature-icon");

  cityElement.innerHTML = response.data.city;
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);
  weatherDetails.innerHTML = `${formatDate(new Date())}, ${
    response.data.condition.description
  } <br />
Humidity: <strong>${response.data.temperature.humidity}%</strong>, 
Wind: <strong>${response.data.wind.speed} km/h</strong>`;
  iconElement.innerHTML = getWeatherEmoji(response.data.condition.icon);
}

function search(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-input");
  let city = searchInputElement.value;
  let apiKey = "d00tobdabc481d03f28333aa72f427fb";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  axios.get(apiUrl).then(displayWeather);
}

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

// Set current date/time on page load
let currentDateElement = document.querySelector("#current-date");
currentDateElement.innerHTML = formatDate(new Date());
