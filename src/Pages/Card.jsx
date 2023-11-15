import React from 'react'

const Card = () => {
  return (
    <>
      <div className="ml-10  ">
<a
      href="#"
      className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
    >
        <div className='w-'>    <img
        className=" rounded-t-lg h-16 md:w-24 md:rounded-none md:rounded-l-lg "
        src="https://res.cloudinary.com/dj8z6xx94/image/upload/v1694239429/ezhkbgav2coe3bp8lvxg.png"
        alt=""
      /></div>
   
      <div className="flex flex-col justify-between p-4 leading-normal">
        <h5 className="mb-2 text-sm font-bold tracking-tight text-gray-900 dark:text-white">
        CLEANING
        </h5>
        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
         here is the cleaning service   
        </p>
      </div>
      <button className='bg-red-300 ml-auto p-2 rounded-lg mr-4'>ADD</button>
    </a>
    
</div>
    </>
  )
}

export default Card
