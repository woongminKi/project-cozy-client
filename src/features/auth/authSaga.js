import axios from 'axios';
import { all, fork, put, takeLatest } from 'redux-saga/effects';
import { loginRequest, logoutRequest, loginFail } from './authSlice';
import { loginUserData } from '../user/userSlice';

function* userLogin({ payload }) {
  const { token } = payload;

  try {
    if (token) {
      const response = yield axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/login`,
        {
          header: {
            token,
          },
        }
      );
      // console.log('userLogin token res??', response.data.userData);
      loginUserData({
        uid: response.data.userData.uid,
        user_name: response.data.userData.displayName,
        user_image: response.data.userData.imgUrl,
      });
    }
  } catch (err) {
    yield put(loginFail(err));
  }
}

function* userLogout({ payload }) {
  // console.log('logout payload', payload);
  try {
    const response = yield axios.post(
      `${process.env.REACT_APP_SERVER_URL}/user/logout`,
      {
        data: payload.user.uid,
      }
    );
    // console.log('logout res??', response);
    if (response.data.status === 200) {
      yield logoutRequest();
    }
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
