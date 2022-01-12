import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getPaymentMethod = createAsyncThunk(
    'paymentMethod/getPaymentMethod', async (id) => {
        const response = await fetch(`http://localhost:4000/api/payments/data/${id}`, {credentials: 'include'});
        const json = await response.json();
        return json;
    }
)

const paymentSlice = createSlice({
    name: 'paymentMethod',
    initialState: {
        isLoading: false,
        hasFailed: false,
        paymentMethod: []
    },
    extraReducers: {
        [getPaymentMethod.pending]: (state, action) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [getPaymentMethod.fulfilled]: (state, action) => {
            state.paymentMethod = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [getPaymentMethod.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasFailed = true;
        }
    }
})

export const selectIsLoading = (state) => state.paymentMethod.isLoading;
export const selectHasFailed = (state) => state.paymentMethod.hasFailed;
export const selectPaymentMethod = (state) => state.paymentMethod.paymentMethod;

export default paymentSlice.reducer;