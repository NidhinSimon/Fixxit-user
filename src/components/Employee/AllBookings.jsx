import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";

const AllBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { providerInfo } = useSelector((state) => state.employee);
  const providerId = providerInfo.provider._id;

  useEffect(() => {
    axios
      .get(`http://localhost:5000/allbookings/${providerId}`)
      .then((response) => {
        console.log(response, "..");
        setBookings(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Failed to fetch bookings:", error);
        setLoading(false);
      });
  }, [providerId]);

  const handleCancel = async (bookingId) => {
    try {
      console.log(bookingId, "...");
      const response = await axios.post(
        `http://localhost:5000/cancel/${bookingId}`
      );
      console.log(response, ">>>>>>>>>>>>>");
      if (response.data.success) {
        toast("Booking Cancelled Successfully", {
          icon: "👏",
          style: {
            borderRadius: "10px",
            background: "#333",
            color: "#fff",
          },
        });
        const updatedBookings = bookings.filter(
          (booking) => booking._id !== bookingId
        );
        setBookings(updatedBookings);

      }
    } catch (error) {
      console.error("Error canceling booking:", error);
      setError("Failed to cancel the booking. Please try again later.");
    }
  };
  return (
    <div className="booking-list p-4">
      <h2 className="text-3xl font-bold text-center text-indigo-600 mb-4">
        All Bookings
      </h2>
      {loading ? (
        <Spinner />
      ) : (
        <ul className="space-y-4">
          {bookings.length === 0 ? (
            <p className="text-lg text-gray-600">
              No upcoming bookings at the moment.
            </p>
          ) : (
            bookings.map((booking) => (
              <li
                key={booking.id}
                className="bg-gray-100 p-4 rounded-lg flex flex-col space-y-2"
              >
                <div className="flex justify-between items-center">
                  <div>
                    {booking.serviceName.map((service, index) => (
                      <p
                        key={index}
                        className="text-xl font-semibold text-indigo-600"
                      >
                        {service}
                      </p>
                    ))}

                    <p className="text-sm text-gray-500">
                      <strong>Date:</strong> {booking.date}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>User:</strong> {booking.userName}
                    </p>
                    <p className="text-sm text-gray-500">
                      <strong>Amount:</strong> {booking.Total}
                    </p>
                  </div>
                 
                </div>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
};

export default AllBookings;
