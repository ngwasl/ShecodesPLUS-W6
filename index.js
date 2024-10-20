/import axios from 'axios';/;
function search(event) {
  event.preventDefault();

  let searchInputElement = document.querySelector("#search-input");
  let cityElement = document.querySelector("#current-city");
  cityElement.innerHTML = searchInputElement.value;

  // Fetch weather data for the city entered by the user
  fetchWeatherData(searchInputElement.value);
}

// Function to fetch weather data from the API
function fetchWeatherData(city) {
  let apiKey = "b2a5adcct04b33178913oc335f405433"; // this is the API key
  let units = "metric"; //  metric for Celsius

  axios
    .get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${apiKey}`
    )
    .then((response) => {
      // Get the temperature from the API response
      let temperature = response.data.main.temp;
      let temperatureValueElement = document.querySelector(
        ".current-temperature-value"
      );
      temperatureValueElement.innerHTML = Math.round(temperature); // Round the temperature value

      //here you can update other weather details here
      let weatherDescription = response.data.weather[0].description;
      let currentDetailsElement = document.querySelector(".current-details");
      currentDetailsElement.innerHTML = `
        <span id="current-date"></span>, ${weatherDescription} <br />
        Humidity: <strong>${response.data.main.humidity}%</strong>, Wind: <strong>${response.data.wind.speed} km/h</strong>
      `;
    })
    .catch((error) => {
      console.error("Error fetching the weather data:", error);
      alert("City not found. Please try again.");
    });
}

// Function to format the date
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

// Initialize the app
let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", search);

let currentDateELement = document.querySelector("#current-date");
let currentDate = new Date();
currentDateELement.innerHTML = formatDate(currentDate);
