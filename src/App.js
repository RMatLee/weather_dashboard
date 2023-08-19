import React, { useState } from 'react';
import './styles/App.css';
import SearchBar from './components/SearchBar';
import WeatherCard from './components/WeatherCard';
import HistoryList from './components/HistoryList';
import { fetchWeatherForCoordinates } from './utils/weatherAPI';

function App() {
    // State to store the current weather data
    const [weatherData, setWeatherData] = useState(null);
    
    // State to store the search history
    const [searchHistory, setSearchHistory] = useState([]);

    // Handler function to set weather data and update the search history
    const handleWeatherData = (data, coords) => {
        setWeatherData(data);
        
        // Prepend the new coordinates to the start of the search history array
        setSearchHistory(prevHistory => [
            { latitude: parseFloat(coords.latitude), longitude: parseFloat(coords.longitude) },
            ...prevHistory
        ]);
    };

    // Handler function to search for weather data from previously searched coordinates
    const handleSearchFromHistory = async (latitude, longitude) => {
        try {
            // Fetch the weather for the given coordinates
            const weather = await fetchWeatherForCoordinates(latitude, longitude);
            setWeatherData(weather);
            
            // Move the clicked coordinates to the top of the search history list
            setSearchHistory(prevHistory => [
                { latitude, longitude },
                ...prevHistory.filter(item => item.latitude !== latitude && item.longitude !== longitude)
            ]);
        } catch (error) {
            console.error('Error fetching weather data from history:', error);
        }
    }

    // Handler function to delete an item from the search history
    const handleDeleteFromHistory = (latitude, longitude) => {
        setSearchHistory(prevHistory => prevHistory.filter(item => item.latitude !== latitude && item.longitude !== longitude));
    };

    return (
        <div className="App">
            <h1>Weather Dashboard</h1>
            <SearchBar onFetchWeatherData={handleWeatherData} />
            
            {/* Display the weather card if there is data */}
            {weatherData && <WeatherCard data={weatherData} />}
            
            {/* Display the search history */}
            <HistoryList history={searchHistory} onCityClick={handleSearchFromHistory} onDeleteHistory={handleDeleteFromHistory} />
        </div>
    );
}

export default App;
