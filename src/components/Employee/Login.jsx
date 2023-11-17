import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import debounce from "lodash/debounce";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase.config";
import Modal from "./Modal";
import { useNavigate } from "react-router-dom";
import Spinner from "./Spinner";
import { PinInput, PinInputField } from "@chakra-ui/react";
import { useDispatch } from "react-redux";
import { setProviderInfo } from "../../slices/employeeSlice";
import { useFormik } from 'formik';
import * as Yup from 'yup';

const Login = () => {
  const navigate = useNavigate();
  const [otpPage, setOtppage] = useState(false);
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [mobile, setMobile] = useState("");
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [showrejectedModal, setShowrejectedModal] = useState(false);
  const [loading, setLoading] = useState(false);

  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    mobile: Yup.string()
      .required('Mobile number is required')
      .matches(/^\d{10}$/, 'Mobile number must be 10 digits'),
  });

  const formik = useFormik({
    initialValues: {
      mobile: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      setLoading(true);
      try {
        const res = await axios.post("https://fixxit.shop/providerlogin", {
          mobile: values.mobile,
        });
        dispatch(setProviderInfo(res.data));

        if (res.data.message === "Provider Login Successfull") {
          setOtppage(true);
          onCaptchVerify();
          OtpVerify();
        } else if (res.data.message === "provider  does not exist") {
          toast.error("provider does not exist please register");
        } else {
          toast.error("Login failed");
        }
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
  });

  const onCaptchVerify = () => {
    const authInstance = getAuth();
    if (!window.recaptchaVerifier) {
      window.recaptchaVerifier = new RecaptchaVerifier(
        authInstance,
        "recaptcha-container",
        {
          size: "invisible",
          callback: (response) => {
            handleSubmit();
          },
          "expired-callback": () => {},
        },
        authInstance
      );
    }
    PhoneVerify();
  };

  const PhoneVerify = () => {
    const phoneNumber = "+91" + formik.values.mobile;
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((confirmationResult) => {
        window.confirmationResult = confirmationResult;
        setOtppage(true);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  const OtpVerify = () => {
    const otpString = otp.join("");
    window.confirmationResult
      .confirm(otpString)
      .then((res) => {
        if (res.user) {
          navigate("/empDash");
        } else {
          toast.error("OTP verification failed");
        }
      })
      .catch((error) => {
        toast.error("OTP Verification Error:", error);
      });
  };

  const handlePinInputChange = (index, event) => {
    const newValue = event.target.value;
    setOtp((prevOtp) => {
      const newOtp = [...prevOtp];
      newOtp[index] = newValue;
      return newOtp;
    });
  };

  const show = () => {
    if (status === "pending" || status === "rejected") {
      setShowModal(true);
    } else {
      setShowModal(false);
    }
  };

  return (
    <>
      <div className="bg-gradient-to-tr from-cyan-400 to-indigo-300  h-screen border">
        <Toaster />
        {loading && <Spinner />}

        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-badge shadow-2xl  lg:max-w-4xl mt-36 border ">
          <div
            className="hidden bg-cover lg:block lg:w-1/2 h-96"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dj8z6xx94/image/upload/v1694598632/login_provider_bike_aii7qz.jpg')",
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
                <section className="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-slate-200 my-10">
                  <PinInput>
                    {otp.map((value, index) => (
                      <PinInputField
                        key={index}
                        value={value}
                        onChange={(e) => handlePinInputChange(index, e)}
                        className="w-12 h-12 border border-gray-300 p-2 rounded-md text-center"
                      />
                    ))}
                  </PinInput>
                </section>

                <button
                  onClick={OtpVerify}
                  className="btn btn-primary relative bottom-34 left-32 text-lg"
                >
                  Verify
                </button>
              </div>
            </>
          ) : (
            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2 mt-6">
              <p className="mt-3 text-2xl text-center text-indigo-700 font-semibold lg:">
                Welcome
              </p>

              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                <span>Login with Mobile</span>

                <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>
              </div>

              <div className="mt-4">
                <label
                  className="block mb-2 text-sm font-medium text-gray-600 "
                  htmlFor="LoggingEmailAddress"
                >
                  Phone
                </label>
                <input
                  id="LoggingEmailAddress"
                  name="mobile"
                  value={formik.values.mobile}
                  placeholder="Enter Your Mobile Number"
                  className={`block w-full px-4 py-2 text-black bg-white border rounded-lg  dark:border-gray-300 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 ${
                    formik.touched.mobile && formik.errors.mobile
                      ? 'border-red-500'
                      : ''
                  }`}
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.mobile && formik.errors.mobile ? (
                  <div className="text-red-500 text-xs mt-1">{formik.errors.mobile}</div>
                ) : null}
              </div>

              <div className="mt-6">
                <button
                  onClick={formik.handleSubmit}
                  className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
                >
                  Sign In
                </button>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                <a
                  href="#"
                  className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                >
                  or sign up
                </a>

                <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
              </div>
            </div>
          )}
        </div>
      </div>
      <div id="recaptcha-container"></div>
      {showModal && (
        <Modal
          message="Your Details has been sent To Verification You will receive a Mail once approved"
          onclose={() => setShowModal(false)}
        />
      )}

      {showrejectedModal && (
        <Modal
          message="We are Sorry to inform You that your Profile Has Been Rejected"
          icon-
          onclose={() => setShowrejectedModal(false)}
        />
      )}
    </>
  );
};

export default Login;
