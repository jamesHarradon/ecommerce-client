import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//adds guest basket to DB once they have a user ID
export const setGuestBasketToDB = createAsyncThunk(
    'guestBasketToDB/setGuestBasketToDB', async (data, { rejectWithValue }) => {

        try {
            let cartId;
            const response = await fetch(`/api/cart/${data.userId}`, {credentials: 'include'});
            const existingCart = await response.json();
            
            if (existingCart && existingCart.total_cost) {
                cartId = existingCart.id;
                // deletes products in current cart in db
                await fetch(`/api/cart/products/deleteAll/${data.userId}/${cartId}`, {method: 'DELETE', credentials: 'include'});    
            } 
            //total cost is null if cart is empty
            if(existingCart && !existingCart.total_cost) cartId = existingCart.id;

            if (!existingCart) {
                //creates new cart and gets cartId
                const newCart = await fetch(`/api/cart/new/${data.userId}`, {method: 'POST', credentials: 'include'});
                cartId = newCart.id 
            };
            //adds product to new cart in db
            data.guestBasket.forEach(async (product) => {
                await fetch(`/api/cart/products/add/${data.userId}/${cartId}/${product.product_id}/${product.quantity}`, {method: 'POST', credentials: 'include'});
            });

            return true;
            
        } catch (err) {
            rejectWithValue(false);
            console.log(err);
        }
    }
)

const guestSlice = createSlice({
    name: 'guest',
    initialState: {
        isLoading: false,
        hasFailed: false,
        guestId: null,
        guestBasket: [],
        guestBasketToDB: false
    },
    reducers: {
        setGuestId: (state, action) => { state.guestId = action.payload },
        setGuestBasket: (state, action) => { state.guestBasket = action.payload },
        incrementGuestBasketProduct: (state, action) => {
            const product = state.guestBasket.find(product => product.product_id === action.payload);
            product.quantity++;
        },
        decrementGuestBasketProduct: (state, action) => { 
            const product = state.guestBasket.find(product => product.product_id === action.payload);
            product.quantity--;
        }
    },
    extraReducers: {
        [setGuestBasketToDB.pending]: (state, action) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [setGuestBasketToDB.fulfilled]: (state, action) => {
            state.guestBasketToDB = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [setGuestBasketToDB.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasFailed = true;
        }
    }
})

export const selectIsLoading = (state) => state.guest.isLoading;
export const selectHasFailed = (state) => state.guest.hasFailed;
export const selectGuestId = (state) => state.guest.guestId;
export const selectGuestBasket = (state) => state.guest.guestBasket;
export const selectGuestBasketToDB = (state) => state.guest.guestBasketToDB

export const {setGuestId, setGuestBasket, incrementGuestBasketProduct, decrementGuestBasketProduct } = guestSlice.actions;

export default guestSlice.reducer;