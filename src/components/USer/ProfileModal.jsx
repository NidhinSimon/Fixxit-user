import React, { useState } from "react";
import axios from "axios";
import { EditProfile } from "../../api/userApi";
const ProfileModal = ({ profile, onclose }) => {
  const [editProfile, setEditProfile] = useState({
    name: profile.name,
    email: profile.email,
    mobile: profile.mobile,
  });

  const handleSubmit = async (id) => {
    console.log(id, "___________________");
    console.log(editProfile, "------------------------------");
    const res = await EditProfile(id)


    console.log(res, ">>>>>>>>>>>>>>>>>>>>>>>>>..");
  };

  return (
    <div>
      {" "}
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30 backdrop-blur-sm ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
          <div className="relative w-full max-w-md max-h-full">
            <div className="relative bg-white w-full md:w-96 rounded-lg shadow dark:bg-gray-700">
              <button
                onClick={onclose}
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                data-modal-hide="authentication-modal"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="px-6 py-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Edit Your Profile
                </h3>
                <form className="space-y-6" action="#">
                  <div>
                    <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      NAME
                    </label>
                    <input
                      type="text"
                      name="name"
                      id="email"
                      value={editProfile.name}
                      onChange={(e) =>
                        setEditProfile({ ...editProfile, name: e.target.value })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      EMAIL
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="password"
                      value={editProfile.email}
                      onChange={(e) =>
                        setEditProfile({
                          ...editProfile,
                          email: e.target.value,
                        })
                      }
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      required
                    />
                  </div>

                  <div className="flex justify-between">
                    <div className="flex items-start"></div>
                  </div>
                  <button
                    onClick={() => handleSubmit(profile._id)}
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Update Profile
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileModal;
