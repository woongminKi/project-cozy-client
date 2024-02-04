import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess } from '../features/auth/authSlice';
import axios from 'axios';
import qs from 'qs';
import { loginUserData } from '../features/user/userSlice';

export default function KakaoRedirectHandler() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const loginStatus = useSelector((state) => state.auth.loginStatus);

  const restAPIKey = `${process.env.REACT_APP_API_ID}`;
  const redirectURI = `${process.env.REACT_APP_REDIRECT_URI}/oauth/kakao/callback`;
  const grantType = 'authorization_code';
  const code = new URL(window.location.href).searchParams.get('code');

  const getToken = async () => {
    const payload = qs.stringify({
      grant_type: grantType,
      client_id: restAPIKey,
      redirect_uri: redirectURI,
      code,
    });

    try {
      const res = await axios.post(
        'https://kauth.kakao.com/oauth/token',
        payload
      );
      console.log('로그인 res??', res);
      window.Kakao.init(restAPIKey);
      window.Kakao.Auth.setAccessToken(res.data.access_token);
      console.log('11');
      if (!res.data.access_token) {
        // dispatch(loginRequest({ res }));
        console.log('22');
        dispatch(loginSuccess());
      }
      console.log('33');
      if (res.status === 200) {
        console.log('44');
        const data = await window.Kakao.API.request({
          url: '/v2/user/me',
        });
        console.log('로그인 후 유저 데이터??', data);
        dispatch(
          loginRequest({
            uid: data.id,
            user_name: data.properties.nickname,
            user_image: data.properties.profile_image,
            accessToken: res.data.access_token,
            refreshToken: res.data.refresh_token,
            accessTokenExpiresIn: res.data.expires_in,
            refreshTokenExpiresIn: res.data.refresh_token_expires_in,
          })
        );
        dispatch(
          loginUserData({
            uid: data.id,
            user_name: data.properties.nickname,
            user_image: data.properties.profile_image,
          })
        );
        sessionStorage.setItem('access_token', res.data.access_token);
        navigate('/main');
      }
    } catch (err) {
      console.log('Kakao Redirect Handler Error:', err);
    }
  };

  useEffect(() => {
    getToken();
  }, []);

  return null;
}
