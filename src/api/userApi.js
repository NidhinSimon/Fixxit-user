import axios from "axios";


const API=axios.create({baseURL:'www.fixxit.shop/users'})


export const getCart=(id)=>API.get(`/cart/${id}`)


export const getServices=(id)=>API.get(`/services/${id}`)

export const addWishlist=(id,serviceId)=>API.post(`/services/${id}`,serviceId)




export const deletecart=(id,serviceId)=>API.delete(`/cart/${id}/${serviceId}`)


export const getProfile=(id,headers)=>API.get(`/profile/${id}`,{headers})



export const getWallet=(id,headers)=>API.get(`/wallet-history/${id}`,{headers})

export const EditProfile=(id)=>API.get(`profileedit/${id}`)

