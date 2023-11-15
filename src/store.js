import { configureStore } from "@reduxjs/toolkit";
import userReducer from './slices/userSlice'
import { apiSlice } from "./slices/apiSlice";


import providerReducer from './slices/employeeSlice'

const store = configureStore({
    reducer: {
        user: userReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        employee:providerReducer
      

    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
    devTools: true
})





export {store,
}


