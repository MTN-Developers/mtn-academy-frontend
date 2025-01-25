// components/LoadingSpinner.jsx
import React from "react";
// import "./LoadingSpinner.css";

const LoadingSpinner = ({ size = "medium", color = "#3498db" }) => {
  const spinnerSizes = {
    small: "20px",
    medium: "40px",
    large: "60px",
  };

  const spinnerStyles = {
    width: spinnerSizes[size] || spinnerSizes.medium,
    height: spinnerSizes[size] || spinnerSizes.medium,
    borderColor: `${color} transparent transparent transparent`,
  };

  return (
    <div className="spinner-container">
      <div className="spinner" style={spinnerStyles}></div>
    </div>
  );
};

export default LoadingSpinner;
