import React, { useState } from "react";
import axios from "axios";

const Juju = () => {
  const formArray = [1, 2, 3];
  const [formNo, setFormNo] = useState(formArray[0]);
  const [previewImage, setPreviewImage] = useState(null);

  const [name,setName]=useState('')
  
  const [email,setEmail]=useState('')
  
  const [age,setAge]=useState('')
  
  const [mobile,setMobile]=useState('')
  
  const [license,setlicense]=useState('')

  const [state,setState]=useState('')
  const [city,setCity]=useState('')
  const [licenceimage,setLicenseimage]=useState(null)
  const [profileimage,setProfileimage]=useState(null)


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
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        setPreviewImage(reader.result);
        setLicenseimage(reader.result)
        setProfileimage(reader.result)
      };
     
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  

    // Append the form fields to the FormData object


    // Append the image files (if selected)

    try {
      const res = await axios.post("http://localhost:5000/emp",{name,age,state,city,licenceimage,profileimage,mobile,email,license});
      console.log(res, "------------------------------------------------");
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="">
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <div className="flex w-full max-w-sm mx-auto overflow-hidden bg-white rounded-2xl shadow-lg dark:bg-cyan-100 lg:max-w-6xl mt-24 drop-shadow-2xl ">
          <div
            className="hidden bg-cover lg:block lg:w-1/2"
            style={{
              backgroundImage:
                "url('https://res.cloudinary.com/dj8z6xx94/image/upload/v1694407836/Screenshot_2023-09-11_101521_s0wmfr.png')",
            }}
          ></div>
          {formNo === 1 && (
            <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
              <div className="flex justify-center mx-auto">
                <img
                  className="w-auto h-7 sm:h-8"
                  src="https://merakiui.com/images/logo.svg"
                  alt=""
                />
              </div>

              <p className="mt-3 text-xl text-center text-black ">
                Welcome Step 1
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
                  className="block w-full px-4 py-2 text-blue- bg-white border rounded-lg dark:border-gray-200 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  name="name"
                />
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
                  className="block w-full px-4 py-2 text-blue- bg-white border rounded-lg dark:border-gray-200 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
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
                  className="block w-full px-4 py-2 text-blue- bg-white border rounded-lg dark:border-gray-200 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                  type="number"
                  name="mobile"
                  value={mobile}
                  onChange={(e) => setMobile(e.target.value)}
                />
              </div>

              {/* <div className="mt-6">
      <button
        className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
      >
        Sign In
      </button>
    </div> */}
              <div className="mt-6 flex justify-center">
                {" "}
                {/* Centering the button */}
                <button
                  className="w-full md:w-auto px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 btn btn-accent ml-6"
                  onClick={next}
                >
                  NEXT
                </button>
              </div>
              <div className="mt-6 flex justify-center">
                {" "}
                {/* Centering the button */}
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

          {formNo === 2 && (
            <>
              <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                <div className="flex justify-center mx-auto">
                  <img
                    className="w-auto h-7 sm:h-8"
                    src="https://merakiui.com/images/logo.svg"
                    alt=""
                  />
                </div>

                <p className="mt-3 text-xl text-center text-gray-900">
                  Welcome Step 2
                </p>

                <div className="flex items-center justify-between mt-4">
                  <span className="w-1/5 border-b dark:border-gray-600 lg:w-1/4"></span>

                  <a
                    href="#"
                    className="text-xs text-center text-gray-500 uppercase dark:text-gray-400 hover:underline"
                  >
                    jhd
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
                    className="block w-full px-4 py-2 text-blue- bg-white border rounded-lg dark:border-gray-200 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="number"
                    value={age}
                    name="age"
                    onChange={(e) => setAge(e.target.value)}
                  />
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
                    className="block w-full px-4 py-2 text-blue- bg-white border rounded-lg dark:border-gray-200 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    name="state"
                    value={state}
                    onChange={(e) => setState(e.target.value)}
                  />
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
                    className="block w-full px-4 py-2 text-blue- bg-white border rounded-lg dark:border-gray-200 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    name="city"
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                  />
                </div>

                {/* <div className="mt-6">
      <button
        className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
      >
        Sign In
      </button>
    </div> */}
                <div className="mt-6 flex  justify-center">
                  {" "}
                  {/* Centering the button */}
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

          {formNo === 3 && (
            <>
              <div className="w-full px-6 py-8 md:px-8 lg:w-1/2">
                <div className="flex justify-center mx-auto">
                  <img
                    className="w-auto h-7 sm:h-8"
                    src="https://merakiui.com/images/logo.svg"
                    alt=""
                  />
                </div>

                <p className="mt-3 text-xl text-center text-gray-600 dark:text-gray-200">
                  Welcome Step 3
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
                    id="LoggingEmailAddress"
                    className="block w-full px-4 py-2 text-blue- bg-white border rounded-lg dark:border-gray-200 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="text"
                    name="liscence"
                    value={license}
                    onChange={(e) => setlicense(e.target.value)}
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block mb-2 text-sm font-medium text-black"
                    htmlFor="LoggingEmailAddress"
                  >
                    Liscence Image
                  </label>
                  <input
                    id="LoggingEmailAddress"
                    className="block w-full px-4 py-2 text-blue- bg-white border rounded-lg dark:border-gray-200 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    name="licenceimage"
                  />
                </div>
                <div className="mt-4">
                  <label
                    className="block mb-2 text-sm font-medium text-black"
                    htmlFor="LoggingEmailAddress"
                  >
                    Profile Image
                  </label>
                  <input
                    id="LoggingEmailAddress"
                    className="block w-full px-4 py-2 text-blue- bg-white border rounded-lg dark:border-gray-200 focus:border-blue-400 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring focus:ring-blue-300"
                    type="file"
                    name="profileimage"
                    accept="image/*"
                   onChange={handleFileChange}
                  />
                </div>

                {/* <div className="mt-6">
      <button
        className="w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-gray-800 rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50"
      >
        Sign In
      </button>
    </div> */}
                <div className="mt-6 flex justify-center">
                  {" "}
                  {/* Centering the button */}
                  <button
                    type="submit"
                    className="w-full md:w-auto px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg hover:bg-gray-700 focus:outline-none focus:ring focus:ring-gray-300 focus:ring-opacity-50 btn btn-accent ml-6"
                    onClick={handleSubmit}
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
  );
};

export default Juju;




{/* The button to open modal */}

