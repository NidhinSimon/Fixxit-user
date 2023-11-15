import {createSlice} from '@reduxjs/toolkit'



const adminSlice=createSlice({
    name:'admin',
    initialState:{
        adminToken:null,
        isAdminLoggedIn:false
    },
    reducers:{
        setAdmintoken:(state,action)=>{
            state.adminToken=action.payload;
            state.isAdminLoggedIn=true
        }
    }

})

export const{setAdmintoken}=adminSlice.actions
export default adminSlice.reducer