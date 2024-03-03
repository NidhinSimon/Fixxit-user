import axios from "axios";


const API=axios.create({baseURL:'https://fixxit-server-1.onrender.com'})



export const acceptBooking=(bookingId,providerId)=>API.put(`/boookings/accept/${bookingId}`,providerId)

export const upcomingBookings=(providerId)=>API.get(`/upcoming/${providerId}`)


export const cancelBooking=(bookingId)=>API.post(`/cancel/${bookingId}`)

export const dashBoard=(providerId)=>API.get(`/getstatistics/${providerId}`)

export const verifyOtp=(bookingId,otp)=>API.post(`/verifyotp/${bookingId}`,{otp})

export const addEmployee = async ({
    name,
    email,
    age,
    mobile,
    license,
    selectedCategory,
    pincode,
    state,
    city,
    licenseimage,
    profileimage,
    longitude,
    latitude,
    address,
  }) => {
    try {
      const response = await API.post("/emp", {
        name,
        email,
        age,
        mobile,
        license,
        selectedCategory,
        pincode,
        state,
        city,
        licenseimage,
        profileimage,
        longitude,
        latitude,
        address,
      });
  
      if (response.data.message === "provider added successfully") {
        return { success: true, message: "Data sent" };
      } else if (response.data.message === "User with the same mobile exist") {
        return { success: false, message: "User with the same mobile exists" };
      } else if (response.data.message === "User Exist with the same email") {
        return { success: false, message: "User with the same email exists" };
      }
    } catch (error) {
      console.error(error.message);
      return { success: false, message: "An error occurred" };
    }
  };
  