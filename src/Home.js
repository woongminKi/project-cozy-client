import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';

export default function Home() {
  const navigate = useNavigate();

  function goTradeCenter() {
    navigate('/');
  }
  function goLogin() {
    navigate('/login');
  }

  return (
    <HomeWrapper>
      <div className='main-title'>COZY</div>
      <div className='sub-title-wrapper'>
        <div>Coin is Easy</div>
        <div>잃으면서 투자하지 마세요.</div>
        <div>연습만이 살길입니다.</div>
      </div>
      <ButtonWrapper>
        <button onClick={goTradeCenter}>거래소 둘러보기</button>
        <button onClick={goLogin}>로그인</button>
      </ButtonWrapper>
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

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
