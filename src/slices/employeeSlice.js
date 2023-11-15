import { createSlice } from "@reduxjs/toolkit";


const initialState={
    providerInfo:localStorage.getItem('providerInfo')?JSON.parse(localStorage.getItem('providerInfo')):null
}

const providerSlice=createSlice({
    name:'employee',
    initialState,
    reducers:{
        setProviderInfo:(state,action)=>{
            console.log('Action received:', action);
            state.providerInfo=action.payload
            localStorage.setItem('providerInfo',JSON.stringify(action.payload))
        }
    }
})

export const {setProviderInfo}=providerSlice.actions

export default providerSlice.reducer