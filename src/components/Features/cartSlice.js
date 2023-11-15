import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    cart: [],
    quantity: 0,
    totalAmount: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addToCart(state, action) {

            const itemindex = state.cart.findIndex((item) => item._id === action.payload._id)

            if (itemindex >= 0) {
                state.cart[itemindex].quantity += 1

            } else {

                const temp = { ...action.payload, quantity: 1 }
                state.cart.push(temp)
            }
            state.totalAmount = state.cart.reduce((total, item) => total + item.price, 0)

        },
        removeFromCart(state, action) {
            const index = state.cart.findIndex(item => item._id === action.payload._id);

            if (index !== -1) {
                state.cart.splice(index, 1);
            }
            state.totalAmount = state.cart.reduce((total, item) => total + item.price, 0);
        },

    }
})


export const { addToCart, removeFromCart } = cartSlice.actions

export default cartSlice.reducer