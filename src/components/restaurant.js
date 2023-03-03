import React, { useState, useEffect } from "react"; // 16.0 set the different components, name the component and export them
import RestaurantDataService from "../services/restaurant.js" // 19.0 we import the useEffect and useState from React hooks and the restaurant file from services to get acces to all methods to make requests from the server
import { Link } from "react-router-dom"

function Restaurant() {
  return (
    <div className="App">
      RESTAURANT!
    </div>
  );
}

export default Restaurant;