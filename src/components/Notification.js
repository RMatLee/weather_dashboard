// src/components/Notification.js
import React from 'react';
import '../styles/Notification.css'; // Assuming you'll create a corresponding CSS file for styling

function Notification({ message, type }) {
    // Depending on how you design, you might not need this component to maintain its own state.
    // Here, we're simply using it for presentation.
    const getNotificationClass = () => {
        switch (type) {
            case 'error':
                return 'notification error';
            case 'success':
                return 'notification success';
            case 'info':
            default:
                return 'notification info';
        }
    };

    return (
        <div className={getNotificationClass()}>
            {message}
        </div>
    );
}

export default Notification;
