import React from "react";
import { Button } from "primereact/button";

const FlowbitToast = ({ onClose }) => {
  return (
    <div>
      <div
        id="toast-interactive"
        className="w-full max-w-xl  p-4 text-gray-500 bg-white rounded-lg shadow-2xl  dark:text-gray-400  absolute z-10 top-60  left-1/3   "
        role="alert"
      >
        <div className="flex  h-52">
          <div className="ml-3 text-sm font-normal ">
            <span className="mb-1 text-lg font-semibold text-gray-900 dark:text-black flex justify-center mt-5 ">
              HELLO PROFESSIONAL 👋
            </span>
            <div className="mb-2 text-lg  font-normal  mt-5">
              Your Profile is sent to Verification you will be notified once
              your profile has been verified
            </div>

            <div className="flex justify-center ">
              <button
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                onClick={onClose}
              >
                ✕
              </button>
              <div className="mt-2">
                <span className="loading loading-bars loading-lg  bg-orange-500 relative left-0"></span>
                {/* <a href="#" className="inline-flex justify-center w-full px-10 py-1.5 text-xs font-medium text-center text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-800">OK</a> */}
              </div>
            </div>
          </div>

          {/* <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-white items-center justify-center flex-shrink-0 text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700" data-dismiss-target="#toast-interactive" aria-label="Close">
            <span className="sr-only">Close</span>
            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
            </svg>
        </button> */}
        </div>
      </div>
    </div>
  );
};

export default FlowbitToast;
