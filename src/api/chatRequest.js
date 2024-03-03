import axios from "axios";


const API=axios.create({baseURL:'https://fixxit-server-1.onrender.com'})


export const userChats=(id)=>API.get(`/chat/${id}`)


export const getuserData=(id)=>API.get(`/get/${id}`)