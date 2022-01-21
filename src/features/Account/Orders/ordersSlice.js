import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const  getOrders = createAsyncThunk(
    'orders/getOrders', async (id, { rejectWithValue }) => {
        const response = await fetch(`/api/orders/history/${id}`, {credentials: 'include'});
        try {
            if (response.ok) {
                const json = await response.json();
                return json;
            } else {
                rejectWithValue([]);
                const errorMsg = await response.json()
                throw new Error(errorMsg);
            }
        } catch (err) {
            console.log(err);
        }
    }
)

const ordersSlice = createSlice({
    name: 'orders',
    initialState: {
        isLoading: false,
        hasFailed: false,
        orders: []
    },
    extraReducers: {
        [getOrders.pending]: (state, action) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [getOrders.fulfilled]: (state, action) => {
            state.orders = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [getOrders.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasFailed = true;
        }
    }
})

export const selectIsLoading = (state) => state.orders.isLoading;
export const selectHasFailed = (state) => state.orders.hasFailed;
export const selectOrders = (state) => state.orders.orders;

export default ordersSlice.reducer;