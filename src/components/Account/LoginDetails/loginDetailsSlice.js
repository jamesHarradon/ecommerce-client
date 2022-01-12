import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const  getLoginDetails = createAsyncThunk(
    'loginDetails/getLoginDetails', async (id) => {
        const response = await fetch(`http://localhost:4000/api/customer/data/${id}`, {credentials: 'include'});
        const json = await response.json();
        return json;
    }
)

const loginDetailsSlice = createSlice({
    name: 'loginDetails',
    initialState: {
        isLoading: false,
        hasFailed: false,
        loginDetails: []
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
        }
    }
})

export const selectIsLoading = (state) => state.loginDetails.isLoading;
export const selectHasFailed = (state) => state.loginDetails.hasFailed;
export const selectLoginDetails = (state) => state.loginDetails.loginDetails;

export default loginDetailsSlice.reducer;