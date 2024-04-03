import axios from 'axios';
import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, logoutRequest, loginFail } from './authSlice';

function* userLogin({ payload }) {
  const {
    uid,
    user_name,
    user_image,
    accessToken,
    refreshToken,
    accessTokenExpiresIn,
    refreshTokenExpiresIn,
  } = payload;

  try {
    const response = yield axios.post(`http://localhost:8000/user/login`, {
      // server url
      header: {
        accessToken,
        refreshToken,
        accessTokenExpiresIn,
        refreshTokenExpiresIn,
      },
      data: {
        uid,
        user_name,
        user_image,
      },
    });
    console.log('userLogin res??', response);
    localStorage.setItem('token', response.data.token);
  } catch (err) {
    yield put(loginFail(err));
  }
}

function* userLogout({ payload }) {
  console.log('logout payload', payload);
  try {
    const response = yield axios.post(`http://localhost:8000/user/logout`, {
      header: {
        uid: payload.uid,
      },
    });
    console.log('logout res??', response);
  } catch (err) {
    yield put(loginFail(err));
  }
}

function* watchLogin() {
  yield takeLatest(loginRequest, userLogin);
}

function* watchLogout() {
  yield takeLatest(logoutRequest, userLogout);
}

export default function* authSaga() {
  yield all([fork(watchLogin), fork(watchLogout)]);
}
