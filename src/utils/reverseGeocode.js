/**
 * Reverse geocode coordinates to get city name using the specified API.
 *
 * @param {number} latitude
 * @param {number} longitude
 * @returns {Promise<string>} City name or an empty string if not found.
 */
const reverseGeocode = async (latitude, longitude) => {
    try {
      const response = await fetch(`https://geocode.maps.co/reverse?lat=${latitude}&lon=${longitude}`);
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      // Convert the response to JSON
      const data = await response.json();
      return data;
  
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error.message);
      throw error;
    }
  };
  

export default reverseGeocode;
