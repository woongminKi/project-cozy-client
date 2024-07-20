import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isLoggedIn: false,
  isSignUp: false,
  loginStatus: false,
  user: {
    uid: '',
    user_name: '',
    user_image: '',
  },
  error: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginRequest: (state, action) => {
      state.user = action.payload;
      // console.log('loginSuccess action payload??', action.payload);
    },
    loginSuccess: (state, action) => {
      // console.log('isLoggedIn status?', state);
      state.loginStatus = true;
      state.isLoggedIn = true;
    },
    loginFail: (state) => {
      state.isLoggedIn = false;
      state.error = 'login error';
    },
    logoutRequest: (state, action) => {
      state.isLoggedIn = false;
      state.isSignUp = false;
      // console.log('logout Request action payload??', action.payload);
    },
    logoutSuccess: (state) => {
      state.isLoggedIn = false;
      state.isSignUp = false;
      // console.log('logout success action payload??');
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
