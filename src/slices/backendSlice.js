import { apiSlice } from "./apiSlice";
const USERS_URL ='https://fixxit-server-1.onrender.com/users'

export const usersApiSlice=apiSlice.injectEndpoints({
    endpoints:(builder)=>({
        register:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/register`,
                method:'POST',
                body:data
            })
        }),
        login:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/login`,
                method:'POST',
                body:data
            })
        }),
        google:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/verifyGooglelogin`,
                method:'POST',
                body:data
            })
        }),
        Fb:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/verifyfb`,
                method:'POST',
                body:data
            })
        }),
        
        saveAddress: builder.mutation({ 
            query: (data) => ({
                url: `${USERS_URL}/saveaddress`,
                method: 'POST',
                body: data,
            }),
        }),
        logout:builder.mutation({
            query:()=>({
                url:`${USERS_URL}/logout`,
                method:'POST'
            })
        }),
        addCart:builder.mutation({
            query:(data)=>({
                url:`${USERS_URL}/cart`,
                method:'POST',
                body:data
                
            })
        })
    })
})

export const {
    useRegisterMutation,useLoginMutation,useLogoutMutation,useAddCartMutation,useGoogleMutation,useFbMutation
}=usersApiSlice