import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    coins: [],
    cash: 0,
    transactionHistory: [],
    isOpenHelpModal: false,
    error: '',
    userData: {},
  },
  reducers: {
    loginUserData: (state, action) => {
      state.userData = action.payload;
    },
    logout: (state) => {
      state.user = {
        uid: '',
        email: '',
        displayName: '',
        asset: {
          cash: 0,
          coins: [],
        },
        transactionHistory: [],
      };
    },
    orderRequest: (state, action) => {
      let currentMoney = localStorage.getItem('default_asset');
      if (action.payload.isBuy === true) {
        state.cash = Number(currentMoney) - Number(action.payload.orderPrice);
        localStorage.setItem(
          'default_asset',
          Number(currentMoney) - Number(action.payload.orderPrice)
        );
      } else {
        state.cash = Number(currentMoney) + Number(action.payload.orderPrice);
        localStorage.setItem(
          'default_asset',
          Number(currentMoney) + Number(action.payload.orderPrice)
        );
      }
      state.coins.push(action.payload);
      localStorage.setItem('order', JSON.stringify(state.user));
    },
    orderReset: (state, action) => {
      state.coins = [];
    },
    orderSuccess: (state, action) => {
      state.user = Object.assign({}, action.payload);
    },
    orderFailure: (state, action) => {
      const { message, status } = action.payload.response.data;
      state.error = {
        message,
        status,
      };
    },
    openHelpModal: (state) => {
      state.isOpenHelpModal = true;
    },
    closeHelpModal: (state) => {
      state.isOpenHelpModal = false;
    },
  },
});

export const {
  loginUserData,
  logout,
  orderRequest,
  orderReset,
  orderSuccess,
  orderFailure,
  openHelpModal,
  closeHelpModal,
} = userSlice.actions;

export default userSlice.reducer;
