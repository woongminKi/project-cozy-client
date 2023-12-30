import { applyMiddleware, combineReducers, createStore } from 'redux';
import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit';
import createSagaMiddleware from 'redux-saga';
import { all } from 'redux-saga/effects';

import auth from '../features/auth/authSlice';
import authSaga from '../features/auth/authSaga';

const sagaMiddleware = createSagaMiddleware();

const reducer = combineReducers({
  auth,
});

function* rootSaga() {
  yield all([authSaga()]);
}

// const store = configureStore({
//   reducer,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({ serializableCheck: false }, [sagaMiddleware]),
// });

const store = createStore(reducer, applyMiddleware(sagaMiddleware));

sagaMiddleware.run(rootSaga);
export default store;
