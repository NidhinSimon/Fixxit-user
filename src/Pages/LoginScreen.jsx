import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithPopup,
} from "firebase/auth";
import { jwtDecode } from "jwt-decode";

import { auth, provider } from "../components/firebase.config";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../slices/backendSlice";
import { setCredentials } from "../slices/userSlice";
import toast, { Toaster } from "react-hot-toast";
import { PinInput, PinInputField, HStack } from "@chakra-ui/react";
import { GoogleLogin } from "@react-oauth/google";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { googlelogin } from "../slices/userSlice";
import { useGoogleMutation } from "../slices/backendSlice";
import axios from "axios";
const LoginScreen = () => {
  const [number, setNumber] = useState("");
  const [otp, setOtp] = useState("");
  const [otpPage, setOtpPage] = useState(false);
  const [otpTimer, setOtpTimer] = useState(60);
  const [isResendDisabled, setIsResendDisabled] = useState(true);

  useEffect(() => {
    let timerInterval;

    if (otpTimer > 0) {
      timerInterval = setInterval(() => {
        setOtpTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setIsResendDisabled(false);
    }

    return () => {
      clearInterval(timerInterval);
    };
  }, [otpTimer]);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const PhoneVerify = () => {
    const phoneNumber = "+91" + number;

    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setOtpPage(true);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const onCaptchVerify = () => {
    const auth = getAuth();
    window.recaptchaVerifier = new RecaptchaVerifier(
      auth,
      "recaptcha-container",
      {
        size: "invisible",
        callback: (response) => {
          handleSubmit();
        },
        "expired-callback": () => {},
      },
      auth
    );
    PhoneVerify();
  };

  const OtpVerify = () => {
    window.confirmationResult
      .confirm(otp)
      .then(async (res) => {
        console.log(res, "resultttt");
        navigate("/home");
      })
      .catch((error) => {
        toast.error("otp invalid");
        console.log(error.message);
      });
  };

  const [loginuser] = useLoginMutation();

  const [googleLogin]=useGoogleMutation()

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await loginuser({ number }).unwrap();
      dispatch(setCredentials({ ...res }));
      console.log(res, ">>>>>>>>>>>>>>>>>>");

      if (res.message === "User login successful") {
        setOtpPage(true);
        onCaptchVerify();
        OtpVerify();
        localStorage.setItem("usertoken", res.token);
        localStorage.setItem("userData", res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleResendOtp = () => {
    PhoneVerify();
    setIsResendDisabled(true);
    setOtpTimer(60);
  };



  const [gmail,setgmail]=useState("")
  const handleGoogleLogin = async (decoded) => {
   console.log(decoded.email)
   const email = decoded.email;
   

console.log(gmail,">>>")
  //  const response=await axios.post('http://localhost:5000/users/verifyGooglelogin',email)
  //  console.log(response,"???/")
const res=await googleLogin({email}).unwrap()
console.log(res,";")

dispatch(googlelogin({...res}))
   if(res.message==='User login successful')
   {
    navigate("/home")
   }
   if(res.message==='User not registered')
   {
    // navigate('/register')
    toast.error("Email Doesnt Exist Please create a new account")
   }
   
  };





  return (
    <>
      <div className="border h-screen bg-gradient-to-br from-blue-300 to-blue-500   ">
        <Toaster />
        <form onSubmit={handleSubmit}>
          <div className="flex w-full max-w-sm mx-auto overflow-hidden  bg-white rounded-lg shadow-2xl dark:bg-slate-200 lg:max-w-5xl mt-44  max-h-96  text-slate-950 border border-slate-200 ">
            <div
              className="hidden bg-cover lg:block lg:w-1/2  h-96  "
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dj8z6xx94/image/upload/v1694351697/Screenshot_2023-09-10_184145_tx4mgg.png')",
              }}
            ></div>
            {otpPage ? (
              <div className="max-w-4xl p-6 mx-auto bg-white rounded-md  dark:bg-slate-200 ">
                <h1 className="text-black relative left-4 mt-10 text-xl pl-4 ">
                  Enter the OTP sent to your Mobile Number
                </h1>
                <h1 className="text-orange-400 relative  top-10 left-28 text-lg">
                  Enter The OTP{" "}
                </h1>
                <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-slate-200 my-10  ">
                  <input
                    type="number"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="ml-20"
                  />
                </section>

                {otpTimer > 0 ? (
                  <>
                    <button
                      className="btn btn-primary relative bottom-34 left-32 text-lg"
                      onClick={OtpVerify}
                    >
                      Verify
                    </button>
                    <div className="text-center mt-2">
                      OTP will expire in {otpTimer} seconds.
                    </div>
                  </>
                ) : (
                  <div className="text-center mt-2">
                    {isResendDisabled ? (
                      <span className="text-gray-400">Resend OTP</span>
                    ) : (
                      <button
                        className="btn btn-secondary"
                        onClick={handleResendOtp}
                        disabled={isResendDisabled}
                      >
                        Resend OTP
                      </button>
                    )}
                  </div>
                )}
              </div>
            ) : (
              <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                <div className="flex justify-center mx-auto">
                  <img
                    className="w-auto h-7 sm:h-8"
                    src="https://imgs.search.brave.com/XFUL8QZF7KnfxN5ci6odfH2chnPwJKce8iAk9btO_zg/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9pbWcu/ZnJlZXBpay5jb20v/ZnJlZS12ZWN0b3Iv/YnJhbmRpbmctaWRl/bnRpdHktY29ycG9y/YXRlLXZlY3Rvci1s/b2dvLWRlc2lnbl80/NjA4NDgtODcxNy5q/cGc_c2l6ZT02MjYm/ZXh0PWpwZw"
                    alt=""
                  />
                </div>

                <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                  Welcome back!
                </p>
                <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
                  <a
                    href="#"
                    className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
                  >
                    Login with mobile
                  </a>
                  <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                </div>

                <div className="mt-4">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-slate-800"
                    htmlFor="number"
                  >
                    PHONE
                  </label>

                  <input
                    value={number}
                    onChange={(e) => setNumber(e.target.value)}
                    id="number"
                    placeholder="Enter the Mobile Number"
                    className="block w-full px-4 py-2 bg-slate-50 border rounded-lg dark:text-black  focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                  />
                </div>

                <div className="mt-6">
                  <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                    LOGIN WITH OTP
                    {/* {isLoading ? (
                    <span className="loading loading-spinner text-error"></span>
                  ) : (
                    ""
                  )} */}
                  </button>
                
                  <GoogleLogin
                    onSuccess={(credentialResponse) => {
                      var decoded=jwtDecode(credentialResponse.credential)
                      console.log(decoded);
                      if(decoded)
                      {
                        handleGoogleLogin(decoded)
                      }
                    }}
                    onError={() => {
                      console.log("Login Failed");
                    }}
                  />
                  
                  <div className="text-center">
                    <a
                      href="#"
                      className="text-xs text-slate-800 uppercase dark:text-gray-800 hover:underline"
                      onClick={() => navigate("/register")}
                    >
                      or Sign up
                    </a>
                  </div>
                </div>
              </div>
            )}
          </div>
        </form>
      </div>
      <div id="recaptcha-container"></div>
    </>
  );
};

export default LoginScreen;
