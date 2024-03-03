import axios from "axios";


const API=axios.create({baseURL:'https://fixxit-server-1.onrender.com/admin'})


export const getCategories=()=>API.get(`/categories`)

export const getCoupon=()=>API.post(`/getcoupon`)


