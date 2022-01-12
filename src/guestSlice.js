import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

//adds guest basket to DB once they have a user ID
export const setGuestBasketToDB = createAsyncThunk(
    'guestBasketToDB/setGuestBasketToDB', async (userId, guestBasket) => {
        // currently doesnt work - TypeError: guestBasket.forEach is not a function
        // i think it is because I am referencing a piece of state from within the slice it originates
        try {
            let cartId;
            const response = await fetch(`http://localhost:4000/api/cart/${userId}`, {credentials: 'include'});
            const existingCart = await response.json();
            
            if (existingCart) {
                cartId = existingCart.id;
                // deletes products in current cart in db
                await fetch(`http://localhost:4000/api/cart/products/deleteAll/${userId}/${cartId}`, {method: 'DELETE', credentials: 'include'});    
            } 
            if (!existingCart) {
                //creates new carts and gets cartId
                const newCart = await fetch(`http://localhost:4000/api/cart/new/${userId}`, {method: 'POST', credentials: 'include'});
                console.log(newCart);
                cartId = newCart.id 
            };
            //adds product to new cart in db
            guestBasket.forEach(async (product) => {
                await fetch(`http://localhost:4000/api/cart/products/add/${userId}/${cartId}/${product.product_id}`, {method: 'POST', credentials: 'include'});
            });

            return true;
            
        } catch (err) {
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
        setGuestBasket: (state, action) => { state.guestBasket = action.payload }
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

export const {setGuestId, setGuestBasket } = guestSlice.actions;

export default guestSlice.reducer;