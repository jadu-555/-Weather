// app.js
document.getElementById('getWeatherBtn').addEventListener('click', getWeather);

function getWeather() {
    const location = document.getElementById('locationInput').value.trim();
    if (!location) {
        alert('Please enter a location!');
        return;
    }

    const apiKey = 'addeb7cb28064dd6acd41307250304'; // Your API key
    const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

    fetch(url)
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                displayError('Location not found. Please try again.');
            } else {
                displayWeather(data);
            }
        })
        .catch(error => {
            console.error('Error fetching weather data:', error);
            displayError('There was an error fetching the weather data.');
        });
}

function displayWeather(data) {
    const cityName = data.location.name;
    const temperature = `Temperature: ${data.current.temp_c}°C`;
    document.getElementById('cityName').innerText = `Weather in ${cityName}`;
    document.getElementById('temperature').innerText = temperature;
    document.getElementById('errorMessage').innerText = '';  // Clear any previous error message
}

function displayError(message) {
    document.getElementById('errorMessage').innerText = message;
    document.getElementById('cityName').innerText = '';
    document.getElementById('temperature').innerText = '';
}
