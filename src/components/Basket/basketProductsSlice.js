import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getBasketProductsByCustId = createAsyncThunk(
    'basketProducts/getBasketProductsByCustId', async (id) => {
        const response = await fetch(`http://localhost:4000/api/cart/products/${id}`, {credentials: 'include'});
        const json = await response.json();
        return json;
    }
);

export const addBasketProducts = createAsyncThunk(
    'basketProducts/addBasketProducts', async (data) => {
        try {
            const response = await fetch(`http://localhost:4000/api/cart/products/add/${data.userId}/${data.cartId}/${data.productId}`, {
                method: 'POST',
                credentials: 'include'
            });
            if (response.ok) {
                const json = await response.json();
                return json;
            }
            else {
                throw new Error('System Error')
            }
        } catch (err) {
            console.log(err);
        }
    }
);

export const deleteBasketProducts = createAsyncThunk(
    'basketProducts/deleteBasketProducts', async (data) => {
        try {
            const response = await fetch(`http://localhost:4000/api/cart/products/delete/${data.userId}/${data.cartId}/${data.productId}`, {
                method: 'DELETE',
                credentials: 'include'
            });
            if (response.ok) {
                const json = await response.json();
                return json;
            }
            else {
                throw new Error('System Error')
            }
        } catch (err) {
            console.log(err);
        }
    }
)

const basketProductsSlice = createSlice({
    name: 'basketProducts',
    initialState: {
        isLoading: false,
        hasFailed: false,
        basketProducts: []
    },
    extraReducers: {
        [getBasketProductsByCustId.pending]: (state, action) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [getBasketProductsByCustId.fulfilled]: (state, action) => {
            state.basketProducts = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [getBasketProductsByCustId.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasFailed = true;
        },
        [addBasketProducts.pending]: (state, action) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [addBasketProducts.fulfilled]: (state, action) => {
            state.basketProducts = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [addBasketProducts.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasFailed = true;
        },
        [deleteBasketProducts.pending]: (state, action) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [deleteBasketProducts.fulfilled]: (state, action) => {
            state.basketProducts = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [deleteBasketProducts.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasFailed = true;
        }
    }
})

export const selectIsLoading = (state) => state.basketProducts.isLoading;
export const selectHasFailed = (state) => state.basketProducts.hasFailed;
export const selectBasketProducts = (state) => state.basketProducts.basketProducts;

export default basketProductsSlice.reducer;