import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const  getLoginDetails = createAsyncThunk(
    'loginDetails/getLoginDetails', async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/customer/data/${id}`, {credentials: 'include'});
            if (response.ok) {
                const json = await response.json();
                return json;
            } else {
                throw new Error('System Error');
            }    
        } catch (err) {
            console.log(err)
        }
    }
)

export const changePassword = createAsyncThunk(
    'password/changePassword', async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:4000/api/auth/change-password/${data.userId}`, {
                method: 'PUT', 
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            if(response.ok) {
                return true;
            } else {
                return rejectWithValue(false)
            }
        } catch (err) {
        
            console.log(err);
        }
    }
)

const loginDetailsSlice = createSlice({
    name: 'loginDetails',
    initialState: {
        isLoading: false,
        hasFailed: false,
        loginDetails: [],
        changePasswordSucceeded: null
    },
    extraReducers: {
        [getLoginDetails.pending]: (state, action) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [getLoginDetails.fulfilled]: (state, action) => {
            state.loginDetails = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [getLoginDetails.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasFailed = true;
        },
        [changePassword.pending]: (state, action) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [changePassword.fulfilled]: (state, action) => {
            state.changePasswordSucceeded = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [changePassword.rejected]: (state, action) => {
            state.changePasswordSucceeded = action.payload;
            state.isLoading = false;
            state.hasFailed = true;
        }
    }
})

export const selectIsLoading = (state) => state.loginDetails.isLoading;
export const selectHasFailed = (state) => state.loginDetails.hasFailed;
export const selectLoginDetails = (state) => state.loginDetails.loginDetails;

export const selectChangePasswordIsLoading = (state) => state.password.isLoading;
export const selectChangePasswordHasFailed = (state) => state.password.hasFailed;
export const selectChangePasswordSucceeded = (state) => state.loginDetails.changePasswordSucceeded;


export default loginDetailsSlice.reducer;