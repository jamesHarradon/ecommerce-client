import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const getContacts = createAsyncThunk(
    'contacts/getContacts', async (id, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/customer/data/${id}`, {credentials: 'include'});
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

export const addContacts = createAsyncThunk(
    'contacts/addContacts', async (data, { rejectWithValue }) => {
        try {
            const response = await fetch(`/api/customer/contact/data/new/${data.userId}`, { 
                method: 'POST', 
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });
            
            if (response.ok) {
                const json = await response.json();
                return json;
            } else {
                rejectWithValue([]);
                const errorMsg = await response.json()
                throw new Error(errorMsg);
            }
        } catch (err) {
            console.log(err)
        }
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
            state.contacts = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [getContacts.rejected]: (state, action) => {
            state.isLoading = false;
            state.hasFailed = true;
        },  
        [addContacts.pending]: (state, action) => {
            state.isLoading = true;
            state.hasFailed = false;
        },
        [addContacts.fulfilled]: (state, action) => {
            state.contacts = action.payload;
            state.isLoading = false;
            state.hasFailed = false;
        },
        [addContacts.rejected]: (state, action) => {
            state.contacts = action.payload;
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