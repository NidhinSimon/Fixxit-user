import axios from "axios";


const API=axios.create({baseURL:'https://fixxit.shop'})


export const userChats=(id)=>API.get(`/chat/${id}`)


export const getuserData=(id)=>API.get(`/get/${id}`)