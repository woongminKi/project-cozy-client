import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  isSignUp: false,
  loginStatus: false,
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state) => {
      console.log('loginRequest??', state);
      state.loginStatus = false;
      state.isLoggedIn = false;
    },
    loginSuccess: (state, action) => {
      state.loginStatus = true;
      const { message } = action.payload;

      state.isLoggedIn = true;
      state.isSignUp = message === '유저 등록 성공' ? true : false;
    },
    loginFail: (state, action) => {
      const { message, status } = action.payload.response.data;

      state.error = {
        message,
        status,
      };

      state.isLoggedIn = false;
      state.error = 'login error';
    },
    logoutRequest: (state) => {
      state.isLoggedIn = true;
      state.isSignUp = false;
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.isSignUp = false;
    },
    closeWelcomeModal: (state) => {
      state.isSignUp = false;
    },
  },
});

export const {
  loginRequest,
  loginSuccess,
  loginFail,
  logoutRequest,
  logoutSuccess,
  closeWelcomeModal,
} = authSlice.actions;
export default authSlice.reducer;
