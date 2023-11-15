import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { io } from "socket.io-client";
import toast, { Toaster } from "react-hot-toast";
import axios from "axios";

const EmpNavbar = () => {
  const navigate = useNavigate();

  const { providerInfo } = useSelector((state) => state.employee);
  const providername = providerInfo.provider.name;
  const providerId = providerInfo.provider._id;

  const socket = io("http://localhost:5000");

  useEffect(() => {
    socket.emit("join-provider-room", providerId);
  }, []);

  const [isOpen, setIsOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const handleLogout = async () => {
    const res = await axios.post("http://localhost:5000/logout");
    console.log(res, ">..");
    try {
      if (res.data.message === "Logged Out Successfully") {
        localStorage.removeItem("providerInfo");
        toast.success("logged out Successfully");
        navigate('/emplogin')
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <nav
      className="bg-white shadow dark:bg-gray-800"
      x-data="{ isOpen: false }"
    >
      <div className="container px-6 py-4 mx-auto">
        <div className="lg:flex lg:items-center">
          <div className="flex items-center justify-between">
            <a href="#">
              <img
                className="w-auto h-6 sm:h-10 "
                src="/src/assets/final.png"
                alt="www"
              />
            </a>
            <Toaster />

            <div className="flex lg:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                type="button"
                className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
                aria-label="toggle menu"
              >
                {isOpen ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 8h16M4 16h16"
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div
            className={`absolute inset-x-0 z-20 flex-1 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-800 lg:mt-0 lg:p-0 lg:top-0 lg:relative lg:bg-transparent lg:w-auto lg:opacity-100 lg:translate-x-0 lg:flex lg:items-center lg:justify-between ${
              isOpen
                ? "translate-x-0 opacity-100"
                : "opacity-0 -translate-x-full"
            }`}
          >
            <div className="flex flex-col text-gray-600 capitalize dark:text-gray-300 lg:flex lg:px-16 lg:-mx-4 lg:flex-row lg:items-center">
              <a
                onClick={() => navigate("/empDash")}
                href="#"
                className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200"
              >
                Dashboard
              </a>
              <a
                onClick={() => navigate("/emphome")}
                href="#"
                className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200"
              >
                Requests
              </a>
              <a
                onClick={() => navigate("/empbookings")}
                href="#"
                className="mt-2 transition-colors duration-300 transform lg:mt-0 lg:mx-4 hover:text-gray-900 dark:hover:text-gray-200"
              >
                Bookings
              </a>

              <img
                onClick={() => navigate("/chat")}
                className="h-8 w-8 ml-2"
                src="/src/assets/chat.png"
                alt="yy"
              />

              <div className="relative inline-block text-right ml-6">
                <button
                  id="dropdownNavbarLink"
                  data-dropdown-toggle="dropdownNavbar"
                  onClick={toggleDropdown}
                  className="flex items-center justify-between w-full py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
                >
                  {providername}
                  <svg
                    className="w-2.5 h-2.5 ml-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>

                {/* Dropdown menu */}
                {isDropdownOpen && (
                  <div className="z-10 absolute right-0 mt-2 w-24 rounded-md shadow-lg bg-white divide-y divide-gray-100 dark:bg-gray-700 dark:divide-gray-600">
                    <ul className="py-2 text-sm text-gray-700 dark:text-gray-400 ">
                      <li className="">
                        <a
                          onClick={handleLogout}
                          href="#"
                          className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white font-semibold"
                        >
                          Logout
                        </a>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default EmpNavbar;
