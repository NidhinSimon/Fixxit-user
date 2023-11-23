import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import Navbar from './Navbar';
import UserNav from './UserNav';

import 'leaflet/dist/leaflet.css';

const Success = () => {
  const [providerInfo, setProviderInfo] = useState(null); // State to hold provider information
  const [loading, setLoading] = useState(true);
  const [userLocation, setUserLocation] = useState(null);

  const socket = io("https://fixxit.shop");

  const { userInfo } = useSelector((state) => state.user);
  const userId = userInfo.userExists._id;
  const navigate = useNavigate();

  useEffect(() => {
    let providerInfoTimeout;

    const clearProviderInfo = () => {
      localStorage.removeItem('providerInfo');
      setProviderInfo(null);
      navigate('/home');
    };

    const handleBookingAccepted = (data) => {
      console.log(data, '&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&&');
      const receivedProviderInfo = data.providerInfo;

      setProviderInfo(receivedProviderInfo);

      clearTimeout(providerInfoTimeout);
    };

    socket.on('booking-accepted', handleBookingAccepted);

    const loadingTimeout = setTimeout(() => {
      setLoading(false);
    }, 15000);

    // Get user's location
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserLocation([latitude, longitude]);
      },
      (error) => {
        console.error('Error getting user location:', error);
      }
    );

    return () => {
      clearTimeout(providerInfoTimeout);
      clearTimeout(loadingTimeout);
    };
  }, []);

  const providerIcon = new L.Icon({
    iconUrl: 'https://leafletjs.com/examples/custom-icons/leaf-green.png',
    iconSize: [38, 95],
    iconAnchor: [22, 94],
    popupAnchor: [-3, -76],
  });

  return (
    <>
      <UserNav />
      <div className="relative flex flex-col items-center justify-center h-screen bg-gray-100">
        <MapContainer
          center={userLocation || [0, 0]}
          zoom={13}
          style={{ width: '100%', height: '100%', position: 'absolute' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          {userLocation && (
            <Marker position={userLocation} icon={providerIcon}>
              <Popup>You are here!</Popup>
            </Marker>
          )}
        </MapContainer>
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
      </div>
    </>
  );
};

export default Success;
