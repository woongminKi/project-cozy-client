import React from 'react';
import styled from 'styled-components';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function FloatingButton({ supportItem }) {
  const user = useSelector((state) => state.auth.user);

  async function handleCheckout() {
    try {
      const res = await axios.post(
        `${process.env.REACT_APP_SERVER_URL}/stripe/create-checkout-session`,
        {
          supportItem,
          userId: user.uid,
        }
      );
      console.log('checkout session-data res??', res);
      if (res.data.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.log(
        'error in Floating button during request checkout session::',
        error
      );
    }
  }

  return (
    <>
      <ButtonWrapper onClick={handleCheckout}>응원하기💪</ButtonWrapper>
    </>
  );
}

const ButtonWrapper = styled.button`
  position: fixed;
  width: 80px;
  height: 80px;
  bottom: 20px;
  right: 20px;
  border: none;
  border-radius: 9999px;
  background: #f0b90b;
  color: #fff;
  cursor: pointer;
`;
