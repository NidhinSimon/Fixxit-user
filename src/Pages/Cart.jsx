// Cart.js
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';


const Cart = () => {
//   const cart = useSelector((state) => state.cart);




  return (
    <div className="cart-container">
      <h2>Your Cart</h2>
      <ul>
        {/* {cart.map((service) => (
          <li key={service.id}>
            {service.title} - {service.price}
            <button>Remove</button>
          </li>
        ))} */}
      </ul>
    </div>
  );
};

export default Cart;
