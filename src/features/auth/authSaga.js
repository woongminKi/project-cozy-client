import axios from 'axios';
import { all, fork, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFail } from './authSlice';

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
    console.log('res??', response);
  } catch (err) {
    yield put(loginFail(err));
  }
}

function* watchLogin() {
  yield takeLatest(loginRequest, userLogin);
}

export default function* authSaga() {
  yield all([fork(watchLogin)]);
}
