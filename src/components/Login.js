import React from 'react';
import { styled } from 'styled-components';
import kakaoImage from '../images/kakao_login_medium_narrow.png';

export default function Login() {
  const clientId = process.env.REACT_APP_API_ID;
  // const redirectURI = `${process.env.REACT_APP_REDIRECT_URI}/oauth/kakao/callback`;
  const redirectURI = `http://localhost:3000/oauth/kakao/callback`;
  // const redirectURI = `https://coin-is-easy.xyz/oauth/kakao/callback`;
  console.log('redirectURI::', redirectURI);
  // const clientId = '736c88fab71bf57de5334a344133d9f9';
  // const redirectURI = `http://localhost:3000/oauth/kakao/callback`;
  // const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=code`;

  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${clientId}&redirect_uri=${redirectURI}&response_type=code`;
  return (
    <>
      <div>회원가입</div>;
      <ButtonWrapper className='login-button-wrapper'>
        {/* <button>네이버</button> */}
        <a href={KAKAO_AUTH_URL}>
          <KakaoBtn>
            <img src={kakaoImage} alt='kakao-login' />
          </KakaoBtn>
        </a>
        {/* <button>구글</button> */}
      </ButtonWrapper>
    </>
  );
}

const ButtonWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const KakaoBtn = styled.div`
  width: 150px;
  height: 45px;
  margin: 50px auto;
  padding: -10px;
  background-size: cover;
  color: transparent;
  cursor: pointer;
`;
