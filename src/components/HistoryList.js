// Import necessary dependencies and modules
import React, { useState, useEffect } from 'react';

// Styling specific to the HistoryList component
import '../styles/HistoryList.css';

// Utility function for reverse geocoding (converting coordinates to city names)
import reverseGeocode from '../utils/reverseGeocode';

// HistoryItem component represents a single item in the history list
const HistoryItem = ({ latitude, longitude, onCityClick, onDelete }) => {
  // State to hold the city name derived from coordinates
  const [city, setCity] = useState('');

  // useEffect hook to fetch the city name once the component is mounted or when the coordinates change
  useEffect(() => {
    reverseGeocode(latitude, longitude)
      .then(response => {
        const retrievedCity = response.address.city;
        setCity(retrievedCity);
      })
      .catch(error => {
        console.error('Error getting city:', error);
      });
  }, [latitude, longitude]);

  // Render a single history item with the city name and delete button
  return (
    <li className="history-item">
      <span onClick={() => onCityClick(latitude, longitude)}>
        {city || 'Loading...'}
      </span>
      <span className="delete-icon" onClick={onDelete}>x</span>
    </li>
  );
};

// HistoryList component displays a list of previously searched cities
const HistoryList = ({ history, onCityClick, onDeleteHistory }) => {
  // If there's no search history, display an informative message
  if (!history || history.length === 0) {
    return <div>No search history available.</div>;
  }

  // Render the list of previously searched cities
  return (
    <div className="history-list">
      <h3>Search History:</h3>
      <ul>
        {history.map((item, index) => 
          <HistoryItem 
              key={index} 
              latitude={item.latitude} 
              longitude={item.longitude} 
              onCityClick={onCityClick}
              onDelete={() => onDeleteHistory(item.latitude, item.longitude)}
          />
        )}
      </ul>
    </div>
  );
};

// Export the HistoryList component for use in other parts of the app
export default HistoryList;
