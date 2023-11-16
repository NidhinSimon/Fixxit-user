import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";
import axios from "axios";
import { useParams } from "react-router-dom";

const ServiceCard = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  const AddtoCart = async (id) => {
    console.log("djdjjg", id);
  };

  const { id } = useParams();
  const [services, setServices] = useState([]);

  const handleScroll = () => {
    if (window.scrollY > 0) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const servicesFetch = async () => {
      const res = await axios.get(`https://fixxit.shop/users/services/${id}`);
      console.log(res, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.");
      setServices(res.data);
    };

    servicesFetch();
  }, [id]);

  return (
    <>
      <Navbar isScrolled={isScrolled} />
      <div className="">
        <div className=" rounded-2xl p-8 mt-10   ">
          <div
            className={`max-w-1/2  h-screen  lg:flex lg:flex-row bg-white  rounded-2xl   lg:${
              isScrolled ? "" : ""
            }`}
          >
            <div
              className={`w-44 ml-10 bg-white text-2xl font-bold h-96 ${
                isScrolled ? "" : ""
              }`}
            >
              <h1>Women Saloon</h1>
            </div>
            <div className={`w-1/2 bg-white ml-14 ${isScrolled ? "" : ""}`}>
              <h1 className="text-center mt-10">sjsshhsgsggshgh</h1>

              <div className="card card-side bg-base-100 shadow-xl border  ">
                <figure>
                  <img
                    className=" h-32  rounded-3xl bordder w-44  "
                    src="https://w0.peakpx.com/wallpaper/692/207/HD-wallpaper-detective-pikachu-cartoon.jpg"
                    alt="Movie"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">New movie is released!</h2>
                  <p>Click the button to watch on Jetflix app.</p>
                  <div className="card-actions justify-end">
                    <button className="btn bg-indigo-600 text-white hover:blue-500">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="card card-side bg-base-100 shadow-xl border">
                <figure>
                  <img
                    className=" h-32  rounded-3xl bordder  w-44"
                    src="https://w0.peakpx.com/wallpaper/692/207/HD-wallpaper-detective-pikachu-cartoon.jpg"
                    alt="Movie"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">New movie is released!</h2>
                  <p>Click the button to watch on Jetflix app.</p>
                  <div className="card-actions justify-end">
                    <button className="btn bg-indigo-600 text-white hover:blue-500">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="card card-side bg-base-100 shadow-xl border">
                <figure>
                  <img
                    className=" h-32  rounded-3xl bordder  w-44"
                    src="https://w0.peakpx.com/wallpaper/692/207/HD-wallpaper-detective-pikachu-cartoon.jpg"
                    alt="Movie"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">New movie is released!</h2>
                  <p>Click the button to watch on Jetflix app.</p>
                  <div className="card-actions justify-end">
                    <button className="btn bg-indigo-600 text-white hover:blue-500">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>

              <div className="card card-side bg-base-100 shadow-xl border">
                <figure>
                  <img
                    className=" h-32  rounded-3xl bordder  w-44"
                    src="https://w0.peakpx.com/wallpaper/692/207/HD-wallpaper-detective-pikachu-cartoon.jpg"
                    alt="Movie"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">New movie is released!</h2>
                  <p>Click the button to watch on Jetflix app.</p>
                  <div className="card-actions justify-end">
                    <button className="btn bg-indigo-600 text-white hover:blue-500">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="card card-side bg-base-100 shadow-xl border">
                <figure>
                  <img
                    className=" h-32  rounded-3xl bordder  w-44"
                    src="https://w0.peakpx.com/wallpaper/692/207/HD-wallpaper-detective-pikachu-cartoon.jpg"
                    alt="Movie"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">New movie is released!</h2>
                  <p>Click the button to watch on Jetflix app.</p>
                  <div className="card-actions justify-end">
                    <button className="btn bg-indigo-600 text-white hover:blue-500">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="card card-side bg-base-100 shadow-xl border">
                <figure>
                  <img
                    className=" h-32  rounded-3xl bordder  w-44"
                    src="https://w0.peakpx.com/wallpaper/692/207/HD-wallpaper-detective-pikachu-cartoon.jpg"
                    alt="Movie"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">New movie is released!</h2>
                  <p>Click the button to watch on Jetflix app.</p>
                  <div className="card-actions justify-end">
                    <button className="btn bg-indigo-600 text-white hover:blue-500">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="card card-side bg-base-100 shadow-xl border">
                <figure>
                  <img
                    className=" h-32  rounded-3xl bordder  w-44"
                    src="https://w0.peakpx.com/wallpaper/692/207/HD-wallpaper-detective-pikachu-cartoon.jpg"
                    alt="Movie"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">New movie is released!</h2>
                  <p>Click the button to watch on Jetflix app.</p>
                  <div className="card-actions justify-end">
                    <button className="btn bg-indigo-600 text-white hover:blue-500">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="card card-side bg-base-100 shadow-xl border">
                <figure>
                  <img
                    className=" h-32  rounded-3xl bordder  w-44"
                    src="https://w0.peakpx.com/wallpaper/692/207/HD-wallpaper-detective-pikachu-cartoon.jpg"
                    alt="Movie"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">New movie is released!</h2>
                  <p>Click the button to watch on Jetflix app.</p>
                  <div className="card-actions justify-end">
                    <button className="btn bg-indigo-600 text-white hover:blue-500">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
              <div className="card card-side bg-base-100 shadow-xl border">
                <figure>
                  <img
                    className=" h-32  rounded-3xl bordder  w-44"
                    src="https://w0.peakpx.com/wallpaper/692/207/HD-wallpaper-detective-pikachu-cartoon.jpg"
                    alt="Movie"
                  />
                </figure>
                <div className="card-body">
                  <h2 className="card-title">New movie is released!</h2>
                  <p>Click the button to watch on Jetflix app.</p>
                  <div className="card-actions justify-end">
                    <button className="btn bg-indigo-600 text-white hover:blue-500">
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div
              className={`w-2/5  mt-10  grid grid-flow-col   lg:${
                isScrolled ? "fixed top-0 right-0" : "fixed top-0 right-0"
              }`}
            >
              <div className="lg:w-3/5 rounded-xl h-96 border lg:ml-16 lg:relative top-10 left-14 bg-white ">
                <h1 className="text-center text-lg font-medium">CART</h1>
                <div className="flex">{/* Cart items go here */}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ServiceCard;
