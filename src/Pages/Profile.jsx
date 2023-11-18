import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import ProfileModal from "../components/USer/ProfileModal";
import { FaRupeeSign } from "react-icons/fa";
import UserNav from "./UserNav";
import { toast, Toaster } from "react-hot-toast";
import { getProfile, getWallet } from "../api/userApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const [profile, setProfile] = useState([]);
  const [modal, showModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [walletHistory, setWalletHistory] = useState([]);


  const {userInfo}=useSelector((state)=>state.user)
  const token=userInfo.token

  console.log(token,"---------")

  console.log(userInfo,"..")
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const profileLoad = async () => {

      if (!userInfo || !token) {
    
        navigate("/");
    
        toast.error("Please log in to view this page");
        return;
      }

       const headers = {
          Authorization: `Bearer ${token}`,
        };
      const res = await getProfile(id,headers)

      setProfile(res.data);
      console.log(res, ">>>>>>>>>>>>>>>>>>>>");

      const walletHistoryRes = await getWallet(id,headers)
      console.log(walletHistoryRes,"//")
      setWalletHistory(walletHistoryRes.data);
    };
    profileLoad();
  }, []);

  const handleEdit = async (id) => {
    showModal(true);
    console.log(id);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setSelectedImage(file);
  };
  

  const [walletHistoryModal,setwalletHistoryModal]=useState(false)

  return (
    <>
  <UserNav/>
<Toaster/>
  
      <div className="bg-slate-100 h-auto p-4 md:p-0 mt-6">
        <div className="bg-white h-1/2 rounded-2xl p-4 md:p-8">
          <div className="bg-slate-200  md:h-60 w-full rounded-lg flex flex-col md:flex-row items-center">
            <img
              className="bg-yellow-600 rounded-full w-60 h-56 mt-4 md:mt-1 ml-4 md:ml-6"
              src={profile.profileimage}
              alt="Profile"
            />
            {/* <div className="mt-4 md:mt-0 md:ml-10 w-3/5">
              <button   type="" className="btn btn-primary w-full md:w-44">
                Upload New Photo
              </button>
            </div> */}
            <div className=" w-2/5 h-full flex justify-center items-center">
            <h1 className="text-lg font-semibold flex items-center">
                <FaRupeeSign className="mr-2" /> Wallet Balance:
                <span className="text-indigo-600 ml-1">
                  {profile.Wallet}
                </span>
              </h1>
              <img onClick={()=>setwalletHistoryModal(true)} className="w-10 ml-6 h-10" src="/src/assets/history.png" alt="ddd" />


    {walletHistoryModal && (
  <div className="fixed inset-0 flex items-center justify-center z-50">
    <div className="relative bg-white rounded-lg shadow-md dark:bg-gray-700 w-96">
      <div className="flex justify-between items-center p-4 bg-indigo-500 text-white rounded-t-lg">
        <h1 className="text-2xl font-semibold">Wallet History</h1>
        <button
          onClick={() => setwalletHistoryModal(false)}
          className="text-gray-300 hover:text-gray-400 focus:outline-none"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
      </div>

      <div className="bg-slate-100 p-4 h-auto overflow-y-auto rounded-b-lg">
        {walletHistory.map((item) => (
          <div
            key={item._id}
            className={`bg-white h-24 mt-4 p-4 rounded-xl flex justify-between items-center w-80 ${
              item.type === 'Credit' ? 'bg-green-100' : 'bg-red-100'
            }`}
          >
            <h1 className={`text-lg font-semibold ${item.type === 'Credit' ? 'text-green-600' : 'text-red-600'}`}>
              <span className="text-blue-500">{item.reason}</span> -{' '}
              {item.type === 'Credit' ? 'Credit' : 'Debit'} -{' '}
              <span className="text-indigo-600">{item.amount} ₹</span>
            </h1>
          </div>
        ))}
      </div>
    </div>
  </div>
)}



              {/* <div className="bg-slate-100 mt-5">
      <div className="flex justify-between items-center">
        <h1 className="text-black font-semibold ml-5 mt-4 text-lg">Wallet History</h1>
      </div>
 
      <div className="bg-slate-100 mt-4 h-64 rounded-xl flex flex-col items-center">
      {walletHistory.map((item) => (
          <div
            key={item._id}
            className={`bg-slate-100 w-80 h-24 mt-5 rounded-xl flex justify-center items-center ${
              item.type === 'Credit' ? 'text-green-400' : 'text-red-600'
            }`}
          >
            <h1 className="text-lg font-semibold">
              <span className="text-blue-400">{item.reason} - </span>
              {item.type === 'Credit' ? 'Credit' : 'Debit'} -{' '}
              <span className="text-indigo-600">{item.amount} INR</span>
            </h1>
          </div>
        ))}
      </div>
    </div> */}
            </div>
          </div>
          <div className="bg-slate-200 h-36 w-full md:h-80 rounded-3xl mt-5">
            <div className="flex justify-between  ">
              <h1 className="text-black font-semibold ml-5 mt-4 text-lg">
                Personal Info
              </h1>
              <button
                onClick={() => handleEdit(profile._id)}
                className="w-28 h-7 mr-3 bg-white rounded-lg mt-5 "
              >
                Edit
              </button>
            </div>
            <div className="bg-slate-100 mt-4 h-64  rounded-xl flex justify-evenly   ">
              <div className="bg-slate-100 w-56 h-40 mt-10 text-center">
                <h1 className="text-">Email</h1>
                
                <input
                  className="w-64  rounded-xl h-10 mt-3  "
                  type="text"
                  name="profile"
                  id=""
                  value={profile.email}
                />
              </div>
              <div className="bg-slate-100 w-56 h-40 mt-10 text-center">
                <h1 className="">Name</h1>
                <input
                  className="w-64  rounded-xl h-10 mt-3 "
                  type="text"
                  name="name"
                  id=""
                  value={profile.name}
                />
              </div>
              <div className="bg-slate-100 w-56 h-40 mt-10 text-center">
                <h1 className="">Mobile</h1>
                <input
                  className="w-64 rounded-xl h-10 mt-3  "
                  type="text"
                  name=""
                  id=""
                  value={profile.mobile}
                />
              </div>
              {modal && (
                <ProfileModal
                  profile={profile}
                  onclose={() => showModal(false)}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
