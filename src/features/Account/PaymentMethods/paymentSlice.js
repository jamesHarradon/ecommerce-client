import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getPaymentMethod = createAsyncThunk(
    'paymentMethod/getPaymentMethod', async (id) => {
        try {
            const response = await fetch(`http://localhost:4000/api/payments/data/${id}`, {credentials: 'include'});
            if (response.ok) {
                const json = await response.json();
                return json;
            } else {
                throw new Error('System Error');
            }
        } catch (err) {
            console.log(err);
        }
    }
);

export const addPaymentMethod = createAsyncThunk(
    'paymentMethod/addPaymentMethod', async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:4000/api/payments/data/new/${data.userId}`, {
                method: 'POST',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            if (response.ok) {
                const json = await response.json();
                return json;
            } else {
                rejectWithValue([]);
            }
        } catch (err) {
            console.log(err);
        }
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
        },
        [addPaymentMethod.pending]: (state, action) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [addPaymentMethod.fulfilled]: (state, action) => {
            state.paymentMethod = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [addPaymentMethod.rejected]: (state, action) => {
            state.paymentMethod = action.payload;
            state.isLoading = false;
            state.hasFailed = true;
        }
    }
})

export const selectIsLoading = (state) => state.paymentMethod.isLoading;
export const selectHasFailed = (state) => state.paymentMethod.hasFailed;
export const selectPaymentMethod = (state) => state.paymentMethod.paymentMethod;

export default paymentSlice.reducer;