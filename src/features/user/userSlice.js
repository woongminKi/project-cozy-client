import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {
      asset: {
        cash: 0,
        coins: [],
      },
      transactionHistory: [],
    },
    isOpenHelpModal: false,
    error: '',
  },
  reducers: {
    loginUserData: (state, action) => {
      // console.log('userSlice에서 loginUserData', action.payload);
      // state.user = Object.assign({}, action.payload);
      state.user = {
        asset: {
          cash: 100000000,
          coins: [],
        },
        transactionHistory: [],
      };
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
      // console.log('주문 성공?', action.payload);
      state.user.asset.cash =
        Number(currentMoney) - Number(action.payload.orderPrice);
      state.user.asset.coins.push(action.payload);
      localStorage.setItem('order', JSON.stringify(state.user));
      localStorage.setItem(
        'default_asset',
        Number(currentMoney) - Number(action.payload.orderPrice)
      );
      // state.user = Object.assign({}, state.user);
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
  orderSuccess,
  orderFailure,
  openHelpModal,
  closeHelpModal,
} = userSlice.actions;

export default userSlice.reducer;
