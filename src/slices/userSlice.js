import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userInfo: JSON.parse(localStorage.getItem('userInfo')) || {
        cart: [],
        addresses: [],
    },
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userInfo = action.payload;
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        logout: (state) => {
            state.userInfo = null;
            localStorage.removeItem('userInfo');
        },
        googlelogin: (state, action) => {
            state.userInfo = action.payload
            localStorage.setItem('userInfo', JSON.stringify(action.payload));
        },
        saveAddress: (state, action) => {
            state.userInfo.addresses.push(action.payload);
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        },
        addToCart: (state, action) => {
            state.userInfo.cart.push(action.payload);
            localStorage.setItem('userInfo', JSON.stringify(state.userInfo));
        },
    },
});

export const { setCredentials, logout, addToCart, saveAddress,googlelogin } = userSlice.actions;
export default userSlice.reducer;
