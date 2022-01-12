import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const setUserId = createAsyncThunk(
    'userId/setUserId', async () => {
        const response = await fetch(`http://localhost:4000/api/auth/id`, {credentials: 'include'});
        if(response.ok) {
            const json = await response.json();
            return json;
        } else {
            return null;
        }
        
    }
)

const userSlice = createSlice({
    name: 'user',
    initialState: {
        isLoading: false,
        hasFailed: false,
        userId: null,
        isLoggedIn: false,
    },
    reducers: {
        setLoggedIn: (state, action) => { state.isLoggedIn = action.payload },
        // see store for logout action
        logout: state => {}
    },
    extraReducers: {
        [setUserId.pending]: (state, action) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [setUserId.fulfilled]: (state, action) => {
            state.userId = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [setUserId.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasFailed = true;
        }
    }
})

export const selectIsLoading = (state) => state.user.isLoading;
export const selectHasFailed = (state) => state.user.hasFailed;
export const selectUserId = (state) => state.user.userId;
export const selectIsLoggedIn = (state) => state.user.isLoggedIn

export const { logout, setLoggedIn } = userSlice.actions;

export default userSlice.reducer;

