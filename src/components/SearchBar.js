// Import necessary dependencies and modules
import React, { useState } from 'react';

// Styling specific to the SearchBar component
import '../styles/SearchBar.css';

// Utility functions to fetch coordinates and weather data
import { fetchCoordinatesForCity } from '../utils/geocodeAPI';
import { fetchWeatherForCoordinates } from '../utils/weatherAPI';

// SearchBar component which allows users to input city names and retrieve weather data
function SearchBar({ onFetchWeatherData }) {
    // State to hold the user-inputted city name
    const [city, setCity] = useState('');

    // Asynchronous function to handle user search
    const handleSearch = async () => {
        try {
            // Fetch the coordinates for the provided city
            const coords = await fetchCoordinatesForCity(city);
            
            // Using the obtained coordinates, fetch the associated weather data
            const weather = await fetchWeatherForCoordinates(parseFloat(coords.latitude), parseFloat(coords.longitude));
            
            // Pass the fetched weather data and coordinates to the parent component
            onFetchWeatherData(weather, coords);
        } catch (error) {
            console.error('Error fetching weather data:', error);
            
            // Notify the user of the error and reset the city input field
            alert('Weather data for the entered city could not be found. Please check the city name and try again.');
            setCity('');
        }
    };

    // Function to handle 'Enter' key press for search
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
            setCity('');
        }
    };

    // Render the search bar and associated button
    return (
        <div>
            <input 
                type="text" 
                value={city} 
                onChange={e => setCity(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Search for a city" 
            />
            <button onClick={handleSearch}>Search</button>
        </div>
    );
}

// Export the SearchBar component for use in other parts of the app
export default SearchBar;
