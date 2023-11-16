import React, { useState, useEffect } from "react";
import Navbar from "../../Pages/Navbar";

import { useSelector } from "react-redux";
import axios from "axios";
import UserNav from "../../Pages/UserNav";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faExclamationTriangle,
  faComment,
} from "@fortawesome/free-solid-svg-icons";
import Swal from "sweetalert2";
import Modal from "react-modal";
import io from "socket.io-client";
import Chat from "./USerModal/Chat";

import { useNavigate } from "react-router-dom";

const UserBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [activeTab, setActiveTab] = useState("accepted");
  const [isChatModalOpen, setChatModalOpen] = useState(false);
  const { userInfo } = useSelector((state) => state.user);
  const userId = userInfo.userExists._id;

  const [reportModalOpen, setReportModalOpen] = useState(false);
  const [reportReason, setreportReason] = useState("");
  const [providerIdToReport, setProviderIdToReport] = useState("");
  const [bookingOTP, setBookingOTP] = useState("");

  const [viewDetails, setView] = useState(false);

  const socket = io("https://fixxit.shop");
  const handleReport = (providerId) => {
    console.log("sisisiusiui");
    setProviderIdToReport(providerId);
    setReportModalOpen(true);
  };

  // Function to close the chat modal
  const closeChatModal = () => {
    setChatModalOpen(false);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(
        `https://fixxit.shop/users/bookings/${userId}`
      );
      console.log(response, ">>>>");
      if (response.status === 200) {
        setBookings(response.data);
      } else {
        console.error("Failed to fetch data");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const filterBookings = (status) => {
    if (status === "all") {
      return bookings;
    } else {
      return bookings.filter(
        (booking) => booking.status.toLowerCase() === status.toLowerCase()
      );
    }
  };

  const handleCancel = async (id) => {
    try {
      const response = await axios.post(
        `https://fixxit.shop/users/canceluser/${id}`
      );

      if (response.data.success) {
        const updatedBookings = bookings.filter(
          (booking) => booking._id !== id
        );

        setBookings(updatedBookings);
        socket.emit("cancelBooking", id);
        Swal.fire({
          icon: "success",
          title: "Booking Canceled",
          text: "The booking has been canceled successfully.",
        });
      } else {
        toast.error("Failed to cancel booking");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const submitReport = async () => {
    console.log("djdgjdgj");
    try {
      const response = await axios.post(
        `https://fixxit.shop/users/reportProvider/${providerIdToReport}`,
        {
          reportReason,
          userId,
        }
      );

      console.log(response, ">>>.");
      if (response.data.message === "success") {
        setReportModalOpen(false);

        toast.success("Provider reported successfully");
      } else {
        toast.error("Failed to report provider");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const navigate = useNavigate();

  const openChatModal = (booking) => {
    console.log(booking.provider, "::::::::::::::::;;");
    // setChatModalOpen(true);

    navigate("/userChat");
  };

  const setViewDetails = (otp) => {
    console.log(otp, "__");
    setView(true);
    setBookingOTP(otp);
  };

  const openChat = async (booking) => {
    try {
      // Make an API request to create a chat between the user and provider
      const response = await axios.post("https://fixxit.shop/chat", {
        userId: userInfo.userExists._id,
        providerId: booking.provider, // Replace with the actual provider ID
      });
  
      if (response.status === 200) {
        // Chat has been successfully created, you can open the chat modal here
        setChatModalOpen(true);
        navigate("/userChat");
      } else {
        // Handle any errors that might occur during chat creation
        console.error("Failed to create chat");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  

  return (
    <>
      <UserNav />
      <Toaster />
      <div className="bg-gray-100 p-4 rounded-md shadow-md mt-16">
        <h2 className="text-xl font-semibold mb-4">Your Bookings</h2>
        <div className="flex space-x-4 mb-4">
          {/* Tabs for switching between accepted, upcoming, and canceled bookings */}
          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "accepted"
                ? "bg-green-500 text-white"
                : "bg-gray-300"
            }`}
            onClick={() => setActiveTab("accepted")}
          >
            Upcoming
          </button>

          <button
            className={`px-4 py-2 rounded-md ${
              activeTab === "all" ? "bg-green-500 text-white" : "bg-gray-300"
            }`}
            onClick={() => setActiveTab("all")}
          >
            All
          </button>
        </div>
        {bookings.length === 0 && activeTab === "accepted" ? (
          <p className="text-center text-gray-600  h-screen mt-48">
            You have no upcoming bookings.
          </p>
        ) : (
          <div className="block rounded-lg bg-white shadow-md dark:bg-neutral-700">
            {filterBookings(activeTab).map((booking) => (
              <li
                key={booking._id}
                className={`p-4 rounded-md shadow-md flex justify-between items-center ${
                  booking.status === "accepted"
                    ? "bg-green-100"
                    : booking.status === "upcoming"
                    ? "bg-blue-100"
                    : "bg-red-100"
                } relative`}
              >
                <div>
                  {booking.serviceName.map((service, index) => (
                    <p
                      key={index}
                      className="text-xl font-semibold text-indigo-600"
                    >
                      {service}
                    </p>
                  ))}
                  <p className="text-gray-600">Date: {booking.date}</p>
                  <p className="text-gray-600">Address: {booking.address}</p>
                  Total:{" "}
                  <button className="btn btn-active btn-accent">
                    {booking.Total}
                  </button>
                </div>
                <p>{booking.provider}</p>
                <p>B{booking.otp}</p>
                <div className="space-x-4">
                  <button
                    onClick={() =>
                      booking.provider && handleReport(booking.provider)
                    }
                    className="absolute top-2 right-2 text-red-500"
                  >
                    <FontAwesomeIcon
                      icon={faExclamationTriangle}
                      style={{ fontSize: "24px" }}
                    />
                  </button>
                  <button onClick={() => openChat(booking)} className="border">
                    <FontAwesomeIcon
                      icon={faComment}
                      style={{ fontSize: "35px", color: "lightgrey" }}
                    />
                  </button>

                  {booking.status === "accepted" && (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="px-4 py-2 bg-red-500 text-white rounded-md hover-bg-red-600"
                    >
                      Cancel
                    </button>
                  )}

                  <button
                    onClick={() => setViewDetails(booking.otp)}
                    className="px-4 mx-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    View Details
                  </button>
                </div>
              </li>
            ))}
          </div>
        )}

        {viewDetails && (
          <>
            <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md rounded-lg">
              <div className="bg-white p-4 rounded-md shadow-md max-w-sm">
                <h2 className="text-xl font-semibold mb-4 text-center">Opt</h2>
                <div className="w-full p-5 mb-2  ">
                  Please dont share this Otp with Anyone OTP: {bookingOTP}
                </div>
                <button
                  onClick={""}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Report
                </button>
                <button
                  onClick={() => setView(false)}
                  className="px-4 mx-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                >
                  Cancel
                </button>
              </div>
            </div>
          </>
        )}

        {reportModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md rounded-lg">
            <div className="bg-white p-4 rounded-md shadow-md max-w-sm">
              <h2 className="text-xl font-semibold mb-4 text-center">Report</h2>
              <textarea
                rows="4"
                className="w-full p-2 mb-2 border rounded-md"
                placeholder="Please describe the issue"
                value={reportReason}
                onChange={(e) => setreportReason(e.target.value)}
              />
              <button
                onClick={submitReport}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Report
              </button>
              <button
                onClick={() => setReportModalOpen(false)}
                className="px-4 mx-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Cancel
              </button>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default UserBookings;
