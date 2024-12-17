import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        loading: false,
        user: null
    },
    reducers: {
        //actions
        setLoading: (state,action) => {
            state.loading = action.payload; //payload is the information that will be passed by the developer i.e., 
                                            //when the user clicks on the submit button in the login page the loader should start
        },
        setUser: (state, action) => {
            state.user = action.payload;
        }
    }
});

export const {setLoading, setUser} = authSlice.actions;
export default authSlice.reducer;