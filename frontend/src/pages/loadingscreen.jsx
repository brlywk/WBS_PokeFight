import React from "react";
import loadingImage from "../assets/loading.gif";

function LoadingScreen() {
  return (
    <div className="loading-screen">
      <img src={loadingImage} alt="Loading" />
      <div className="loading-button"></div>
    </div>
  );
}

export default LoadingScreen;