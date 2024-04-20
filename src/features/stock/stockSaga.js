import axios from 'axios';
import { call, put, all, fork, take, actionChannel } from 'redux-saga/effects';
import {
  initialCoinList,
  socketData,
  socketFailure,
  requestCoinList,
  requestSocketData,
} from './stockSlice';

function* getCoinList({ payload }) {
  try {
    // const test = yield axios.get(`${process.env.REACT_APP_SERVER_URL}/`);
    // console.log('뭐가 넘어오냐?', test);
    const ticker = yield axios.get(
      `https://api.bithumb.com/public/ticker/ALL_KRW`
    );
    // console.log('코인 ticker??', ticker);

    // const tickerList = { ...ticker.data.data };
    const tickerList = ticker;
    yield put(initialCoinList(tickerList));
  } catch (err) {
    yield put(socketFailure(err));
  }
}

function* getSocketData({ payload }) {
  try {
    const realTimeSocketData = { ...payload };
    // console.log('코인 ticker??', realTimeSocketData);
    yield put(socketData(realTimeSocketData));
  } catch (err) {
    yield put(socketFailure(err));
  }
}

function* watchGetCoinList() {
  const myCoinData = yield take(requestCoinList);
  yield call(getCoinList, myCoinData);
}

function* watchGetSocketData() {
  let socketCoinData = null;

  const requestSocketList = yield actionChannel(requestSocketData);
  while (true) {
    socketCoinData = yield take(requestSocketList);
    yield call(getSocketData, socketCoinData);
  }
}

export default function* stockSaga() {
  yield all([fork(watchGetCoinList), fork(watchGetSocketData)]);
}
