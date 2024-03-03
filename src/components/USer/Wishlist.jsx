import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import UserNav from "../../Pages/UserNav";

const Wishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const { userInfo } = useSelector((state) => state.user);
  const userId = userInfo.userExists._id;

  useEffect(() => {
    axios
      .get(`https://fixxit-server-1.onrender.com/users/wishlist/${userId}`)
      .then((response) => {
        setWishlist(response.data);
      })
      .catch((error) => {
        console.error("Error fetching wishlist items:", error);
      });
  }, [userId]);

  const navigate = useNavigate();

  const handleCheckout = async (item) => {
    const cartData = {
      name: item.title,
      price: item.price,
      serviceId: item._id,
    };

    const res = await axios.post(`https://fixxit-server-1.onrender.com/users/cart`, {
      cartData,
      userId,
    });

    navigate("/checkout");
  };

  const removeFromWishlist = async (itemId) => {
    console.log(itemId,'---')
    try {
    
      await axios.delete(`https://fixxit-server-1.onrender.com/users/wishlist/${userId}/${itemId}`);


      setWishlist((prevWishlist) => prevWishlist.filter(item => item._id !== itemId));
    } catch (error) {
      console.error("Error removing item from wishlist:", error);
    }
  };

  return (
    <>
      <UserNav />
      <div className="bg-white py-16">
        <div className="max-w-screen-xl mx-auto px-4">
          <h1 className="text-3xl font-semibold text-gray-800 mb-8 text-center">
            My Wishlist
          </h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {wishlist.map((item) => (
              <div
                key={item._id}
                className="bg-white rounded-lg overflow-hidden shadow-md transition-transform duration-300 transform hover:scale-105"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-44 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-lg font-semibold text-gray-800 mb-2">
                    {item.title}
                  </h2>
                  <p className="text-gray-600 text-base mb-2">₹{item.price}</p>
                  <p className="text-gray-600 text-base mb-4">
                    {item.description}
                  </p>
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => removeFromWishlist(item._id)}
                      className="text-white bg-red-500 hover:bg-red-600 py-2 px-3 rounded-full transition duration-300"
                    >
                      Remove
                    </button>
                    <button
                      onClick={() => handleCheckout(item)}
                      className="text-white bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-full transition duration-300"
                    >
                      Book Now
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {wishlist.length === 0 && (
            <p className="text-center mt-8 text-gray-600 text-2xl">
              Your wishlist is empty. Start adding items you love!
            </p>
          )}
        </div>
      </div>
    </>
  );
};

export default Wishlist;
