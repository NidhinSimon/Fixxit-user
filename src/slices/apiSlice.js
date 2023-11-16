import {createApi,fetchBaseQuery} from '@reduxjs/toolkit/query/react'




const baseQuery=fetchBaseQuery({
    baseUrl:'https://fixxit.shop'
})


export const apiSlice=createApi({
    baseQuery,
    tagTypes:['User'],
    endpoints:()=>({
        
    })
})