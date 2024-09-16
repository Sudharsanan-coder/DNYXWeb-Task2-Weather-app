// Your OpenWeatherMap API key
const apiKey = 'a9308e3e169e69f81b33cd8ab603f8a2';

// Elements
const cityInput = document.getElementById('city');
const searchBtn = document.getElementById('searchBtn');
const weatherInfoDiv = document.getElementById('weatherInfo');
const cityName = document.getElementById('cityName');
const temperature = document.getElementById('temperature');
const description = document.getElementById('description');
const humidity = document.getElementById('humidity');
const wind = document.getElementById('wind');
const convertTempBtn = document.getElementById('convertTempBtn');

let currentTempCelsius = 0;

// Event listener for search button
searchBtn.addEventListener('click', () => {
    const city = cityInput.value;
    if (city) {
        getWeatherData(city);
    }
});

// Fetch weather data
function getWeatherData(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayWeather(data))
        .catch(error => console.error('Error fetching weather data:', error));
}

// Display weather data
function displayWeather(data) {
    if (data.cod === 200) {
        currentTempCelsius = data.main.temp;
        cityName.textContent = data.name;
        temperature.textContent = `Temperature: ${currentTempCelsius}°C`;
        description.textContent = `Weather: ${data.weather[0].description}`;
        

        weatherInfoDiv.style.display = 'block';
    } else {
        alert('City not found, please try again.');
        weatherInfoDiv.style.display = 'none';
    }
}

// Convert temperature between Celsius and Fahrenheit
convertTempBtn.addEventListener('click', () => {
    const isCelsius = convertTempBtn.textContent.includes('Fahrenheit');
    if (isCelsius) {
        const fahrenheit = (currentTempCelsius * 9/5) + 32;
        temperature.textContent = `Temperature: ${fahrenheit.toFixed(2)}°F`;
        convertTempBtn.textContent = 'Convert to Celsius';
    } else {
        temperature.textContent = `Temperature: ${currentTempCelsius}°C`;
        convertTempBtn.textContent = 'Convert to Fahrenheit';
    }
});
