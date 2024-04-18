import React from 'react';
import { useNavigate } from 'react-router-dom';
import { styled } from 'styled-components';
import { BREAK_POINT_MOBILE } from '../common/style';

export default function CheckoutSuccess() {
  const navigate = useNavigate();
  function movePage() {
    navigate('/');
  }
  return (
    <ContentsWrapper>
      <div>결제에 성공했습니다!</div>
      <Button onClick={movePage}>홈으로 가기</Button>
    </ContentsWrapper>
  );
}

const ContentsWrapper = styled.div`
  margin-top: 84px;
  text-align: center;

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    padding: unset;
    margin-top: 78px;
  }
`;

const Button = styled.button`
  width: 150px;
  height: 40px;
  margin-top: 12px;
  border: 1px solid #ebebeb;
  border-radius: 8px;
  cursor: pointer;
`;
