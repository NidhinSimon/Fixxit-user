import React, { useState, useEffect } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Toast from "../../Pages/Toast";
import * as yup from "yup";
import { useFormik } from "formik";
import { useNavigate } from "react-router-dom";
import Map from "./Map";
import { getCategories } from "../../api/adminApiRoute";
import { addEmployee } from "../../api/empApi";

const EmployeeSignup = () => {
  const [click, setclick] = useState(false);

  const navigate = useNavigate();
  const formArray = [1, 2, 3, 4];
  const [formNo, setFormNo] = useState(formArray[0]);
  const [previewImage, setPreviewImage] = useState(null);
  const [profilepreview, setprofilepreview] = useState(null);
  const [licenseimage, setLicenseimage] = useState(null);

  const [profileimage, setProfileimage] = useState(null);

  const [verify, setVerify] = useState(false);

  const [category, setCategories] = useState([]);

  const [longitude, setLongitude] = useState("");
  const [latitude, setLatitude] = useState("");
  const [address, setAddress] = useState("");

  const validationSchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    age: yup
      .string()
      .typeError("age must be a number")
      .required("age is required"),
    mobile: yup.string().matches(/^\d{10}$/, "Mobile number must be 10 digits"),
    license: yup.string().required("Liscence number is required"),
    selectedCategory: yup.string().required("profession is required"),
    pincode: yup
      .number()
      .typeError("pincode must be number")
      .required("pincode is required"),
    state: yup
      .string()
      .typeError("state must not be a number")
      .required("state is required"),
    city: yup.string().required("city is required"),
  });
  useEffect(() => {
    const categories = async () => {
      try {
        const res = await getCategories()
        console.log(
          res,
          "--------------------------------------------------------"
        );
        setCategories(res.data);
      } catch (error) {
        console.log("error fetching catgeories", error.message);
      }
    };
    categories();
  }, []);

  const next = () => {
    if (formNo < formArray.length) {
      setFormNo(formNo + 1);
    }
  };

  const prev = () => {
    if (formNo > 1) {
      setFormNo(formNo - 1);
    }
  };
  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        if (type === "licenseimage") {
          setLicenseimage(reader.result);
          setPreviewImage(reader.result);
        } else if (type === "profile") {
          setProfileimage(reader.result);
          setprofilepreview(reader.result);
        }
      };
    }
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      age: "",
      mobile: "",
      license: "",
      selectedCategory: "",
      pincode: "",
      state: "",
      city: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (value) => {
      try {
        const res =  await addEmployee({
          ...value,
          licenseimage: licenseimage,
          profileimage: profileimage,
          longitude: longitude,
          latitude: latitude,
          address: address,
        });
        if (res.data.message === "provider added successfully") {
          toast.success("Data sent");
          setVerify(true);
        } else if (res.data.message === "User with the same mobile exist") {
          toast.error("User with the same mobile exists");
        } else if (res.data.message === "User Exist with the same email") {
          toast.error("User with the same email exists");
        }
      } catch (error) {
        console.log(error.message);
      }
    },
  });

  const closeModal = () => {
    setVerify(false);
    navigate("/login");
  };

  const handlemap = async (longitude, latitude, address) => {
    setLatitude(latitude);
    setLongitude(longitude);
    setAddress(address);
    console.log(address, latitude, longitude);
  };

  return (
    <>
      {verify && <Toast onClose={closeModal} />}

      <div className="">
        <Toaster />
        <form onSubmit={formik.handleSubmit} encType="multipart/form-data">
          <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-2xl shadow-lg dark:bg-cyan-100 lg:max-w-6xl mt-12 drop-shadow-2xl h-auto ">
            <div
              className="hidden bg-cover lg:block lg:w-1/2"
              style={{
                backgroundImage:
                  "url('https://res.cloudinary.com/dj8z6xx94/image/upload/v1694407836/Screenshot_2023-09-11_101521_s0wmfr.png')",
              }}
            ></div>
            {formNo === 3 && (
              <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                <div className="flex justify-center mx-auto"></div>

                <p className="mt-3 text-xl text-center text-black ">
                  <ul className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
                    <li className="flex items-center text-blue-600 dark:text-blue-500">
                      <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                        1
                      </span>
                      Personl{" "}
                      <span className="hidden sm:inline-flex sm:ml-2">
                        Info
                      </span>
                      <svg
                        className="w-3 h-3 ml-2 sm:ml-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 12 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m7 9 4-4-4-4M1 9l4-4-4-4"
                        />
                      </svg>
                    </li>
                    <li className="flex items-center">
                      <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                        2
                      </span>
                      Account{" "}
                      <span className="hidden sm:inline-flex sm:ml-2">
                        Info
                      </span>
                      <svg
                        className="w-3 h-3 ml-2 sm:ml-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 12 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m7 9 4-4-4-4M1 9l4-4-4-4"
                        />
                      </svg>
                    </li>
                    <li className="flex items-center">
                      <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                        3
                      </span>
                      Review
                    </li>
                  </ul>
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                  <a
                    href="#"
                    className="text-xs text-center text-black uppercase dark:text-gray-400 hover:underline"
                  >
                    Select your Location
                  </a>

                  <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                </div>

                <div className="mt-4 w-full rounded-3xl  ">
                  <Map clicked={click} handlemap={handlemap} />
                  <div className="flex justify-center">
                    <div
                      onClick={() => setclick(!click)}
                      className="bg-violet-500 w-36 rounded-lg text-center"
                    >
                      Use My Location
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex  justify-center">
                  {" "}
                  <button
                    className="  w-full md:w-auto px-6 py-3 text-sm font-medium tracking-wide  capitalize transition-colors duration-300 transform rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 bg-blue-500 text-white ml-6"
                    onClick={next}
                  >
                    NEXT
                  </button>
                  <button
                    className="w-full md:w-auto px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 btn btn-accent ml-6"
                    onClick={prev}
                  >
                    PREV
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                  <a
                    onClick={() => navigate("/emplogin")}
                    href="#"
                    className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                  >
                    or sign up
                  </a>

                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                </div>
              </div>
            )}

            {formNo === 1 && (
              <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                <div className="flex justify-center mx-auto"></div>

                <p className="mt-3 text-xl text-center text-black ">
                  <ul className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
                    <li className="flex items-center text-blue-600 dark:text-blue-500">
                      <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                        1
                      </span>
                      Personal{" "}
                      <span className="hidden sm:inline-flex sm:ml-2">
                        Info
                      </span>
                      <svg
                        className="w-3 h-3 ml-2 sm:ml-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 12 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m7 9 4-4-4-4M1 9l4-4-4-4"
                        />
                      </svg>
                    </li>
                    <li className="flex items-center">
                      <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                        2
                      </span>
                      Account{" "}
                      <span className="hidden sm:inline-flex sm:ml-2">
                        Info
                      </span>
                      <svg
                        className="w-3 h-3 ml-2 sm:ml-4"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 12 10"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="m7 9 4-4-4-4M1 9l4-4-4-4"
                        />
                      </svg>
                    </li>
                    <li className="flex items-center">
                      <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                        3
                      </span>
                      Review
                    </li>
                  </ul>
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                  <a
                    href="#"
                    className="text-xs text-center text-black uppercase dark:text-gray-400 hover:underline"
                  >
                    Register as Professional
                  </a>

                  <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                </div>

                <div className="mt-4">
                  <label
                    className="block mb-2 text-sm font-medium text-black"
                    htmlFor="Loginname"
                  >
                    Name
                  </label>
                  <input
                    id="Loginname"
                    className={`block w-full px-4 py-2 text-blue- bg-white  rounded-lg focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 border border-blue-200 ${
                      formik.touched.name && formik.errors.name
                        ? "border-red-500"
                        : ""
                    }`}
                    placeholder="Enter Your Name"
                    type="name"
                    name="name"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.name && formik.errors.name && (
                    <div className="text-red-500 text-xs">
                      {formik.errors.name}
                    </div>
                  )}
                </div>

                <div className="mt-4">
                  <div className="flex justify-between">
                    <label
                      className="block mb-2 text-sm font-medium text-black"
                      htmlFor="loggingemail"
                    >
                      Email
                    </label>
                  </div>
                  <input
                    id="loggingemail"
                    className={`block w-full px-4 py-2 text-blue- bg-white border border-blue-200   rounded-lg  focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 ${
                      formik.touched.email && formik.errors.email
                        ? "border-red-500"
                        : ""
                    }`}
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    placeholder="Enter Your Email"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <div className="text-red-500 text-xs">
                      {formik.errors.email}
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <div className="flex justify-between">
                    <label
                      className="block mb-2 text-sm font-medium text-black"
                      htmlFor="loggingemail"
                    >
                      Mobile
                    </label>
                  </div>

                  <input
                    id="logginmobile"
                    className={`block w-full px-4 py-2 text-blue- bg-white border border-blue-200  rounded-lg dark:border-gray-200 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 
                    ${
                      formik.touched.mobile && formik.errors.mobile
                        ? "border-red-500 "
                        : ""
                    }`}
                    type="number"
                    name="mobile"
                    placeholder="Enter Your Mobile"
                    value={formik.values.mobile}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.touched.mobile && formik.errors.mobile && (
                    <div className="text-red-500 text-xs">
                      {formik.errors.mobile}
                    </div>
                  )}
                </div>
                <div className="mt-4">
                  <div className="flex justify-between">
                    <label
                      className="block mb-2 text-sm font-medium text-black"
                      htmlFor="loggingemail"
                    >
                      Select Profession
                    </label>
                  </div>
                  <select
                    required
                    name="selectedCategory" // Add the name attribute for Formik
                    value={formik.values.selectedCategory}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    className={`w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none focus:border-indigo-600 shadow-sm rounded-lg border ${
                      formik.touched.selectedCategory &&
                      formik.errors.selectedCategory
                        ? "border-red-500"
                        : "border-blue-200"
                    }`}
                  >
                    <option value="">Select Category</option>
                    {category.map((category) => (
                      <option key={category._id} value={category._id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                  {formik.touched.selectedCategory &&
                    formik.errors.selectedCategory && (
                      <div className="text-red-500 text-xs">
                        {formik.errors.selectedCategory}
                      </div>
                    )}
                </div>

                <div className="mt-6 flex  justify-center">
                  {" "}
                  <button
                    className="  w-full md:w-auto px-6 py-3 text-sm font-medium tracking-wide  capitalize transition-colors duration-300 transform rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 bg-blue-500 text-white ml-6"
                    onClick={next}
                  >
                    NEXT
                  </button>
                </div>

                <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                  <a
                    onClick={() => navigate("/emplogin")}
                    href="#"
                    className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                  >
                    or sign up
                  </a>

                  <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                </div>
              </div>
            )}

            {formNo === 2 && (
              <>
                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                  <div className="flex justify-center mx-auto"></div>

                  <p className="mt-3 text-xl text-center text-gray-900">
                    <ul className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
                      <li className="flex items-center text-blue-600 dark:text-blue-500">
                        <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                          1
                        </span>
                        Personal{" "}
                        <span className="hidden sm:inline-flex sm:ml-2">
                          Info
                        </span>
                        <svg
                          className="w-3 h-3 ml-2 sm:ml-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 12 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m7 9 4-4-4-4M1 9l4-4-4-4"
                          />
                        </svg>
                      </li>
                      <li className="flex items-center text-blue-600 dark:text-blue-500">
                        <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                          2
                        </span>
                        Basic{" "}
                        <span className="hidden sm:inline-flex sm:ml-2">
                          Info
                        </span>
                        <svg
                          className="w-3 h-3 ml-2 sm:ml-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 12 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m7 9 4-4-4-4M1 9l4-4-4-4"
                          />
                        </svg>
                      </li>
                      <li className="flex items-center">
                        <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                          3
                        </span>
                        Review
                      </li>
                    </ul>
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                    <a
                      href="#"
                      className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
                    >
                      Register as Professional
                    </a>

                    <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                  </div>

                  <div className="mt-4">
                    <label
                      className="block mb-2 text-sm font-medium text-black"
                      htmlFor="LoggingEmailAddress"
                    >
                      Age
                    </label>
                    <input
                      id="LoggingEmailAddress"
                      className={`block w-full px-4 py-2 text-blue- bg-white border border-blue-200 rounded-lg dark:border-gray-200 focus:border-blue-400 focus:ring-opacity-40 dark:focus-border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 ${
                        formik.touched.age && formik.errors.age
                          ? "border-red-500"
                          : ""
                      }`}
                      type="number"
                      name="age"
                      value={formik.values.age}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.age && formik.errors.age && (
                      <div className="text-red-500 text-xs">
                        {formik.errors.age}
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between">
                      <label
                        className="block mb-2 text-sm font-medium text-black"
                        htmlFor="loggingPassword"
                      >
                        State
                      </label>
                    </div>
                    <input
                      id="loggingPassword"
                      className={`block w-full px-4 py-2 text-blue- bg-white border border-blue-200 rounded-lg dark:border-gray-200 focus:border-blue-400 focus:ring-opacity-40 dark:focus-border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 ${
                        formik.touched.state && formik.errors.state
                          ? "border-red-500"
                          : ""
                      }`}
                      type="text"
                      name="state"
                      value={formik.values.state}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.state && formik.errors.state && (
                      <div className="text-red-500 text-xs">
                        {formik.errors.state}
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between">
                      <label
                        className="block mb-2 text-sm font-medium text-black"
                        htmlFor="loggingPassword"
                      >
                        City
                      </label>
                    </div>
                    <input
                      id="loggingPassword"
                      className={`block w-full px-4 py-2 text-blue- bg-white border border-blue-200 rounded-lg dark:border-gray-200 focus:border-blue-400 focus:ring-opacity-40 dark:focus-border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 ${
                        formik.touched.city && formik.errors.city
                          ? "border-red-500"
                          : ""
                      }`}
                      type="text"
                      name="city"
                      value={formik.values.city}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.city && formik.errors.city && (
                      <div className="text-red-500 text-xs">
                        {formik.errors.city}
                      </div>
                    )}
                  </div>

                  <div className="mt-4">
                    <div className="flex justify-between">
                      <label
                        className="block mb-2 text-sm font-medium text-black"
                        htmlFor="loggingPassword"
                      >
                        Pincode
                      </label>
                    </div>
                    <input
                      id="loggingPassword"
                      className={`block w-full px-4 py-2 text-blue- bg-white border border-blue-200 rounded-lg dark:border-gray-200 focus:border-blue-400 focus:ring-opacity-40 dark:focus-border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 ${
                        formik.touched.pincode && formik.errors.pincode
                          ? "border-red-500"
                          : ""
                      }`}
                      type="text"
                      name="pincode"
                      value={formik.values.pincode}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.pincode && formik.errors.pincode && (
                      <div className="text-red-500 text-sm">
                        {formik.errors.pincode}
                      </div>
                    )}
                  </div>

                  <div className="mt-6 flex  justify-center">
                    {" "}
                    <button
                      className="w-full md:w-auto px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 btn btn-accent ml-6"
                      onClick={next}
                    >
                      NEXT
                    </button>
                    <button
                      className="w-full md:w-auto px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 btn btn-accent ml-6"
                      onClick={prev}
                    >
                      PREV
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                    <a
                      onClick={() => navigate("/emplogin")}
                      href="#"
                      className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                    >
                      or sign up
                    </a>

                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                  </div>
                </div>
              </>
            )}

            {formNo === 4 && (
              <>
                <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                  <div className="flex justify-center mx-auto"></div>

                  <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                    <ul className="flex items-center w-full p-3 space-x-2 text-sm font-medium text-center text-gray-500 bg-white border border-gray-200 rounded-lg shadow-sm dark:text-gray-400 sm:text-base dark:bg-gray-800 dark:border-gray-700 sm:p-4 sm:space-x-4">
                      <li className="flex items-center text-blue-600 dark:text-blue-500">
                        <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-blue-600 rounded-full shrink-0 dark:border-blue-500">
                          1
                        </span>
                        Personal{" "}
                        <span className="hidden sm:inline-flex sm:ml-2">
                          Info
                        </span>
                        <svg
                          className="w-3 h-3 ml-2 sm:ml-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 12 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m7 9 4-4-4-4M1 9l4-4-4-4"
                          />
                        </svg>
                      </li>
                      <li className="flex items-center text-blue-600 dark:text-blue-500">
                        <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                          2
                        </span>
                        Basic{" "}
                        <span className="hidden sm:inline-flex sm:ml-2">
                          Info
                        </span>
                        <svg
                          className="w-3 h-3 ml-2 sm:ml-4"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 12 10"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m7 9 4-4-4-4M1 9l4-4-4-4"
                          />
                        </svg>
                      </li>
                      <li className="flex items-center text-blue-600 dark:text-blue-500">
                        <span className="flex items-center justify-center w-5 h-5 mr-2 text-xs border border-gray-500 rounded-full shrink-0 dark:border-gray-400">
                          3
                        </span>
                        Review
                      </li>
                    </ul>
                  </p>

                  <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                    <a
                      href="#"
                      className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
                    >
                      or login with email
                    </a>

                    <span className="w-1/5 border-b dark:border-gray-400 lg:w-1/4"></span>
                  </div>

                  <div className="mt-4">
                    <label
                      className="block mb-2 text-sm font-medium text-black"
                      htmlFor="LoggingEmailAddress"
                    >
                      Liscence number
                    </label>
                    <input
                      id="loggingPassword"
                      className={`block w-full px-4 py-2 text-blue- bg-white border border-blue-200 rounded-lg dark:border-gray-200 focus:border-blue-400 focus:ring-opacity-40 dark:focus-border-blue-300 focus:outline-none focus:ring focus:ring-blue-300 ${
                        formik.touched.license && formik.errors.license
                          ? "border-red-500"
                          : ""
                      }`}
                      type="text"
                      name="license"
                      value={formik.values.license}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />

                    {formik.touched.license && formik.errors.license && (
                      <div className="text-red-500 text-xs">
                        {formik.errors.license}
                      </div>
                    )}
                  </div>
                  <div className="mt-4 bg-white flex   ">
                    <div>
                      <label
                        className="block mb-2 ml-4 text-sm font-medium text-black rounded-xl mt-3 "
                        htmlFor="LoggingEmailAddress"
                      >
                        Adhar/Liscence Image
                      </label>
                      {/* {previewImage && (
                       <img
                       src={previewImage}
                       alt="Profile"
                       className="ml-10"
                       style={{ maxWidth: "120px", marginBottom: "10px" }}
                     />
                    )} */}
                      {previewImage ? (
                        <img
                          src={previewImage}
                          alt="Profile"
                          className="ml-10"
                          style={{
                            maxWidth: "100px",
                            marginBottom: "10px",
                            maxHeight: "70px",
                          }}
                        />
                      ) : (
                        <img
                          src="https://imgs.search.brave.com/WQiI_1-6rpimsZ2Q3NWe8-chXWP8OPCWPqkbIzVOq4Q/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/dmlwcG5nLmNvbS9w/bmcvZGV0YWlsLzQx/Ni00MTYxNjkwX2Vt/cHR5LXByb2ZpbGUt/cGljdHVyZS1ibGFu/ay1hdmF0YXItaW1h/Z2UtY2lyY2xlLnBu/Zw"
                          alt="Profile"
                          className="ml-10"
                          style={{ maxWidth: "80px", marginBottom: "10px" }}
                        />
                      )}
                    </div>
                    <div className="flex items-center ml-10">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "licenseimage")}
                        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                      />
                    </div>
                  </div>
                  <div className="mt-4 bg-white flex   ">
                    <div>
                      <label
                        className="block mb-2 ml-4 text-sm font-medium text-black rounded-xl mt-3 "
                        htmlFor="LoggingEmailAddress"
                      >
                        Profile Image
                      </label>
                      {profilepreview ? (
                        <img
                          src={profilepreview}
                          alt="Profile"
                          className="ml-10"
                          style={{
                            maxWidth: "100px",
                            marginBottom: "10px",
                            maxHeight: "70px",
                          }}
                        />
                      ) : (
                        <img
                          src="https://img.freepik.com/free-vector/illustration-businessman_53876-5856.jpg?size=626&ext=jpg"
                          alt="Profile"
                          className="ml-10"
                          style={{ maxWidth: "80px", marginBottom: "10px" }}
                        />
                      )}
                    </div>
                    <div className="flex items-center ml-20">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => handleFileChange(e, "profile")}
                        className="file-input file-input-bordered file-input-primary w-full max-w-xs"
                      />
                    </div>
                  </div>

                  <div className="mt-6 flex justify-center">
                    {" "}
                    {/* Centering the button */}
                    <button
                      type="submit"
                      className="w-full md:w-auto px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 btn btn-accent ml-6"
                    >
                      SUBMIT
                    </button>
                    <button
                      className="w-full md:w-auto px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 btn btn-accent ml-6"
                      onClick={prev}
                    >
                      PREV
                    </button>
                  </div>

                  <div className="flex items-center justify-between mt-4">
                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>

                    <a
                      onClick={() => navigate("/emplogin")}
                      href="#"
                      className="text-xs text-gray-500 uppercase dark:text-gray-400 hover:underline"
                    >
                      or sign up
                    </a>

                    <span className="w-1/5 border-b dark:border-gray-600 md:w-1/4"></span>
                  </div>
                </div>
              </>
            )}
          </div>
        </form>
      </div>
    </>
  );
};

export default EmployeeSignup;
