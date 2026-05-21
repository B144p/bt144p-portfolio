import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchProjects, IProject } from '../../api/portfolioApi';

interface PortfolioProjectState {
  data: IProject[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: PortfolioProjectState = { data: null, loading: false, error: null };

export const fetchPortfolioProjectsAction = createAsyncThunk('portfolioProject/fetch', fetchProjects);

const portfolioProjectSlice = createSlice({
  name: 'portfolioProject',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPortfolioProjectsAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPortfolioProjectsAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(fetchPortfolioProjectsAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message ?? 'Failed to fetch projects';
      });
  },
});

export default portfolioProjectSlice.reducer;
