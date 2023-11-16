import axios from "axios";


const API=axios.create({baseURL:'https://fixxit.shop/admin'})


export const getCategories=()=>API.get(`/categories`)

export const getCoupon=()=>API.post(`/getcoupon`)


