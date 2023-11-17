import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLogoutMutation } from "../slices/backendSlice";
import { useNavigate } from "react-router-dom";
import { logout } from "../slices/userSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
const UserNav = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { userInfo } = useSelector((state) => state.user);

  const name = userInfo?.userExists?.name;

  const [logoutapi] = useLogoutMutation();

  const logoutHandle = async () => {
    try {
      await logoutapi().unwrap();
      dispatch(logout());

      navigate("/login");
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleProfile = async (id) => {
    console.log(id);
    navigate(`/profile/${id}`);
  };

  return (
    <nav className="container px-6 py-4 mx-auto md:flex md:justify-between md:items-center">
      <div className="flex items-center justify-between">
        <a href="#" onClick={() => navigate("/home")}>
          <img
            className="w-auto h-14 sm:h-14"
            src="/final.png"
            alt="Logo"
          />
        </a>

        <div className="flex md:hidden">
          <button
            onClick={toggleMenu}
            type="button"
            className="text-gray-500 dark:text-gray-200 hover:text-gray-600 dark:hover:text-gray-400 focus:outline-none focus:text-gray-600 dark:focus:text-gray-400"
            aria-label="Toggle menu"
          >
            {!isOpen ? (
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
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      <div
        className={`absolute inset-x-0 z-20 w-full px-6 py-4 transition-all duration-300 ease-in-out bg-white dark:bg-gray-900 ${
          isOpen ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-full"
        } md:bg-transparent md:dark:bg-transparent md:mt-0 md:p-0 md:top-0 md:relative md:w-auto md:opacity-100 md:translate-x-0 md:flex md:items-center`}
        x-cloak
      >
        <div className="flex flex-col md:flex-row md:mx-6">
          <a
            onClick={() => navigate("/home")}
            className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
            href="#"
          >
            Home
          </a>
          <img
            onClick={() => navigate("/wishlist")}
            className="h-6 w-6"
            src="/src/assets/heart.gif"
            alt="eee"
          />
          {/* <a
            className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
            href="#"
          >
            Services
          </a> */}
          <a
            onClick={() => navigate("/bookings")}
            className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
            href="#"
          >
            Bookings
          </a>
          <a
            onClick={() => handleProfile(userInfo.userExists._id)}
            className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
            href="#"
          >
            {name}
          </a>
          {userInfo ? (
            <>
              <a
                onClick={logoutHandle}
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                href="#"
              >
                <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                Logout
              </a>
            </>
          ) : (
            <>
              <a
                onClick={() => navigate("/login")}
                className="my-2 text-gray-700 transition-colors duration-300 transform dark:text-gray-200 hover:text-blue-500 dark:hover:text-blue-400 md:mx-4 md:my-0"
                href="#"
              >
                Login
              </a>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default UserNav;
