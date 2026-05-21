import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { fetchStatistic, IStatistic } from '../../api/portfolioApi';

interface StatisticState {
  data: IStatistic | null;
  loading: boolean;
  error: string | null;
}

const initialState: StatisticState = { data: null, loading: false, error: null };

export const fetchStatisticAction = createAsyncThunk('statistic/fetch', fetchStatistic);

const statisticSlice = createSlice({
  name: 'statistic',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchStatisticAction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchStatisticAction.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.data = payload;
      })
      .addCase(fetchStatisticAction.rejected, (state, { error }) => {
        state.loading = false;
        state.error = error.message ?? 'Failed to fetch statistics';
      });
  },
});

export default statisticSlice.reducer;
