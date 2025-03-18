import React from 'react';

const CarbonChainLogo = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        className="w-20 h-20 text-green-500"
    >
        <circle cx="50" cy="50" r="40" stroke="green" strokeWidth="4" fill="lightgray" />
        <path d="M30 30 L70 70 M70 30 L30 70" stroke="green" strokeWidth="4" />
        <circle cx="30" cy="30" r="5" fill="green" />
        <circle cx="70" cy="70" r="5" fill="green" />
        <circle cx="30" cy="70" r="5" fill="green" />
        <circle cx="70" cy="30" r="5" fill="green" />
    </svg>
);

export default CarbonChainLogo;