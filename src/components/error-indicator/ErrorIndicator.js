import React from 'react';

import './error-indicator.css';
import icon from './death-star.png';

const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <img src={icon} alt="error-icon"/>
            <span className="boom">BOOM!</span>
            <span> Something get wrong!</span>
            <span>(but we sent drones to fix it :-))</span>
        </div>
    );
};

export default ErrorIndicator;