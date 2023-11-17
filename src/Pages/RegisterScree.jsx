import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useRegisterMutation } from "../slices/backendSlice";



import { setCredentials } from "../slices/userSlice";



import { getAuth, RecaptchaVerifier , signInWithPhoneNumber,GoogleAuthProvider,signInWithPopup} from "firebase/auth";

import { PinInput, PinInputField, HStack } from "@chakra-ui/react";

import { auth } from "../components/firebase.config";
import { async } from "@firebase/util";
import axios from 'axios'
import toast, { Toaster } from "react-hot-toast";


const RegisterScree = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [otpPage, setOtpPage] = useState(false);
  const [otp,setOtp]=useState("")
  const [user,setUser]=useState(null)


  const [nameError, setNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [mobileError, setMobileError] = useState("");


  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const { userInfo } = useSelector((state) => state.user);



  const validateFields = () => {
    let isValid = true;

    if (name.trim() === "") {
      setNameError("Name is required.");
      isValid = false;
    } else {
      setNameError("");
    }

    if (email.trim() === "") {
      setEmailError("Email is required.");
      isValid = false;
    } else {
      setEmailError("");
    }

    if (mobile.trim() === "") {
      setMobileError("Mobile is required.");
      isValid = false;
    } else if (!/^\d{10}$/.test(mobile)) {
      setMobileError("Mobile must be a 10-digit number.");
      isValid = false;
    } else {
      setMobileError("");
    }

    return isValid;
  };



  useEffect(() => {
    if (userInfo) {
    }
  }, []);

  const handleSubmit = async (e) => {

    e.preventDefault();
    const isValid = validateFields();

  if (!isValid) {
    return;
  }

    const res=await axios.post('https://fixxit.shop/users/check',{mobile})
    console.log(res,'}}}}}}}}}}}}}}}}}}}}}}}}}')



    if(res.data.message==='user not registered')
    {

      onCaptchVerify();
      const phoneNumber= "+91"  + mobile;
    
      const appVerifier = window.recaptchaVerifier;
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
        .then((confirmationResult) => {
          window.confirmationResult = confirmationResult;
          setOtpPage(true);
          
        })
        .catch((error) => {
          console.log(error);
        });
  
    }else  if(res.data.message==='user exists')
    {
      console.log("insise else if")
      toast.error("MOBILE ALREADY EXIST")
    }
    else
    {
      toast.error("somethig error")

    }




  };


  const OtpVerify=(e)=>{
   console.log(otp)

    window.confirmationResult.confirm(otp).then(async(res)=>{
      console.log(res,"resultttt")
      console.log(user)
      registerUser()
     

    }).catch((error)=>{
      console.log(error,"otp errroorrrr")
    })
  }


  const registerUser=async()=>{
    try {
      const res = await register({ name, email, mobile }).unwrap();
    
        dispatch(setCredentials({ ...res }));
        navigate("/home");
      
    } catch (error) {
      console.log(error)
    }
  }

  

  const onCaptchVerify = () => {
    const auth = getAuth();
    console.log('____________________,..................,..,.,.,.,.,.,.,.,.,.,.,.,..................____________________')
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
  };

  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();
  
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // You can now use the 'user' object to get user information and handle the sign-in process.
      setUser(user);
      // Redirect or perform other actions as needed.
    } catch (error) {
      console.error("Google Sign-In Error: ", error);
    }
  };
  

  return (
    <>
      <div className="border border-black h-screen bg-gradient-to-tl from-blue-400 to-cyan-100"  >
      <Toaster />
        <form onSubmit={handleSubmit}>
       
          <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-2xl dark:bg-slate-200 lg:max-w-5xl mt-28 text-slate-950 border border-slate-200" >
            <div
              className="hidden bg-cover lg:block lg:w-2/3"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dj8z6xx94/image/upload/v1694232693/Screenshot_2023-09-09_093958_q0vbpa.png')",
              }}
            ></div>

            {otpPage ? (
              <>
                 <div className="max-w-4xl p-6 mx-auto bg-white rounded-md  dark:bg-slate-200 ">
                  <h1 className="text-black relative left-4 mt-10 text-xl pl-4 ">
                    Enter the Otp sent To your Mobile Number
                  </h1>
                  <h1 className="text-orange-400 relative  top-10 left-28 text-lg">
                    Enter The Otp{" "}
                  </h1>
                  <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-slate-200 my-10  ">
                  {/* <HStack spacing={6}>
                      <PinInput>
                        {[1, 2, 3, 4, 5, 6].map((index) => (
                          <PinInputField
                            key={index}
                            value={otp[index - 1] || ""}
                            // onChange={OtpVerify} // Comment this line out
                            className="custom-pin-input"
                          />
                        ))}
                      </PinInput>
                    </HStack> */}

                    <input
                      type="number"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                    />
                  </section>

                  <button
                    className="btn btn-primary relative bottom-34 left-32 text-lg"
                    onClick={OtpVerify}
                  >
                    Verify
                  </button>
                </div>
              </>
            ) : (
              <div className="w-full px-6 py-8 md:px-8 lg:w-1/2  ">
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
                 
                    className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
                  >
                    or signup with mobile
                  </a>
                  <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                </div>

                <div className="mt-4 ">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-slate-950"
                    htmlFor="LoggingName"
                  >
                    Name
                  </label>
                  <input
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="LoggingName"
                    placeholder="Enter Your Name"
                    className={`block w-full px-4 py-2  bg-slate-50 border rounded-lg dark:text-black  focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 ${
                      nameError ? "border-red-500" : ""
                    }`}
                    type="text"
                  />
                  {nameError && (
                    <p className="text-red-500 text-sm mt-1">{nameError}</p>
                  )}
                </div>

                <div className="mt-4">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-slate-950"
                    htmlFor="LoggingEmailAddress"
                  >
                    Email Address
                  </label>
                  <input
                    value={email}
                    placeholder="Enter Your Email"
                    onChange={(e) => setEmail(e.target.value)}
                    id="LoggingEmailAddress"
                    className={`block w-full px-4 py-2  bg-slate-50 border rounded-lg dark:text-black  focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 ${
                      emailError ? "border-red-500" : ""
                    }`}
                    type="text"
                  />
                  {emailError && (
                    <p className="text-red-500 text-sm mt-1">{emailError}</p>
                  )}
                </div>

                <div className="mt-4">
                  <label
                    className="block mb-2 text-sm font-medium text-gray-600 dark:text-slate-950"
                    htmlFor="LoggingMobile"
                  >
                    Mobile
                  </label>
                  <input
                    value={mobile}
                    placeholder="Enter Your Mobile"
                    onChange={(e) => setMobile(e.target.value)}
                    id="LoggingMobile"
                    className={`block w-full px-4 py-2  bg-slate-50 border rounded-lg dark:text-black  focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 ${
                      mobileError ? "border-red-500" : ""
                    }`}
                    type="text"
                  />
                  {mobileError && (
                    <p className="text-red-500 text-sm mt-1">{mobileError}</p>
                  )}
                </div>
                <div className="mt-6">
                  <button className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50">
                    Sign In
                    {isLoading ? (
                      <span className="loading loading-spinner text-error"></span>
                    ) : (
                      ""
                    )}
                  </button>
                 

                 <div className="text-center">
                 <a
      
        className="text-xs text-slate-800 uppercase dark:text-gray-800 hover:underline" onClick={() => navigate('/')}
      >
        or LOGIN
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

export default RegisterScree;
