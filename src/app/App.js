import { Routes, Route, useLocation } from 'react-router-dom';
import Home from '../Home';
import Main from '../components/exchanges/Main';
import Trade from '../components/exchanges/Trade';
import Header from '../components/common/Header';
import Login from '../components/Login';
import Asset from '../components/exchanges/Asset';
import KakaoRedirectHandler from '../components/KakaoRedirectHandler';

function App() {
  const location = useLocation();

  return (
    <>
      {location.pathname !== '/' && <Header />}
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/main' element={<Main />} />
        <Route path='/trade/:currencyName' element={<Trade />} />
        <Route path='/login' element={<Login />} />
        <Route path='/assets' element={<Asset />} />
        <Route
          path='/oauth/kakao/callback'
          element={<KakaoRedirectHandler />}
        />
      </Routes>
    </>
  );
}

export default App;
