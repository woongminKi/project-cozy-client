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
      state.loginStatus = false;
      state.isLoggedIn = false;
      console.log('loginSuccess action payload??', action.payload);
      state.user = action.payload;
    },
    loginSuccess: (state, action) => {
      state.loginStatus = true;
      state.isLoggedIn = true;
      // const { message } = action.payload;
      // state.isSignUp = message === '유저 등록 성공' ? true : false;
    },
    loginFail: (state, action) => {
      console.log('login fail??', action.payload);
      // const { message, status } = action.payload.response.data;

      // state.error = {
      //   message,
      //   status,
      // };

      state.isLoggedIn = false;
      state.error = 'login error';
    },
    logoutRequest: (state, action) => {
      state.isLoggedIn = true;
      state.isSignUp = false;
      sessionStorage.removeItem('access_token');
      sessionStorage.removeItem('uid');
      console.log('logout Request action payload??', action.payload);
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
