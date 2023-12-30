import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    },
    loginSuccess: (state) => {
      state.loginStatus = true;
    },
    loginFail: (state) => {
      state.error = 'login error';
    },
  },
});

export const { loginRequest, loginSuccess, loginFail } = authSlice.actions;
export default authSlice.reducer;
