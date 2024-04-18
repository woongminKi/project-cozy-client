import { Routes, Route, useLocation } from 'react-router-dom';
import Main from '../components/exchanges/Main';
import Trade from '../components/exchanges/Trade';
import Header from '../components/common/Header';
import Login from '../components/Login';
import Asset from '../components/exchanges/Asset';
import KakaoRedirectHandler from '../components/KakaoRedirectHandler';
import Checkout from '../components/payment/Checkout';
import CheckoutSuccess from '../components/payment/CheckoutSuccess';
import CheckoutFail from '../components/payment/CheckoutFail';
import NotFound from '../components/common/NotFound';
import '../fonts/Poppins-Light.ttf';

function App() {
  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Main />} />
        <Route path='/main' element={<Main />} />
        <Route path='/trade/:currencyName' element={<Trade />} />
        <Route path='/assets' element={<Asset />} />
        <Route path='/login' element={<Login />} />
        <Route path='/payment' element={<Checkout />} />
        <Route
          path='/oauth/kakao/callback'
          element={<KakaoRedirectHandler />}
        />
        <Route path='/checkout-success' element={<CheckoutSuccess />} />
        <Route path='/checkout-fail' element={<CheckoutFail />} />
        <Route path='/*' element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;
