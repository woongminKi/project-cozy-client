import { Routes, Route, useLocation } from 'react-router-dom';
import Main from '../components/exchanges/Main';
import Trade from '../components/exchanges/Trade';
import Header from '../components/common/Header';
import Login from '../components/Login';
import Asset from '../components/exchanges/Asset';
import KakaoRedirectHandler from '../components/KakaoRedirectHandler';
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
      </Routes>
    </>
  );
}

export default App;
