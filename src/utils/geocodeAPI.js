// src/utils/geocodeAPI.js

const GEO_BASE_URL = "https://geocode.maps.co/search?q=";

/**
 * Fetch latitude and longitude for a given city.
 * @param {string} city The name of the city to fetch coordinates for.
 * @returns {Object} The coordinates (latitude and longitude) for the city.
 */
export async function fetchCoordinatesForCity(city) {
  try {
    const response = await fetch(`${GEO_BASE_URL}${city}`);

    if (!response.ok) {
      throw new Error(`Error fetching coordinates for ${city}: ${response.statusText}`);
    }

    const data = await response.json();

    // For simplicity, we'll choose the first result.
    // You could add more logic to choose the best result based on your requirements.
    const firstResult = data[0];

    return {
      latitude: firstResult.lat,
      longitude: firstResult.lon
    };

  } catch (error) {
    console.error(error);
    throw error;
  }
}
