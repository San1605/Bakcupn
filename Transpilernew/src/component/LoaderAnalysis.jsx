import React, { useState, useEffect } from 'react';


function LoaderAnalysis({ className }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [apiResponded, setApiResponded] = useState(false);

  const messages =  [
    'Analyzing File Structure',
    'Detecting Code Patterns',
    'Identifying Security Vulnerabilities',
    'Performing Code Quality Check',
    'Extracting Metrics',
    'Generating Reports',
    'Applying Machine Learning Algorithms',
    'Correlating Data Points',
    'Calculating Performance Metrics',
    'Finalizing Analysis',
  ];

  useEffect(() => {
    const intervalId = setInterval(() => {
      // Switch to the next message
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);

      // Check if the API has responded
      if (apiResponded) {
        setApiResponded(false); // Reset apiResponded to repeat messages
      }
    }, 1500); // Change the interval time as needed (in milliseconds)

    // Clear the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, [apiResponded]); 


  // Simulate API response after 10 seconds (replace with your actual API call)
  useEffect(() => {
    const apiResponseTimeout = setTimeout(() => {
      setApiResponded(true);
    }, 23000); // Simulated API response time (in milliseconds)

    // Clear the timeout when the component unmounts
    return () => clearTimeout(apiResponseTimeout);
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div className={`${className} w-full flex items-center justify-center`}>
      <div className="loader-container">
        <div className="loader-item">
          <span className="loader-dot"></span>
          <span className="loader-text">{messages[currentMessageIndex]}</span>
        </div>
      </div>
    </div>
  );
}

export default LoaderAnalysis;
