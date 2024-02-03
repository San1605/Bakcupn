import React from 'react'
import "./NotFound.css"
import { useNavigate } from 'react-router-dom'
const NotFound = () => {
    const navigate = useNavigate();
    return (
        <div className="not-found-container">
            <p className="not-found-message">404 - Not Found</p>
            <button className="go-back-button" onClick={() => navigate("/dashboard")}>
                Please go back to Dashboard
            </button>
        </div>
    )
}

export default NotFound
