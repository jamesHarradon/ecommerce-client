import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const setUserId = createAsyncThunk(
    'userId/setUserId', async () => {
        const response = await fetch(`http://localhost:4000/auth/id`, {credentials: 'include'});
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
        userId: null
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

export default userSlice.reducer;

// reducer without fetch
// const userSlice = createSlice({
//     name: 'user',
//     initialState: {
//         id: null
//     },
//     reducers: {
//         addUserId: (state, action) => state = action.payload
//     }
// })

// export const { addUserId } = userSlice.actions;
// export const userIdSelector = (state) => state.user.id;
// export default userSlice.reducer