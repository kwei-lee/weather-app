function formatDate(date) {
  let minutes = date.getMinutes();
  let hours = date.getHours();
  let day = date.getDay();
  if (minutes < 10) minutes = `0${minutes}`;
  if (hours < 10) hours = `0${hours}`;
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return `${days[day]} ${hours}:${minutes}`;
}

function getWeatherEmojiAndBackground(iconKey) {
  const data = {
    "clear-sky-day": {
      emoji: "☀️",
      bg: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/166/808/original/courtney-cook-HClKQKUodF4-unsplash.jpg?1748408249",
    },
    "clear-sky-night": {
      emoji: "🌙",
      bg: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/166/809/original/pawel-nolbert-62OK9xwVA0c-unsplash.jpg?1748408322",
    },
    "few-clouds-day": {
      emoji: "🌤️",
      bg: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/165/745/original/rodion-kutsaiev-v1IQm8wYBus-unsplash.jpg?1747203460",
    },
    "few-clouds-night": {
      emoji: "🌥️",
      bg: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/166/810/original/ciocan-ciprian-i3SUvEFv0aA-unsplash.jpg?1748408513",
    },
    "scattered-clouds-day": {
      emoji: "⛅",
      bg: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/165/745/original/rodion-kutsaiev-v1IQm8wYBus-unsplash.jpg?1747203460",
    },
    "rain-day": {
      emoji: "🌧️",
      bg: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/166/811/original/alvin-leopold-cWM1ZOSUzU4-unsplash.jpg?1748408810",
    },
    "rain-night": {
      emoji: "🌧️",
      bg: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/166/811/original/alvin-leopold-cWM1ZOSUzU4-unsplash.jpg?1748408810",
    },
    "thunderstorm-day": {
      emoji: "⛈️",
      bg: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/166/811/original/alvin-leopold-cWM1ZOSUzU4-unsplash.jpg?1748408810",
    },
    "snow-day": {
      emoji: "❄️",
      bg: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/166/812/original/aaron-burden-5AiWn2U10cw-unsplash.jpg?1748409025",
    },
    "mist-day": {
      emoji: "🌫️",
      bg: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/166/812/original/aaron-burden-5AiWn2U10cw-unsplash.jpg?1748409025",
    },
  };
  return (
    data[iconKey] || {
      emoji: "🌈",
      bg: "https://s3.amazonaws.com/shecodesio-production/uploads/files/000/166/813/original/kelly-sikkema-eSQNlt0QmXI-unsplash.jpg?1748410227",
    }
  );
}

function displayWeather(response) {
  const city = document.querySelector("#current-city");
  const temp = document.querySelector("#temp");
  const details = document.querySelector("#current-details");
  const icon = document.querySelector("#icon");

  const condition = response.data.condition.icon;
  const description = response.data.condition.description;
  const backgroundData = getWeatherEmojiAndBackground(condition);

  city.textContent = response.data.city;
  temp.textContent = Math.round(response.data.temperature.current);
  icon.textContent = backgroundData.emoji;
  details.innerHTML = `${formatDate(
    new Date()
  )}, ${description}<br>Humidity: <strong>${
    response.data.temperature.humidity
  }%</strong>, Wind: <strong>${response.data.wind.speed} km/h</strong>`;

  document.body.style.backgroundImage = `url('${backgroundData.bg}')`;
}

function searchCity(city) {
  const apiKey = "d00tobdabc481d03f28333aa72f427fb";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}

function search(event) {
  event.preventDefault();
  const city = document.querySelector("#search-input").value;
  searchCity(city);
}

document.querySelector("#search-form").addEventListener("submit", search);

// Load default city
searchCity("Paris");

