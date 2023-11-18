import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import UserNav from "./UserNav";
import { getCategories } from "../api/adminApiRoute";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

const UserHome = () => {
  const { userInfo } = useSelector((state) => state.user);
  console.log(userInfo, ">.............");
  const [categories, setCategories] = useState([]);

  const navigate = useNavigate();

  // useEffect(() => {
  //   if (userInfo) {
  //     navigate("/checkout");
  //   }
  //   else
  //   {
  //     navigate('/')
  //   }
  // }, [ userInfo]);


  

  useEffect(() => {
    getCategories()
      .then((res) => {
        
        setCategories(res.data);
      })
      .catch((error) => {
        console.log("error", error);
      });
  }, []);

  const handleServiceCLick = async (id) => {
    console.log("hello");
    console.log(id);
    navigate(`/service/${id}`);
  };

  const servicesSectionRef = useRef(null);

  return (
    <>
      <header className="bg-white rounded-3xl">
        <UserNav />

        <div className="container px-6 py-16 mx-auto h-screen ">
          <div className="items-center lg:flex">
            <div className="w-full lg:w-1/2  lg:relative bottom-20  ">
              <div className="lg:max-w-lg">
                <h1 className="text-3xl font-semibold text-gray-800 dark:text-white lg:text-4xl">
                  Best place to Book <br /> your{" "}
                  <span className="text-blue-500 ">Services</span>
                </h1>

                <p className="mt-3 text-gray-600 dark:text-gray-400">
                  We offer a variety of services of household ,so sit back and
                  let the professionals handle the work
                </p>

                <button
                 onClick={() => servicesSectionRef.current.scrollIntoView({ behavior: "smooth" })}
                className="w-full px-5 py-2 mt-6 text-sm tracking-wider text-white uppercase transition-colors duration-300 transform bg-blue-600 rounded-lg lg:w-auto hover:bg-blue-500 focus:outline-none focus:bg-blue-500">
                  BOOK NOW
                </button>
              </div>
            </div>

            <div className="flex items-center justify-center w-full mt-6 lg:mt-0 lg:w-1/2   ">
              <img
                className="w-8/12 h-1/5 lg:max-w-2xl  lg:rounded-full  relative bottom-14 shadow-2xl drop-shadow-lg  "
                src="https://res.cloudinary.com/dj8z6xx94/image/upload/v1694147834/cleaning_service-amico_1_xto0jf.png"
                alt="Catalogue-pana.svg"
              />
            </div>
          </div>
        </div>
      </header>

      <h1 ref={servicesSectionRef}  className="text-center  text-xl font-semibold">OUR SERVICES</h1>
      <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 ml-12 md:grid-cols-3 lg:grid-cols-4 mx-auto sm:mx-12 md:ml-36 lg:ml-40 mt-12">
  {categories.map((category) => (
    <div
      onClick={() => handleServiceCLick(category._id)}
      key={category.id}
      className="card card-compact bg-white hover:shadow-xl rounded-2xl overflow-hidden transform transition-transform duration-300 hover:scale-105 cursor-pointer animate-on-scroll"
    >
      <figure className="overflow-hidden">
        <img
          src={category.categoryimage}
          alt={category.name}
          className="h-49 w-full object-top "
        />
      </figure>
      <div className="p-4">
        <h2 className="text-center text-lg font-semibold mb-2">
          {category.name}
        </h2>
      </div>
    </div>
  ))}
</div>
<section className="bg-white p-16 mt-10">
  <div className="container mx-auto text-center bg-slate-200  h-96 rounded-3xl">
    <h2 className="text-3xl font-semibold mb-8">How It Works</h2>
    <div className="flex justify-center space-x-56 relative  ">
      <div className="bg-white rounded-full h-60 w-60 flex flex-col items-center justify-evenly shadow border">
        <div className="text-4xl text-blue-500 ">1</div>
        <div className="mt-4">Search </div>
        <div className="text-sm text-gray-500"></div>
      
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className=" bg-blue-500 rounded-full "></div>
        </div>
        <div
          className="bg-white rounded-full h-60 w-60 flex flex-col items-center justify-evenly shadow-lg relative border "
          style={{ top: "30px" }}
        >
          <div className="text-4xl text-blue-500">2</div>
          <div className="mt-4">Find</div>
          <div className="text-sm text-gray-500"></div>
        </div>
      </div>

      <div className="relative">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className=" bg-blue-500 rounded-full"></div>
        </div>
        <div className="bg-white rounded-full h-60 w-60 flex flex-col items-center justify-evenly shadow-lg border">
          <div className="text-4xl text-blue-500">3</div>
          <div className="mt-4">Book</div>
          <div className="text-sm text-gray-500"></div>
        </div>
      </div>
    </div>
  </div>
</section>



      {/* {Array.from({ length: 6 }, (_, index) => (
    <div
      key={index}
      className="card card-compact w-32 bg-base-100 shadow-xl rounded-2xl border"
    >
      <figure>
        <img
          src="http://res.cloudinary.com/dj8z6xx94/image/upload/v1693979096/abu5qtteuiwv8vlme4dk.png"
          alt="Shoes"
          className="h-20 w-20 mt-6 mx-auto"
        />
      </figure>
      <div className="card-body">
        <h2 className="card-title">Shoes!</h2>
      </div>
    </div>
  ))} */}

      <footer className="footer p-10 bg-base-300 text-base-content mt-10">
        <nav>
          <header className="footer-title">Services</header>
          <a className="link link-hover">Branding</a>
          <a className="link link-hover">Design</a>
          <a className="link link-hover">Marketing</a>
          <a className="link link-hover">Advertisement</a>
        </nav>
        <nav>
          <header className="footer-title">Company</header>
          <a className="link link-hover">About us</a>
          <a className="link link-hover">Contact</a>
          <a className="link link-hover">Jobs</a>
          <a className="link link-hover">Press kit</a>
        </nav>
        <nav>
          <header className="footer-title">Social</header>
          <div className="grid grid-flow-col gap-4">
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z"></path>
              </svg>
            </a>
            <a>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                className="fill-current"
              >
                <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"></path>
              </svg>
            </a>
          </div>
        </nav>
      </footer>
    </>
  );
};

export default UserHome;
