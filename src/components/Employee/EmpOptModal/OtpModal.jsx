import React, { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import { verifyOtp } from "../../../api/empApi";
const OtpModal = ({ message, onClose, onConfirm, bookingId }) => {
  const [otp, setOtp] = useState("");

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleConfirm = async () => {
    onConfirm(otp);
    console.log(bookingId, ">>>>");
    try {
      const response = await verifyOtp(bookingId,otp)
      console.log(response, "[[[");
      if (response.message === "OTP verified, funds transferred") {
        toast.success("booking completed successfully");
        onClose();
      }

      if (response.message === "Invalid OTP") {
        toast.error("OTP INVALID");
      }
    } catch (error) {
      toast.error("Error verifying OTP:", error);
    }
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30 backdrop-blur-sm">
      <Toaster />
      <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
        <button
          type="button"
          className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
          onClick={onClose}
        >
          {/* Close button */}
        </button>
        <div className="p-6 text-center">
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {message}
          </h3>
          <input
            type="text"
            placeholder="Enter OTP"
            value={otp}
            onChange={handleOtpChange}
            className="bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-lg text-sm px-4 py-2.5 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 outline-none w-full mb-4"
          />
          <button
            type="button"
            className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2"
            onClick={handleConfirm}
          >
            OK
          </button>
          <button
            type="button"
            className="border border-gray-300 dark:border-gray-500 text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg text-sm px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
            onClick={onClose}
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default OtpModal;
