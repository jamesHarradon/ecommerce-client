import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getContacts = createAsyncThunk(
    'contacts/getContacts', async (id) => {
        const response = await fetch(`http://localhost:4000/api/customer/data/${id}`, {credentials: 'include'});
        const json = await response.json();
        return json;
    }
)

const contactSlice = createSlice({
    name: 'contacts',
    initialState: {
        isLoading: false,
        hasFailed: false,
        contacts: []
    },
    reducers: {
        deleteContacts(state, action) {
            state.contacts = action.payload
        },
    },  
    extraReducers: {
        [getContacts.pending]: (state, action) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [getContacts.fulfilled]: (state, action) => {
            state.contacts = [action.payload];
            state.isLoading = false;
            state.hasFailed = false;
        },
        [getContacts.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasFailed = true;
        },  
    }
})

export const { deleteContact } = contactSlice.actions;

export const selectIsLoading = (state) => state.contacts.isLoading;
export const selectHasFailed = (state) => state.contacts.hasFailed;
export const selectContacts = (state) => state.contacts.contacts;

export default contactSlice.reducer;