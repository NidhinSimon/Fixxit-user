import React from 'react'

const Modal = ({confirm,message,onclose}) => {
  return (
    <>
       <div >
            {" "}
            <div className="fixed inset-0 flex justify-center  items-center z-50 bg-white bg-opacity-10   ">
              <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 h-60">
                <button
                  type="button"
                  className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                  data-modal-hide="popup-modal"
                  onClick={onclose}
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
                <div className="p-6 text-center ">
                <span className="loading loading-dots loading-lg"></span>
                  <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
                    {message}
                  </h3>
                 
                  <button
                    data-modal-hide="popup-modal"
                    type="button"
                    className="border text-white border-bg-black bg-blue-400 hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg  border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600"
                    onClick={onclose}
                  >
                   Ok
                  </button>
                </div>
              </div>
            </div>
          </div>

          
    </>
  )
}

export default Modal
