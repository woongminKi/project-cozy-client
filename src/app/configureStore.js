import { applyMiddleware, combineReducers, createStore } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
// import createSagaMiddleware from 'redux-saga';
import createSagaMiddleWare from 'redux-saga';
import { all } from 'redux-saga/effects';
import storage from 'redux-persist/lib/storage/session';
import { persistReducer } from 'redux-persist';

import auth from '../features/auth/authSlice';
import authSaga from '../features/auth/authSaga';
import candleStick from '../features/candleStick/candleStickSlice';
import { candleStickSaga } from '../features/candleStick/candleStickSaga';
import stock from '../features/stock/stockSlice';
import stockSaga from '../features/stock/stockSaga';
import user from '../features/user/userSlice';

const sagaMiddleware = createSagaMiddleWare();
const persistConfig = {
  key: 'root',
  storage,
};
// const reducer = combineReducers({
//   auth,
//   stock,
//   candleStick,
// });
const persistedReducer = persistReducer(
  persistConfig,
  combineReducers({
    auth,
    stock,
    candleStick,
    user,
  })
);

function* rootSaga() {
  yield all([authSaga(), stockSaga(), candleStickSaga()]);
  // yield all([authSaga(), stockSaga()]);
}

// const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }, [sagaMiddleware]),
// });

const store = createStore(persistedReducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
export default store;

// const sagaMiddleware = createSagaMiddleWare();

// const persistConfig = {
//   key: 'root',
//   storage,
// };

// const reducer = combineReducers({
//   auth,
//   candleStick,
//   stock,
// });

// const persistedReducer = persistReducer(persistConfig, reducer);

// function* rootSaga() {
//   yield all([authSaga(), candleStickSaga(), stockSaga()]);
// }

// const store = configureStore({
//   reducer: persistedReducer,
//   middleware: [sagaMiddleware],
// });

// sagaMiddleware.run(rootSaga);

// export default store;
