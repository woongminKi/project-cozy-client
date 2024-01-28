import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  requestCoinList,
  requestSocketData,
} from '../../features/stock/stockSlice';
import Chart from './Chart';
import Order from './Order';

export default function Trade() {
  return (
    <>
      <Chart />
      <Order />
    </>
  );
}
