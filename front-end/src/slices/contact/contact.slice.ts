import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchContacts, IContact } from '../../api/portfolioApi';

interface ContactState {
  data: IContact[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ContactState = { data: null, loading: false, error: null };

export const fetchContactsAction = createAsyncThunk('contact/fetch', fetchContacts);

const contactSlice = createSlice({
  name: 'contact',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchContactsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchContactsAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(fetchContactsAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message ?? 'Failed to fetch contacts';
      });
  },
});

export default contactSlice.reducer;
