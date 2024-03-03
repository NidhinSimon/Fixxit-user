import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'




const baseQuery=fetchBaseQuery({
    baseUrl:'https://fixxit-server-1.onrender.com'
})


export const apiSlice=createApi({
    baseQuery,
    tagTypes:['User'],
    endpoints:()=>({
        
    })
})