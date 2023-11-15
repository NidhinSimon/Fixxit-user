import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import UpcomingBookings from "./UpcomingBookings";
import AllBookings from "./AllBookings";
import Navbar from "./Navbar";

const Bookings = () => {
  const [activeTab, setActiveTab] = useState("all");

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (

    <>
    
  
    <Navbar/>
    <div className="bg-gray-100 min-h-screen p-4 mt-14">
      {/* <header className="text-center text-2xl font-bold py-4">
      Your Bookings
      </header> */}
      <nav className="flex justify-center space-x-4 mb-4">
        <button
          className={`py-2 px-4 rounded focus:outline-none ${
            activeTab === "upcoming"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabChange("upcoming")}
        >
          Upcoming Bookings
        </button>
        <button
          className={`py-2 px-4 rounded focus:outline-none ${
            activeTab === "all"
              ? "bg-blue-500 text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => handleTabChange("all")}
        >
          All Bookings
        </button>
      </nav>
      {activeTab === "upcoming" ? <UpcomingBookings /> : <AllBookings />}
    </div>
    </>
  );
};

export default Bookings;
