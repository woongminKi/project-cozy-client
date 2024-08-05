import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { loginRequest, loginSuccess } from '../features/auth/authSlice';
import { setCookie } from '../utils/cookies';
import axios from 'axios';
import qs from 'qs';

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
      window.Kakao.init(restAPIKey);
      window.Kakao.Auth.setAccessToken(res.data.access_token);

      if (!loginStatus) {
        dispatch(loginSuccess());
      }

      if (res.status === 200) {
        const data = await window.Kakao.API.request({
          url: '/v2/user/me',
        });

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

        setCookie('accessToken', res.data.refresh_token, {
          path: '/',
          secure: true,
          // domain: 'coin-is-easy.xyz',
          sameSite: 'none',
          maxAge: 7200,
          // httpOnly: true,
        });
        setCookie('refreshToken', res.data.refreshToken, {
          path: '/',
          secure: true,
          // domain: 'coin-is-easy.xyz',
          sameSite: 'none',
          maxAge: 604800,
          // httpOnly: true,
        });

        navigate('/');
      }
    } catch (err) {
      console.log('Kakao Redirect Handler Error:', err);
    }
  };

  useEffect(() => {
    getToken();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return null;
}
