import axios from "axios";


const API=axios.create({baseURL:'https://fixxit-server-1.onrender.com'})


export const getMessages=(id)=>API.get(`/message/${id}`)

export const addMessage=(data)=>API.post(`/messages`,data)


