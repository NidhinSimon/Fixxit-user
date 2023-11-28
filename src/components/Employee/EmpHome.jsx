import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import { useSelector } from "react-redux";
import toast, { Toaster } from "react-hot-toast";
import Navbar from "./Navbar";
import axios from "axios";
import { acceptBooking } from "../../api/empApi";
import EmpNavbar from "./EmpNavbar/EmpNavbar";

const EmpHome = () => {
  const { providerInfo } = useSelector((state) => state.employee);
  const providerId = providerInfo.provider._id;

  const socket = io("https://fixxit.shop");
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    socket.emit("join-provider-room", providerId);
    axios.get(`https://fixxit.shop/requests/${providerId}`)
      .then((response) => {
        console.log(response,"-----------")
        setRequests(response.data);
      })
      .catch((error) => {
        console.error("Error fetching requests:", error);
      });

    socket.on("cancel-booking", (data) => {
     
      const canceledBookingId = data.bookingId;
      setRequests((prevRequests) =>
        prevRequests.filter((booking) => booking._id !== canceledBookingId)
      );
    });

    socket.on("new-booking-for-provider", (data) => {
      console.log(data, "_______________________________________________________________________________________--");
      const newRequest = data.booking;
      console.log(newRequest, ">>>>>>>>>>>>>>>>>>>>>>>>..."); // <-- Corrected variable name
    
      if (!requests.find((request) => request._id === newRequest._id)) {
        toast.success("New booking request received");
        setRequests((prevRequests) => [...prevRequests, newRequest]);
      }
    });

    socket.on("booking-accepted", (data) => {
      const acceptedBooking = data.booking;
      const acceptedBookingIndex = requests.findIndex(
        (booking) => booking._id === acceptedBooking._id
      );

      if (acceptedBookingIndex !== -1) {
        const updatedRequests = [...requests];
        updatedRequests.splice(acceptedBookingIndex, 1);
        setRequests(updatedRequests);
      }
    });

    return () => {
      socket.off("new-booking-for-provider");
    };
  }, [providerId,socket]);

  const handleAccept = (requestId) => {
    console.log(requestId,'--------')
    axios
      .put(`https://fixxit.shop/boookings/accept/${requestId}`, {
        providerId,
      })
      .then((response) => {
        if (response.data.success) {
          toast.success("Request accepted");
          // Remove the accepted request from the UI
          const updatedRequests = requests.filter(
            (request) => request._id !== requestId
          );
          setRequests(updatedRequests);
        }
      })
      .catch((error) => {
        console.error("Error accepting request:", error);
      });
  };
  

  const handleReject = (bookingId) => {
    const updatedRequests = requests.filter(
      (booking) => booking._id !== bookingId
    );
    setRequests(updatedRequests);
  };

  return (
    <>
      <Toaster />
      <EmpNavbar/>
      <div className="container mx-auto mt-6">
        <h2 className="text-2xl font-bold mb-4">Booking List</h2>
        {requests.length === 0 ? (
          <div className="flex justify-center mt-10">
            <p className="uppercase font-semibold text-lg">
              No bookings available at the moment.
            </p>
          </div>
        ) : (
          <ul className="space-y-4">
        {requests.map((booking, index) => (
  <li
    key={booking._id}
    className="bg-white p-4 shadow-md rounded-lg flex flex-col space-y-2"
  >
    <div>
      {booking.serviceName && (
        <p className="text-lg text-indigo-500">Service Name: {booking.serviceName}</p>
      )}
      <p>Name: {booking.userName}</p>
      <p>Location: {booking.address}</p>
      <p>Total: {booking.Total}</p>
    </div>
    <div className="flex justify-between mt-3">
      <button
        className="bg-green-500 text-white px-3 py-1 rounded"
        onClick={() => handleAccept(booking._id)}
      >
        Accept
      </button>
      <button
        className="bg-red-500 text-white px-3 py-1 rounded"
        onClick={() => handleReject(booking._id)}
      >
        Reject
      </button>
    </div>
  </li>
))}

          </ul>
        )}
      </div>
    </>
  );
};

export default EmpHome;