import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchExperience, IExperience } from '../../api/portfolioApi';

interface ExperienceState {
  data: IExperience[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: ExperienceState = { data: null, loading: false, error: null };

export const fetchExperienceAction = createAsyncThunk('experience/fetch', fetchExperience);

const experienceSlice = createSlice({
  name: 'experience',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchExperienceAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchExperienceAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(fetchExperienceAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message ?? 'Failed to fetch experience';
      });
  },
});

export default experienceSlice.reducer;
