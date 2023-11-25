import React, { useEffect, useState } from "react";
import { Sidebar } from "primereact/sidebar";
import { Button } from "primereact/button";
import axios from "axios";
import Swal from "sweetalert2";


import toast, { Toaster } from "react-hot-toast";

const Sidebarcoupon = ({
  sidebar,
  selectedCoupon,
  setSelectedcoupon,
  closeSidebar,
}) => {
  const [available, setavailable] = useState([]);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(sidebar);
  }, [sidebar]);
  const handleClose = () => {
    setVisible(false);
    closeSidebar();

  };

  useEffect(() => {
    const coupon = async () => {
      const res = await axios.get("https://fixxit.shop/admin/getcoupon");
      console.log(res);

      setavailable(res.data);
    };
    coupon();
  }, []);

  const handlecouponselect = async (id) => {
    console.log("hello", id);
    const selectedCoupon = available.find((i) => i._id === id);
    setSelectedcoupon(selectedCoupon);
    toast.success(
      `${selectedCoupon.couponName},${selectedCoupon.discount}% off applied`
    );
   
   
    localStorage.setItem("selectedCoupon", JSON.stringify(selectedCoupon));
    closeSidebar();
  };


  return (
    <>
      <Toaster />
      <div className="card flex justify-content-center">
        <Sidebar
          visible={visible}
          position="right"
          onHide={handleClose}
          className="w-full md:w-20rem lg:w-30rem p-sidebar-md"
        >
         
          <div className="form-control">
            <label className="input-group mt-5">
              <input
                type="text"
                placeholder="Enter The Coupon"
                className="input input-bordered"
              />
              <button className="bg-orange-500 text-white w-28 ">
                Apply Now
              </button>
            </label>
            <div className="rounded-md w-full p-5 h-auto  mt-5 border border-zinc-300 ">
              <h1 className="font-semibold text-center">Available coupons</h1>

              {available.map((i) => (
                <>
                  <div className="border p-5 mt-2 ">
                    <div className="bg-yellow-100 text-black opacity-80 font-semibold w-44 mt-4 h-10 justify-center flex items-center">
                      {i.couponName}
                    </div>
                    <h1 className="font-semibold mt-3 ml-2"></h1>
                    <p className="font-semibold max-w-lg ml-2">
                      Get {i.discount}% off on services{" "}
                    </p>
                    <button
                      onClick={() => handlecouponselect(i._id)}
                      className="border border-orange-400 h-10 w-32 rounded-lg text-orange-400 mt-5"
                    >
                      Apply Coupon
                    </button>
                  </div>
                </>
              ))}
            </div>
          </div>
         
        </Sidebar>
       
      </div>
    </>
  );
};

export default Sidebarcoupon;
