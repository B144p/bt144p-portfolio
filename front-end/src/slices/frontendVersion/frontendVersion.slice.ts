import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchFrontendVersions, IFrontendVersionList } from '../../api/portfolioApi';

interface FrontendVersionState {
  data: IFrontendVersionList | null;
  loading: boolean;
  error: string | null;
}

const initialState: FrontendVersionState = { data: null, loading: false, error: null };

export const fetchFrontendVersionsAction = createAsyncThunk(
  'frontendVersion/fetch',
  fetchFrontendVersions,
);

const frontendVersionSlice = createSlice({
  name: 'frontendVersion',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchFrontendVersionsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFrontendVersionsAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(fetchFrontendVersionsAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message ?? 'Failed to fetch frontend versions';
      });
  },
});

export default frontendVersionSlice.reducer;
