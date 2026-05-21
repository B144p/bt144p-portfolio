import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchAboutMe, IAboutMe } from '../../api/portfolioApi';

interface AboutMeState {
  data: IAboutMe | null;
  loading: boolean;
  error: string | null;
}

const initialState: AboutMeState = { data: null, loading: false, error: null };

export const fetchAboutMeAction = createAsyncThunk('aboutMe/fetch', fetchAboutMe);

const aboutMeSlice = createSlice({
  name: 'aboutMe',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutMeAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAboutMeAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(fetchAboutMeAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message ?? 'Failed to fetch about me';
      });
  },
});

export default aboutMeSlice.reducer;
