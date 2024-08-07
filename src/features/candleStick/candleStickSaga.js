import axios from 'axios';
import { put, all, fork, takeEvery } from 'redux-saga/effects';
import {
  candleStickRequest,
  candleStickSuccess,
  candleStickFailure,
} from './candleStickSlice';

function* getCandleStickData({ payload }) {
  const { currencyName, activeButton } = payload;
  let res = '';

  try {
    if (activeButton === '1min') {
      res = yield axios.get(
        `https://api.bithumb.com/v1/candles/minutes/1?market=KRW-${currencyName}&count=200` // 1분 캔들 데이터
      );
    } else if (activeButton === '1day') {
      res = yield axios.get(
        `https://api.bithumb.com/v1/candles/days?market=KRW-${currencyName}&count=200` // 1일 캔들 데이터
      );
    } else if (activeButton === '1week') {
      res = yield axios.get(
        `https://api.bithumb.com/v1/candles/weeks?market=KRW-${currencyName}&count=200` // 1주 캔들 데이터
      );
    } else if (activeButton === '1month') {
      res = yield axios.get(
        `https://api.bithumb.com/v1/candles/months?market=KRW-${currencyName}&count=200` // 1달 캔들 데이터
      );
    }
    const candleStickData = res.data;

    if (res.status === 200) {
      yield put(candleStickSuccess(candleStickData));
    }
  } catch (err) {
    yield put(candleStickFailure(err));
  }
}

function* watchCandleStick() {
  yield takeEvery(candleStickRequest, getCandleStickData);
}

export function* candleStickSaga() {
  yield all([fork(watchCandleStick)]);
}
