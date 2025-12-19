const button = document.getElementById("getWeatherBtn");
const result = document.getElementById("result");

button.addEventListener("click", () => {
    const city = document.getElementById("cityInput").value.trim();
    if (!city) {
        result.innerHTML = "Please enter a city name.";
        return;
    }

    fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${city}`)
        .then(res => res.json())
        .then(data => {
            if (!data.results || data.results.length === 0) {
                result.innerHTML = "City not found.";
                return;
            }

            const { latitude, longitude, name, country } = data.results[0];

            fetch(`https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current_weather=true`)
                .then(res => res.json())
                .then(weatherData => {
                    const weather = weatherData.current_weather;
                    result.innerHTML = `
            <h2>${name}, ${country}</h2>
            <p><strong>Temperature:</strong> ${weather.temperature} °C</p>
            <p><strong>Wind Speed:</strong> ${weather.windspeed} km/h</p>
            <p><strong>Condition Code:</strong> ${weather.weathercode}</p>
            <p><strong>Time:</strong> ${weather.time}</p>
            `;
                });
        })
        .catch(() => {
            result.innerHTML = "Failed to get weather data.";
        });
});
