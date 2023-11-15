import React from 'react'
import "./spinner.css";

const Spinner = () => {
  return (
    <div className="spinner-overlay">
      <div className="loading-container">
      <span className="loading loading-dots loading-lg custom-spinner "></span>
      </div>
    </div>
  )
}

export default Spinner
