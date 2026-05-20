import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchEducation, IEducation } from '../../api/portfolioApi';

interface EducationState {
  data: IEducation[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: EducationState = { data: null, loading: false, error: null };

export const fetchEducationAction = createAsyncThunk('education/fetch', fetchEducation);

const educationSlice = createSlice({
  name: 'education',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchEducationAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchEducationAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(fetchEducationAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message ?? 'Failed to fetch education';
      });
  },
});

export default educationSlice.reducer;
