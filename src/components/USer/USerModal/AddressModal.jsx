import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const AddressModal = ({ setSelectedAddress, onClose }) => {
  const { userInfo } = useSelector((state) => state.user);
  const userId = userInfo.userExists._id;

  const [addresses, setAddresses] = useState([]);



  useEffect(() => {
    fetchAddresses();
  }, []);

  const fetchAddresses = async () => {
    try {
      const res = await axios.get(`https://fixxit.shop/users/addresses/${userId}`);
      if (Array.isArray(res.data.addresses)) {
        setAddresses(res.data.addresses);
      } else {
        console.error("Fetched data addresses is not an array:", res.data);
      }
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };
  


  const handleAddress = (address) => {
    setSelectedAddress(address);
  };

  const handleSubmit = async () => {
    onClose();
  };

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30 backdrop-blur-sm">
      <div className="relative bg-white rounded-lg shadow dark-bg-gray-700">
        <div className="p-4">
          <h2 className="text-2xl font-semibold mb-4">Select an Address</h2>
          <ul>
            {addresses.map((address) => (
              <li key={address._id} className="mb-2">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="selectedAddress"
                    onChange={() => handleAddress(address.address)}
                    className="form-radio h-5 w-5 text-blue-600"
                  />
                  <span className="text-gray-800">{address.address}</span>
                </label>
              </li>
            ))}
          </ul>
          <button
            onClick={handleSubmit}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4 hover:bg-blue-600"
          >
            Submit
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddressModal;
