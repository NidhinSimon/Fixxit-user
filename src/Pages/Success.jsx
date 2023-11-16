import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import UserNav from './UserNav';

const Success = () => {
  const [providerInfo, setProviderInfo] = useState(null); // State to hold provider information
  const [loading, setLoading] = useState(true);

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
  <UserNav/>
   
    <div className="flex justify-center items-center h-screen">
      {loading ? ( 
        <div className="bg-slate-300 w-72 sm:w-96 h-48 rounded-xl flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 z-10">
          <span className="loading loading-spinner text-success"></span>
          <h1 className="text-center text-lg sm:text-xl md:text-xl lg:text-xl">
            Searching for Providers. Please wait.
          </h1>
        </div>
      ) : providerInfo ? ( // Provider found state
        <div className="bg-blue-200 w-72 sm:w-96 rounded-xl p-4 sm:p-6 lg:p-8 z-10 ">
          <h1 className="text-center text-lg sm:text-xl md:text-xl lg:text-xl">
            YAY ! WE FOUND YOU OUR BEST EMPLOYEEE
          </h1>
          <div className="profile-info">
            {/* <img src={providerInfo.profileImage} alt="Provider" className="rounded-full h-16 w-16" /> */}
            <h1 className="text-lg font-semibold">{providerInfo.name}</h1>
            <p>Phone: {providerInfo.mobile}</p>
           <p>Age:{providerInfo.age}</p>
          </div>
        </div>
      ) : (
        <div className="bg-slate-300 w-72 sm:w-96 h-48 rounded-xl flex flex-col justify-center items-center p-4 sm:p-6 lg:p-8 z-10">
          <h1 className="text-center text-lg sm:text-xl md:text-xl lg:text-xl">
            No Providers Found. Please try again later.
          </h1>
        </div>
      )}
    </div>
    </>
  );
};

export default Success;
