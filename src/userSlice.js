import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";



export const getNewCartId= createAsyncThunk(
    'cartId/getNewCartId', async (id, { rejectWithValue }) => {
        try {
            const newCartResponse = await fetch(`http://localhost:4000/api/cart/new/${id}`, {
                method: 'POST',
                credentials: 'include'
            });
            if (newCartResponse.ok) {
                const newCart = await newCartResponse.json();
                return newCart.id;
            } else {
                rejectWithValue(null);
                const errorMsg = await newCartResponse.json()
                throw new Error(errorMsg);
            }
            
        } catch (err) {
            console.log(err);
        } 
    }
)

export const setCartId= createAsyncThunk(
    'cartId/setCartId', async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`http://localhost:4000/api/cart/${id}`, {credentials: 'include'});
            if (response.ok) {
                const cart = await response.json();
                return cart.id;
            } else {
                rejectWithValue(null);
                const errorMsg = await response.json()
                throw new Error(errorMsg);
            }
            
        } catch (err) {
            console.log(err);
        } 
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        hasFailed: false,
        userId: null,
        cartId: null,
        isLoggedIn: false,
    },
    reducers: {
        setUserId: (state, action) => { state.userId = action.payload },
        setLoggedIn: (state, action) => { state.isLoggedIn = action.payload },
        // see store for logout action
        logout: state => {}
    },
    extraReducers: {
        [setCartId.pending]: (state, action) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [setCartId.fulfilled]: (state, action) => {
            state.cartId = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [setCartId.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasFailed = true;
        },
        [getNewCartId.pending]: (state, action) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [getNewCartId.fulfilled]: (state, action) => {
            state.cartId = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [getNewCartId.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasFailed = true;
        }
    }
})

export const selectIsLoading = (state) => state.user.isLoading;
export const selectHasFailed = (state) => state.user.hasFailed;
export const selectUserId = (state) => state.user.userId;
export const selectCartId = (state) => state.user.cartId;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn;

export const { setUserId, setLoggedIn, logout } = userSlice.actions;

export default userSlice.reducer;

