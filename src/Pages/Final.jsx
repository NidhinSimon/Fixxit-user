import React,{useState,useEffect} from 'react'
import Navbar from './Navbar'
import { useParams } from "react-router-dom";
import axios from 'axios'
const Final = () => {

    const [isDropdownVisible, setIsDropdownVisible] = useState(false);

    const { id } = useParams();
  const [services, setServices] = useState([]);

     useEffect(() => {
          const servicesFetch = async () => {
            const res = await axios.get(`https://fixxit.shop/users/services/${id}`);
            console.log(res, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>.");
            setServices(res.data);
          }
      
          servicesFetch();
        }, [id]);



  const handleDropdownToggle = () => {
    setIsDropdownVisible(!isDropdownVisible);
  };
  return (
    <>
    <Navbar/>
       <div className=''>
      <div className='bg-slate-100  h-screen w-full'>
<div className='bg-red-100 w-full h-48'>

</div>


<div className='p-5'>
<div className='bg-slate-100 w-full h-screen'>
<div className='bg-slate-100 w-full h-24 flex justify-end z-10'>
<div className="relative mt-5  inline-block text-left">
      <button
        id="dropdownDefaultButton"
        onClick={handleDropdownToggle}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Dropdown button{" "}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      {/* Dropdown menu */}
      <div
        id="dropdown"
        className={`${
          isDropdownVisible ? "" : "hidden"
        } z-10 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}
      >
        <ul
          className="py-2 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownDefaultButton"
        >
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
</div>
 <div className=' grid-cols-1 gap-5  md:grid-cols-2  lg:grid-cols-3 '>
    {
        services.map((service)=>{
            <div className="card card-side bg-base-100 shadow-xl  gap-5 ">
            <figure><img src={service.image} alt="Movie"/></figure>
            <div className="card-body">
              <h2 className="card-title">{service.title}</h2>
              <p>{service.description}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-primary">BOOK NOW</button>
              </div>
            </div>
          </div>
        })
    }






    </div>   

</div>
</div>


      </div>
    </div>
    </>
 
  )
}

export default Final
