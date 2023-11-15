import React, { useState } from "react";









const SignupModal = () => {

const [map,setMap]=useState(null)
const [marker,setMarker]=useState(null)
const [address,setAddress]=useState('')



  return (
    <div>
      {" "}
      <div className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30 backdrop-blur-sm ">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 h-2/4 w-3/5 flex">
       <div className="bg-red-200 h-full w-2/3">

       </div>
       <div className="bg-red-400 h-full w-2/6">

       </div>
        </div>
      </div>
    </div>
  );
};

export default SignupModal;
