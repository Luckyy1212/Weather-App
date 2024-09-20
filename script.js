const inputBox = document.querySelector('.input-box');
const searchBtn = document.getElementById('searchBtn');
const weather_img = document.querySelector('.weather-img');
const temperature = document.querySelector('.temperature');
const description = document.querySelector('.description');
const humidity = document.getElementById('humidity');
const wind_speed = document.getElementById('wind-speed');

const location_not_found = document.querySelector('.location-not-found');
const weather_body = document.querySelector('.weather-body');

async function checkWeather(city) {
    const api_key = "507dea11b8e149daa72194226241909";
    const url = `http://api.weatherapi.com/v1/current.json?key=${api_key}&q=${city}&aqi=yes`;

    const weather_data = await fetch(url).then(response => response.json());

    // Check if location is not found
    if (weather_data.error) {
        location_not_found.style.display = "flex";
        weather_body.style.display = "none";
        console.log("Location not found");
        return;
    }

    // Display weather information
    location_not_found.style.display = "none";
    weather_body.style.display = "flex";

    temperature.innerHTML = `${Math.round(weather_data.current.temp_c)}°C`;
    description.innerHTML = `${weather_data.current.condition.text}`;

    humidity.innerHTML = `${weather_data.current.humidity}%`;
    wind_speed.innerHTML = `${weather_data.current.wind_kph} Km/H`;

    const weatherCondition = weather_data.current.condition.text.toLowerCase();
    console.log("Weather condition:", weatherCondition);

    // Display the correct image based on the condition text
    if (weatherCondition.includes('cloud')) {
        weather_img.src = "cloud.png";
    } else if (weatherCondition.includes('clear')) {
        weather_img.src = "clear.png";
    } else if (weatherCondition.includes('rain')) {
        weather_img.src = "rain.png";
    } else if (weatherCondition.includes('mist')) {
        weather_img.src = "mist.png";
    } else if (weatherCondition.includes('snow')) {
        weather_img.src = "snow.png";
    } else {
        weather_img.src = "default.png"; // Fallback image for any other conditions
    }

    console.log(weather_data);
}

searchBtn.addEventListener('click', () => {
    checkWeather(inputBox.value);
});
