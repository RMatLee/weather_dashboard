// Import necessary dependencies and modules
import React from 'react';

// Styling specific to the WeatherCard component
import '../styles/WeatherCard.css';

// Icons for representing day and night
import sunIcon from '../assets/weather-icons/sun.png';
import moonIcon from '../assets/weather-icons/moon.png';

// WeatherCard component displays weather data for a specific city
const WeatherCard = ({ data }) => {
  // If there's no weather data, display an informative message
  if (!data) {
    return <div>No weather data available. Please search for a city.</div>;
  }

  // Function to convert temperature from Celsius to Fahrenheit
  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
  };
  
  // Render the weather card with data provided
  return (
    <div className="weather-card">
      <img 
        // Display appropriate icon based on whether it's day or night
        src={data.is_day === 1 ? sunIcon : moonIcon} 
        alt={data.is_day === 1 ? 'Sun Icon' : 'Moon Icon'} 
        className="day-night-icon" 
      />
      <div className="weather-temperature">
        {data.temperature}°C
        <span className="fahrenheit">({celsiusToFahrenheit(data.temperature).toFixed(1)}°F)</span>
      </div>
      <div className="weather-windspeed">
        Wind Speed: {data.windspeed} m/s
      </div>
      <div className="weather-winddirection">
        Wind Direction: {data.winddirection}°
      </div>
      <div className="weather-isday">
        {data.is_day === 1 ? 'Daytime' : 'Nighttime'}
      </div>
    </div>
  );
};

// Export the WeatherCard component for use in other parts of the app
export default WeatherCard;
