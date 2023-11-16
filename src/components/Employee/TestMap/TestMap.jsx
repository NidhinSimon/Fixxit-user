import React, { useState } from 'react';
import { LoginSocialFacebook } from 'reactjs-social-login';
import { FacebookLoginButton } from 'react-social-login-buttons';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { verifyFb } from '../../../api/userApi';

const MapComponent = () => {
  const [profile, setProfile] = useState(null);

  const navigate=useNavigate()
  const handleFacebookLogin = async (resolve) => {
    try {
      const accessToken = resolve.data?.accessToken;

      if (!accessToken) {
       
        console.error("Access token not found");
        return;
      }

      const response = await verifyFb(accessToken)
      console.log(response, '--------------------');


      if(response.data.message==='User login successful')
      {
        navigate('/home')
      }

      else if(response.data.message==='No account associated with this email')

      {
toast.error("Account Doesnt exist Please Register")
      }
      else
      {
        console.log(error.message)
      }
      const { userExists, message } = response.data;

      if (userExists) {
      
        toast.success("User login successful:", userExists);
      } else {
     
        console.log(message);
      }
    } catch (error) {
      console.error('Error during Facebook login:', error);
    }
  };

  return (
    <>
      <h1>susgsggshgshg</h1>
      <Toaster />
      <div>
        {!profile ? (
          <LoginSocialFacebook
            appId='7087144684681528'
            onResolve={(resolve) => {
              console.log(resolve);
              setProfile(resolve.data);
              handleFacebookLogin(resolve);
            }}
            onReject={(error) => {
              console.log(error);
            }}
          >
            <FacebookLoginButton />
          </LoginSocialFacebook>
        ) : (
          <div>
            <h1>{profile.name}</h1>
            <h2>{profile.email}</h2>
          </div>
        )}
      </div>
    </>
  );
};

export default MapComponent;
