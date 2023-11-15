import axios from "axios";


const API=axios.create({baseURL:'http://localhost:5000/admin'})


export const getCategories=()=>API.get(`/categories`)

export const getCoupon=()=>API.post(`/getcoupon`)


