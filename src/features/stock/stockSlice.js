import { createSlice } from '@reduxjs/toolkit';

const stockSlice = createSlice({
  name: 'stockCoinList',
  initialState: {
    coinList: '',
    socketCoin: '',
    requestCoin: '',
    requestSocket: '',
    error: '',
  },
  reducers: {
    initialCoinList: (state, action) => {
      // console.log('initialCoinList??', action.payload);
      state.coinList = action.payload;
    },
    requestCoinList: (state) => {
      state.requestCoin = '';
    },
    socketData: (state, action) => {
      state.socketCoin = action.payload;
    },
    requestSocketData: (state) => {
      state.requestSocket = '';
    },
    socketFailure: (state, action) => {
      const { message } = action.payload;

      state.error = message;
    },
  },
});

export const {
  initialCoinList,
  socketData,
  socketFailure,
  requestCoinList,
  requestSocketData,
} = stockSlice.actions;

export default stockSlice.reducer;
