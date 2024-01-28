import { createSlice } from '@reduxjs/toolkit';
import { GET_CHART_FAILURE } from '../../components/constants/messages';

const candleStickSlice = createSlice({
  name: 'candleStick',
  initialState: {
    candleStick: [],
    candleStickReqArr: [],
    error: '',
  },
  reducers: {
    candleStickRequest: (state, action) => {
      state.candleStickReqArr = action.payload;
    },
    candleStickSuccess: (state, action) => {
      state.candleStick = action.payload;
    },
    candleStickFailure: (state) => {
      const message = GET_CHART_FAILURE;
      const status = 500;
      state.error = {
        message,
        status,
      };
    },
  },
});

export const { candleStickRequest, candleStickSuccess, candleStickFailure } =
  candleStickSlice.actions;

export default candleStickSlice.reducer;
