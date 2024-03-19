import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/App';
import store from './app/configureStore';
import { BrowserRouter } from 'react-router-dom';
// import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { persistStore } from 'redux-persist';

const persistor = persistStore(store);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <Provider store={store}>
    {/* <PersistGate persistor={persistor}> */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
    {/* </PersistGate> */}
  </Provider>
);

// serviceWorkerRegistration.register();
