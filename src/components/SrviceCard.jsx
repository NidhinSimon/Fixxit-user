// ServiceCard.js
import React from 'react';

const ServiceCard = ({ service }) => {
  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1">
      <img
        src="https://via.placeholder.com/300x200"
        alt={service.title}
        className="w-full h-40 object-cover"
      />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{service.title}</h2>
        <p className="text-gray-600 mt-2">{service.description}</p>
        <button
          className="mt-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          onClick={() => {
            // Handle adding to cart or any other action
          }}
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ServiceCard;
