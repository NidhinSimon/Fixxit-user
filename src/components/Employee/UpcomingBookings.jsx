import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

import io from "socket.io-client";
import OtpModal from "./EmpOptModal/OtpModal";
import toast,{Toaster} from 'react-hot-toast'
import { cancelBooking } from "../../api/empApi";

const UpcomingBookings = () => {
  const [upcomingBookings, setUpcomingBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [id, setId] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false); 

  const [otp, setOtp] = useState("");

  const { providerInfo } = useSelector((state) => state.employee);
  const providerId = providerInfo.provider._id;

  const socket = io("https://fixxit.shop");

  useEffect(() => {
    upcomingBookings(providerId)
      .then((response) => {
        const data = response.data;
        console.log(data, ">");
        const acceptedBookings = data.filter(
          (booking) => booking.status === "accepted"
        );
        
      
        const upcomingBookingsFiltered = acceptedBookings.filter(
          (booking) => booking.workStatus !== "completed"
        );
  
        setUpcomingBookings(upcomingBookingsFiltered);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching upcoming bookings:", error);
        setError("Failed to fetch upcoming bookings. Please try again later.");
        setLoading(false);
      });
  
    socket.on("bookingAccepted", (bookingId) => {
      const updatedBookings = upcomingBookings.map((booking) => {
        if (booking._id === bookingId) {
          return { ...booking, status: "accepted" };
        }
        return booking;
      });
      setUpcomingBookings(updatedBookings);
    });
  
    socket.on("newBooking", (newBooking) => {
      if (newBooking.status === "accepted") {
        setUpcomingBookings([...upcomingBookings, newBooking]);
      }
    });
  
    return () => {
      socket.disconnect();
    };
  }, [providerId, upcomingBookings]);
  


  
  const handleCancel = async (bookingId) => {
    try {
      const response = await cancelBooking(bookingId)
      if (response.data.success) {
        const updatedBookings = upcomingBookings.filter((booking) => booking._id !== bookingId);
        setUpcomingBookings(updatedBookings);
  
      
        toast.success("Booking canceled successfully");

        console.log("Booking canceled successfully");
      } else {
   
        console.error("Booking cancellation failed");
      }
    } catch (error) {
      console.error("Error canceling booking:", error);

    }
  };
  
  const isBookingToday = (bookingDate) => {
    const currentDate = new Date();
    const bookingDateTime = new Date(bookingDate);
    return (
      bookingDateTime.getDate() === currentDate.getDate() &&
      bookingDateTime.getMonth() === currentDate.getMonth() &&
      bookingDateTime.getFullYear() === currentDate.getFullYear()
    );
  };

  const confirmBlock = () => {
    setIsModalOpen(false);
  };

  const handleCancelmodal = () => {
    setIsModalOpen(false);
  };

  const handleOpen = (id) => {
    setIsModalOpen(true);
    setId(id);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <Toaster />
      <h2 className="text-3xl font-bold mb-4">Upcoming Bookings</h2>
      {loading ? (
        <Spinner />
      ) : error ? (
        <p className="text-lg text-red-600">{error}</p>
      ) : (
        <ul className="space-y-4">
          {upcomingBookings.length === 0 ? (
            <p className="text-lg text-gray-600">
              No upcoming bookings with pending work status at the moment.
            </p>
          ) : (
            upcomingBookings.map((booking) => (
              <li
                key={booking._id}
                className="bg-gray-100 p-4 rounded-lg flex flex-col space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <p className="text-xl font-semibold text-indigo-600">
                      {booking.serviceName}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Date:</strong> {booking.date}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Location:</strong> {booking.address}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Amount:</strong> {booking.Total}
                    </p>
                  </div>
                  {isBookingToday(booking.date) ? (
                    booking.workStatus === "accepted" ? (
                      <p className="text-sm text-green-600">Booking is accepted</p>
                    ) : (
                      <button
                        onClick={() => handleOpen(booking._id)}
                        className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-700 focus:outline-none"
                      >
                        Complete Booking
                      </button>
                    )
                  ) : (
                    <button
                      onClick={() => handleCancel(booking._id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-full hover:bg-red-700 focus:outline-none"
                    >
                      Cancel Booking
                    </button>
                  )}
                </div>

                {isModalOpen && (
                  <OtpModal
                    message="Please Enter the OTP from the User"
                    onConfirm={confirmBlock}
                    onClose={handleCancelmodal}
                    bookingId={id}
                  />
                )}
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default UpcomingBookings;
