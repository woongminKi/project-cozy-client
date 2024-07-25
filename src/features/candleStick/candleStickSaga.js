import axios from 'axios';
import { put, all, fork, takeEvery } from 'redux-saga/effects';
import {
  candleStickRequest,
  candleStickSuccess,
  candleStickFailure,
} from './candleStickSlice';

function* getCandleStickData({ payload }) {
  const { currencyName, time } = payload;

  try {
    // console.log('res??', process.env.REACT_APP_CANDLESTICK_API_URL);
    const res = yield axios.get(
      `https://api.bithumb.com/v1/candles/days?market=KRW-${currencyName}&count=200` // 1일 캔들 데이터
    );
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
