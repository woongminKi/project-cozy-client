import React from 'react';
import Chart from './Chart';
import Order from './Order';
import styled from 'styled-components';
import { WHITE, MAIN_COLOR_1, BREAK_POINT_MOBILE } from '../common/style';

export default function Trade() {
  return (
    <TradeWrapper>
      <Chart />
      <Order />
    </TradeWrapper>
  );
}

const TradeWrapper = styled.div`
  margin: 0 100px;

  .help-button {
    cursor: pointer;
    position: fixed;
    bottom: 5%;
    right: 2%;
    padding: 35px 25px;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    font-weight: 200;
    color: ${WHITE};
    background-color: ${MAIN_COLOR_1};
    opacity: 80%;
    transition: 0.2s;
  }

  .help-button:hover {
    padding: 40px 30px;
    opacity: 100%;
    transition: 0.2s;
  }

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    display: block;
    margin: unset;
    width: 100%;
  }
`;
