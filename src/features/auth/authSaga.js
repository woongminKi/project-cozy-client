import axios from 'axios';
import { all, fork, put, takeLatest } from 'redux-saga/effects';
import {
  loginRequest,
  loginSuccess,
  logoutRequest,
  loginFail,
} from './authSlice';
import { loginUserData } from '../user/userSlice';
import { setCookie } from '../../utils/cookies';

function* userLogin({ payload }) {
  const {
    uid,
    user_name,
    user_image,
    accessToken,
    refreshToken,
    accessTokenExpiresIn,
    refreshTokenExpiresIn,
    token,
  } = payload;

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
    } else {
      const response = yield axios.post(
        `${process.env.REACT_APP_SERVER_URL}/user/login`,
        {
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
        }
      );
      console.log('userLogin res??', response);

      if (response.data.token) {
        loginSuccess();
      }

      setCookie('accessToken', response.data.token, {
        path: '/',
        // secure: true,
        domain: 'coin-is-easy.xyz',
        sameSite: 'none',
        maxAge: 7200,
        // httpOnly: true,
      });
      console.log('access token set?');
      setCookie('refreshToken', response.data.refreshToken, {
        path: '/',
        // secure: true,
        domain: 'coin-is-easy.xyz',
        sameSite: 'none',
        maxAge: 604800,
        // httpOnly: true,
      });
      console.log('refresh token set?');
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
