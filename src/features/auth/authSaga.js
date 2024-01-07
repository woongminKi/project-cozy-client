import axios from 'axios';
import { all, fork, put, takeLatest, takeEvery } from 'redux-saga/effects';
import { loginRequest, loginSuccess, loginFail } from './authSlice';

function* userLogin({ payload }) {
  const { res } = payload;
  console.log('payload??', res);

  const accessToken = res.data.access_token;
  const refreshToken = res.data.refresh_token;
  const accessTokenExpiresIn = res.data.expires_in;
  const refreshTokenExpiresIn = res.data.refresh_token_expires_in;

  try {
    yield axios.post('http://localhost:8000/login', {
      // server url
      header: {
        accessToken,
        refreshToken,
        accessTokenExpiresIn,
        refreshTokenExpiresIn,
      },
    });
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
