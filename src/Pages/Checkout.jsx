import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import Modal from "../components/USer/Modal";

import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "../components/Features/cartSlice";
import UserNav from "./UserNav";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import DateModal from "../components/USer/DateModal";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";
import Sidebarcoupon from "../components/Sidebar/Sidebar";
import { Button } from "primereact/button";
import { FaTrash } from "react-icons/fa";
import User from "../../../server/models/userModel";
import AddressModal from "../components/USer/USerModal/AddressModal";
import { deletecart } from "../api/userApi";

const Checkout = () => {
  const [sidebar, setsidebar] = useState(false);
  const [selectedCoupon, setSelectedcoupon] = useState(null);
  const [cart, setCart] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  const [totalAmount, setTotalAmount] = useState(0);
  const [selectedAddress, setSelectedAddress] = useState(null); // Add selectedAddress state
  const [selectedDate, setSelectedDate] = useState(null);
  const [latitude, setlatitude] = useState("");
  const [longitude, setlongitude] = useState("");

  const [isAddressModalOpen, setAddressModalOpen] = useState(false);
  const [userAddresses, setUserAddresses] = useState([]);
  console.log(userInfo, ">>>>");
  const userId = userInfo.userExists._id;
  const username = userInfo.userExists.name;
  const userEmail=userInfo.userExists.email
  console.log(username, "....");

  const userNumber = userInfo.userExists.mobile;

  console.log(userNumber);

  const openAddressModal = () => {
    setAddressModalOpen(true);

    fetchUserAddresses();
  };

  const fetchUserAddresses = async () => {
    try {
      const res = await axios.get(
        `https://fixxit.shop/users/addresses/${userId}`
      );
      setUserAddresses(res.data);
    } catch (error) {
      console.error("Error fetching user addresses: ", error);
    }
  };

  useEffect(() => {
    const storedCoupon = localStorage.getItem("selectedCoupon");
    if (storedCoupon) {
      setSelectedcoupon(JSON.parse(storedCoupon));
    }
  }, []);
  const handleCoupon = async () => {
    setsidebar(true);
  };
  const receive = (selectedTime, formattedDate) => {
    console.log("Selected Time:", selectedTime);
    console.log("Formatted Date:", formattedDate);

    if (selectedTime && formattedDate) {
      setSelectedDate(`${formattedDate} ${selectedTime}`);
    }

    toast.success("Date and time selected successfully.");
    setdateModal(false);
  };

  const handleRemove = async (item) => {
    // dispatch(removeFromCart(item));

  

    deletecart(userid,item.serviceId)
    const updatedcart = cart.filter((i) => i.serviceId !== item.serviceId);
    setCart(updatedcart);
    Swal.fire({
      title: "Item Deleted",
      text: "Service Removed from the cart",
      icon: "success",
    });
  };

  useEffect(() => {
    const calculateTotalAmount = () => {
      let total = 0;
      cart.forEach((item) => {
        total += item.price;
      });
      return total;
    };

    const total = calculateTotalAmount();
    setTotalAmount(total);
  }, [cart]);

  const calculateTotalAmount = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  useEffect(() => {
    if (userInfo) {
      navigate("/checkout");
    } else {
      navigate("/login");
    }
  }, [userInfo]);

  const calculateCartTotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.price;
    });
    return total;
  };

  const calculateDiscountedTotal = () => {
    if (selectedCoupon) {
      const discount = (selectedCoupon.discount / 100) * calculateCartTotal();
      return (calculateCartTotal() - discount).toFixed(2);
    }
    return calculateCartTotal().toFixed(2);
  };
  const closeSidebar = () => {
    setsidebar(false);
  };
  const removeCoupon = () => {
    setSelectedcoupon(null);
    toast((t) => (
      <span>
        <b> Coupon Removed 😞 </b>
      </span>
    ));
    localStorage.removeItem("selectedCoupon");
  };

  const userid = userInfo.userExists._id;

  useEffect(() => {
    const cartfetch = async () => {
      const res = await axios.get(`https://fixxit.shop/users/cart/${userid}`);
      setCart(res.data);
      const total = calculateTotalAmount();
      setTotalAmount(total);
      console.log(res);
    };
    cartfetch();
  }, [userid]);

  const [mapmodal, setMapmodal] = useState(false);
  const [datemodal, setdateModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const handleRemove = (item) => {
  //   console.log("ivde ethi");
  //   dispatch(removeFromCart(item));

  //   Swal.fire({
  //     title: "Item Deleted",
  //     text: "Service Removed from the cart",
  //     icon: "success",
  //   });
  // };

  // const totalAmount = useSelector((state) => state.cart.totalAmount);

  const handleCLose = () => {
    setMapmodal(false);
  };

  const handleDateModal = () => {
    setdateModal(true);
  };

  const handlecheckout = async () => {
    const itemNames = cart.map((item) => item.name);
    console.log("DHDGDHDGHGH");
    console.log(
      itemNames,
      userid,
      selectedDate,
      selectedAddress,
      latitude,
      longitude,
      ">>"
    );

    await axios
      .post("https://fixxit.shop/checkout", {
        userId: userid,
        cart,
        total: selectedCoupon
          ? calculateDiscountedTotal()
          : calculateCartTotal(),
        date: selectedDate,
        address: selectedAddress,
        latitude: latitude,
        longitude: longitude,
        name: username,
        email:userEmail
      })
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };

  const handlelocation = async (data) => {
    console.log(data);
    setMapmodal(false);
    setSelectedAddress(data.address);
    setlatitude(data.latitude);
    setlongitude(data.longitude);
  };

  const handleAddress = async () => {
    setAddressModalOpen(true);
  };

  const handleMap = async () => {
    setMapmodal(true);
  };

  const handleAddresss = (address) => {
    try {
      setSelectedAddress(address);
    } catch (error) {
      console.error("Error selecting address:", error);
    }
  };

  const handleAddressClose = async () => {
    setAddressModalOpen(false);
  };

  const handleDateModalClose = () => {
    setdateModal(false);
  };

  return (
    <>
      <Toaster />
      <UserNav />
      {datemodal && <DateModal handlereceive={receive} handleclose={handleDateModalClose}/>}
      <div className="bg-slate-100  mt-10 h-screen w-full p-6 md:flex order-last">
        <div className="bg-slate-100 w-full  md:w-3/5 h-screen p-6 ">
          <div className="bg-white h-4/5 p-5">
            {/*   send detail to */}
            <div className="bg-blue-100 w-full rounded-lg  h-12 flex ">
              <div>
                <img
                  className="w-8 ml-2 mt-2"
                  src="https://res.cloudinary.com/dj8z6xx94/image/upload/v1695187253/book_1321791_a8ru2w.png"
                  alt="dd"
                />
              </div>
              <h1 className="mt-2 ml-2">
                Send Booking Details To - <b> {userNumber}</b>{" "}
              </h1>
            </div>
            {/*   address */}
            <div className="bg-blue-100 h-24 w-full mt-5 rounded-lg flex ">
              <div>
                <img
                  className="w-10 mt-7 ml-2"
                  src="https://res.cloudinary.com/dj8z6xx94/image/upload/v1695187536/map_854878_jkyhvh.png"
                  alt="ddd"
                />
              </div>
              <h1 className="mt-4 ml-5 text-lg font-bold "> Address </h1>
              <div className="flex w-full mt-10 justify-center align-middle">
                {selectedAddress ? (
                  <p className="text-sm "><b>Address: </b> {selectedAddress}</p>
                ) : (
                  <div>
                    <button
                      onClick={handleAddress}
                      className="bg-blue-600 text-white h-10 w-36 rounded-lg m-2"
                    >
                      Select Address
                    </button>
                    <button
                      onClick={handleMap}
                      className="bg-blue-600 text-white h-10 w-36 rounded-lg m-2"
                    >
                      Select on Map
                    </button>
                  </div>
                )}
              </div>
            </div>
            {isAddressModalOpen && (
              <AddressModal
                onClose={handleAddressClose}
                userAddresses={userAddresses}
                setSelectedAddress={handleAddresss}
              />
            )}

            {/*   slot */}

            <div className="bg-blue-100 w-full h-20 mt-5 rounded-lg flex">
              <img
                className="w-10 ml-2 h-10 mt-5 "
                src="https://res.cloudinary.com/dj8z6xx94/image/upload/v1695191540/calendar_591576_bov7pa.png"
                alt="ddd"
              />
              <h1 className="ml-5 text-lg  mt-7">Slot</h1>

              <div className="flex justify-center w-full md:mr-16 mt-6">
                {selectedDate ? (
                  <p className="text-lg ml-5">Selected Slot: {selectedDate}</p>
                ) : (
                  <button
                    onClick={handleDateModal}
                    className="bg-indigo-600 text-white h-10 w-24 rounded-lg "
                  >
                    Select Slot
                  </button>
                )}
              </div>
            </div>
            <div className="bg-blue-100 h-24 w-full mt-5 rounded-xl border">
              <div className="  flex">
                <div>
                  <img
                    className="w-10 ml-2 mt-5"
                    src="https://res.cloudinary.com/dj8z6xx94/image/upload/v1695192304/wallet_583985_glftg4.png"
                    alt=""
                  />
                </div>
                <h1 className="mt-7  ml-2 text-lg w-32  ">Payment Mode</h1>
              </div>
              <div className="bg-purple-600 rounded-sm flex align-bottom  justify-center h-10 mt-1 w ">
                <h1
                  onClick={handlecheckout}
                  className="text-center mt-2 text-white"
                >
                  Pay ₹
                  {selectedCoupon
                    ? calculateDiscountedTotal()
                    : calculateCartTotal().toFixed(2)}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-slate-100 h-auto w-full -mt-48  md:w-2/5 md:mt-10 p-6 ">
          <div className="bg-slate-100 h-auto border border-slate-300 ">
            <h1 className="text-center mt-2  text-2xl uppercase">cart</h1>
            {sidebar && (
              <Sidebarcoupon
                sidebar={sidebar}
                selectedCoupon={selectedCoupon}
                setSelectedcoupon={setSelectedcoupon}
                closeSidebar={closeSidebar}
              />
            )}

            {cart.map((item) => (
              <>
                <div className="bg-blue-300 h-20   flex  justify-between ">
                  <p className="mt-4 ml-4">{item.name}</p>
                  <p className="mt-4 ml-4">{item.price}</p>
                  <button
                    onClick={() => handleRemove(item)}
                    className="h-10 bg-blue-100 rounded-lg w-24 mt-4 mr-3"
                  >
                    Remove
                  </button>
                </div>
              </>
            ))}
            <div className="bg-blue-300 flex justify-center  align-middle  overflow-x-hidden ">
              {selectedCoupon ? (
                <button
                  onClick={removeCoupon}
                  className="ml-4 text-md mb-2 font-semibold w-96 text-indigo-500 "
                >
                  <h1 className="">
                    Coupon Applied-{selectedCoupon?.discount}%OFF{" "}
                  </h1>
                  <b className="text-red-600">Remove </b>
                </button>
              ) : (
                <Button
                  className="bg-orange-400 font-semibold uppercase w-full"
                  onClick={() => setsidebar(true)} // Open the sidebar
                >
                  Apply coupon
                </Button>
              )}
            </div>
          </div>
          <div className="bg-purple-700 text-white h-10 w-full sticky bottom-0 flex  justify-center  cursor-pointer">
            <strong className="cursor-pointer">
              {" "}
              Total: ₹
              {selectedCoupon
                ? calculateDiscountedTotal()
                : calculateCartTotal().toFixed(2)}
            </strong>

            {mapmodal && (
              <>
                <Modal
                  closemodal={handleCLose}
                  handlelocation={handlelocation}
                />
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
