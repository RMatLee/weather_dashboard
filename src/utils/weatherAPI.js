// src/utils/weatherAPI.js

const WEATHER_BASE_URL = "https://api.open-meteo.com/v1/forecast?";

/**
 * Fetch current weather for given latitude and longitude.
 * @param {number} latitude The latitude of the location.
 * @param {number} longitude The longitude of the location.
 * @returns {Object} The current weather data for the location.
 */
export async function fetchWeatherForCoordinates(latitude, longitude) {
  try {
    const response = await fetch(`${WEATHER_BASE_URL}latitude=${latitude}&longitude=${longitude}&current_weather=true`);

    if (!response.ok) {
      throw new Error(`Error fetching weather for coordinates ${latitude},${longitude}: ${response.statusText}`);
    }

    const data = await response.json();

    return data.current_weather;

  } catch (error) {
    console.error(error);
    throw error;
  }
}
