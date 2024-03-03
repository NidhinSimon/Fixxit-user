import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import UserNav from './UserNav';

const Success = () => {
  const [providerInfo, setProviderInfo] = useState(null); // State to hold provider information
  const [loading, setLoading] = useState(true);

  const socket = io("https://fixxit-server-1.onrender.com");

  const { userInfo } = useSelector((state) => state.user);
  const userId = userInfo.userExists._id;
  const navigate = useNavigate();
  const longitude=75.862640
  const latitude=12.250400

  useEffect(() => {
    let providerInfoTimeout;
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation({ lat: latitude, lng: longitude });
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );

    const clearProviderInfo = () => {
      localStorage.removeItem('providerInfo');
      setProviderInfo(null); 
      navigate('/home');
    };

    const handleBookingAccepted = (data) => {
      console.log(data,'&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&')
      const receivedProviderInfo = data.providerInfo;


      setProviderInfo(receivedProviderInfo);

      clearTimeout(providerInfoTimeout);
    };

    socket.on('booking-accepted', handleBookingAccepted);

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 15000);

    return () => {
      clearTimeout(providerInfoTimeout);
      clearTimeout(loadingTimeout);
    };
  }, []);

  return (
    <>
      <UserNav />
      <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md max-w-md">
          {loading ? (
            <div className="text-center">
              <span className="animate-spin text-3xl text-success">&#x21BB;</span>
              <p className="mt-4">Searching for Providers. Please wait.</p>
            </div>
          ) : providerInfo ? (
            <div className="text-center">
              <p className="text-xl font-semibold">YAY! WE FOUND OUR BEST EMPLOYEE</p>
              <div className="profile-info mt-4">
                {/* Include provider's image if available */}
                {/* <img src={providerInfo.profileImage} alt="Provider" className="rounded-full h-16 w-16 mx-auto" /> */}
                <h1 className="text-lg font-semibold">{providerInfo.name}</h1>
                <p>Phone: {providerInfo.mobile}</p>
                <p>Age: {providerInfo.age}</p>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <p className="text-xl font-semibold">No Providers Found. Please try again later.</p>
            </div>
          )}
        </div>
        <div className="mt-8">
        <iframe
              title="User Location Map"
              width="600"
              height="450"
              frameBorder="0"
              style={{ border: 0 }}
              loading="lazy"
              allowFullScreen
              src={`https://www.google.com/maps/embed/v1/place?q=${latitude},${longitude}&key=AIzaSyA04gExT_3ABGyN3KoRT70m1PdQ0RDWWVA`}
            ></iframe>
        </div>
      </div>
    </>
  );
};

export default Success;
