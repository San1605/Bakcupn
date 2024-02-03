
import React, { useState, useEffect } from 'react';


function LoaderText({ className }) {
  const [currentMessageIndex, setCurrentMessageIndex] = useState(0);
  const [apiResponded, setApiResponded] = useState(false);
  const messages = [
    'Connecting to Server',
    'Authenticating User',
    'Fetching Project List',
    'Processing Project Data',
    'Analyzing Project Details',
    'Optimizing Database Queries',
    'Compiling Project Information',
    'Applying Security Measures',
    'Verifying Project Integrity',
    'Handling User Permissions',
    'Ensuring Data Consistency',
  ];
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentMessageIndex((prevIndex) => (prevIndex + 1) % messages.length);
      if (apiResponded) {
        setApiResponded(false);
      }
    }, 1000);
    return () => clearInterval(intervalId);
  }, [apiResponded]);


  useEffect(() => {
    const apiResponseTimeout = setTimeout(() => {
      setApiResponded(true);
    }, 23000);

    return () => clearTimeout(apiResponseTimeout);
  }, []);

  return (
    <div className={`${className} w-full flex items-center justify-center`}>
      <div className="loader-container">
        <div className="loader-item">
          <span className="loader-dot"></span>
          {/* <div className="spinner"></div> */}
          <span className="loader-text">{messages[currentMessageIndex]}</span>
        </div>
      </div>
    </div>
  );
}

export default LoaderText;
