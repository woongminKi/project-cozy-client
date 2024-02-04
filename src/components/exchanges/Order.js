import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { MAIN_COLOR_1, WHITE } from '../common/style';
import OrderModal from '../modal/OrderModal';
import { orderRequest } from '../../features/user/userSlice';

export default function Order() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const coinList = useSelector((state) => state.stock.coinList.data.data);
  const { currencyName } = useParams();
  const [isBuy, setIsBuy] = useState(true);
  const [unitsTraded, setUnitsTraded] = useState('');
  const [currentCurrencyPrice, setCurrentCurrencyPrice] = useState(
    coinList[currencyName].closing_price
  );
  // const coin = coinList.data.data[currencyName];

  const [isOpenModal, setIsOpenModal] = useState({
    isTrade: false,
    isRequest: false,
    isComplete: false,
    isFailInput: false,
    isNotAuth: false,
    isFailTrade: false,
  });
  const {
    isTrade,
    isRequest,
    isComplete,
    isNotAuth,
    isFailInput,
    isFailTrade,
  } = isOpenModal;
  const total = Number(currentCurrencyPrice) * Number(unitsTraded);
  let coin = 10000000;
  let cash = 50000000;
  const buyCoinList = localStorage.getItem('coin-list');
  const isLoggedIn = sessionStorage.getItem('access_token');

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_SERVER_URL);

    ws.onmessage = (event) => {
      const res = JSON.parse(event.data);
      const currentCurrencyName = res.content.symbol.split('_')[0];

      if (currencyName === currentCurrencyName) {
        setCurrentCurrencyPrice(res.content.closePrice);
      }
    };

    ws.onerror = (error) => {
      console.error(error);
    };

    return () => {
      ws.close();
    };
  }, [currencyName]);

  const handleChangeInputValue = (e) => {
    setUnitsTraded(e.target.value);
  };

  const handleClickToggle = (e) => {
    if (e.target.value === '매수' && !isBuy) {
      setIsBuy(true);
      setUnitsTraded('');
    }

    if (e.target.value === '매도' && isBuy) {
      setIsBuy(false);
      setUnitsTraded('');
    }
  };

  const handleClickOpenTradeModal = (e) => {
    e.preventDefault();

    // if (!isLoggedIn) {
    //   setIsOpenModal({
    //     ...isOpenModal,
    //     isNotAuth: true,
    //   });

    //   return;
    // }

    if (unitsTraded === '' || Number(unitsTraded) < 0.0001) {
      setIsOpenModal({
        ...isOpenModal,
        isFailInput: true,
      });

      return;
    }

    setIsOpenModal({
      ...isOpenModal,
      isTrade: true,
    });
  };

  const handleClickCloseModal = () => {
    setIsOpenModal({
      ...isOpenModal,
      isTrade: false,
      isComplete: false,
      isNotAuth: false,
      isFailInput: false,
      isFailTrade: false,
    });
  };

  const goLogInPage = () => {
    navigate('/login');
  };

  const handleClickTrade = () => {
    if (isBuy && cash - total < 0) {
      setIsOpenModal({
        ...isOpenModal,
        isTrade: false,
        isFailTrade: true,
      });

      return;
    }

    if (!isBuy && (coin === null || coin.quantity < Number(unitsTraded))) {
      setIsOpenModal({
        ...isOpenModal,
        isTrade: false,
        isFailTrade: true,
      });

      return;
    }

    dispatch(
      orderRequest({
        transactionDate: new Date(),
        currencyName,
        price: Number(currentCurrencyPrice),
        unitsTraded: Number(unitsTraded),
        total,
        isBuy,
      })
    );

    setIsOpenModal({
      ...isOpenModal,
      isTrade: false,
      isComplete: true,
    });

    setUnitsTraded('');
  };

  return (
    <>
      <OrderWrapper>
        <AssetWrapper>
          <span className='my-asset'>
            보유 현금: {Math.round(cash).toLocaleString()} 원{' '}
          </span>
          <span className='my-asset'>
            보유 {currencyName}:{' '}
            {/* {coin ? coin.quantity.toFixed(4).toLocaleString() : 0} 개 */}
            {coin ? coin : 0} 개
          </span>
          <span className='my-asset'>
            평균매수가:{' '}
            {/* {coin ? Math.round(coin.averagePrice).toLocaleString() : 0} 원 */}
            {coin ? coin : 0} 원
          </span>
        </AssetWrapper>
        <OrderBoxWrapper>
          <ToggleTradeButton>
            <button
              className='trade-toggle-button'
              onClick={handleClickToggle}
              value='매수'
              style={{ color: isBuy ? '#f75467' : '#a4a4a4' }}
            >
              매수
            </button>
            <button
              className='trade-toggle-button'
              onClick={handleClickToggle}
              value='매도'
              style={{ color: !isBuy ? '#4386f9' : '#a4a4a4' }}
            >
              매도
            </button>
          </ToggleTradeButton>

          <form>
            <InputWrapper>
              <div className='current-currency-price'>
                현재 {currencyName}의 가격:{' '}
                {Number(currentCurrencyPrice).toLocaleString()}원
              </div>
              <div>
                <input
                  type='number'
                  placeholder='수량'
                  name='unitsTraded'
                  className='order-input'
                  min='0'
                  step='0.0001'
                  onChange={handleChangeInputValue}
                  onKeyDown={(e) => e.key === 'e' && e.preventDefault()}
                  value={unitsTraded}
                />
              </div>
              <div>
                <input
                  type='text'
                  placeholder='총액'
                  className='order-input'
                  value={total.toLocaleString()}
                  readOnly
                />
              </div>
            </InputWrapper>
          </form>

          <TradeButton
            type='button'
            className='trade-button'
            onClick={handleClickOpenTradeModal}
            style={{ backgroundColor: isBuy ? '#f75467' : '#4386f9' }}
          >
            {isBuy ? '매수하기' : '매도하기'}
          </TradeButton>
          {/* {isLoggedIn ? (
            <TradeButton
              type='button'
              className='trade-button'
              onClick={handleClickOpenTradeModal}
              style={{ backgroundColor: isBuy ? '#f75467' : '#4386f9' }}
            >
              {isBuy ? '매수하기' : '매도하기'}
            </TradeButton>
          ) : (
            <LoginButton onClick={goLogInPage}>로그인 하기</LoginButton>
          )} */}
        </OrderBoxWrapper>
      </OrderWrapper>
      {(isTrade || isComplete || isNotAuth || isFailInput || isFailTrade) && (
        <OrderModal
          onTrade={handleClickTrade}
          onClose={handleClickCloseModal}
          isTrade={isTrade}
        >
          {isTrade && (isBuy ? '매수하시겠습니까 ?' : '매도하시겠습니까 ?')}
          {isComplete &&
            (isRequest ? (
              '주문이 완료되었습니다.'
            ) : (
              <>
                <div>주문하신 수량이</div> <div>정상적으로 체결되었습니다.</div>
              </>
            ))}
          {isNotAuth && '로그인이 필요한 서비스입니다.'}
          {isFailInput &&
            (!unitsTraded < 0.0001 ? (
              <>
                <div>코인은 0.0001개부터</div> <div>주문하실 수 있습니다.</div>
              </>
            ) : (
              '수량을 입력해주세요.'
            ))}
          {isFailTrade &&
            (isBuy ? '보유 금액이 부족합니다.' : '보유 수량이 부족합니다.')}
        </OrderModal>
      )}
    </>
  );
}

const OrderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
`;
const OrderBoxWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;
const ToggleTradeButton = styled.div`
  display: flex;
  justify-content: center;

  .trade-toggle-button {
    cursor: pointer;
    margin-left: 10px;
    padding: 20px 40px 20px 40px;
    border: none;
    border-radius: 10px;
    font-size: 20px;
    font-weight: bold;
    background-color: ${WHITE};
    transition: 0.2s;
  }
  .trade-toggle-button:hover {
    font-size: 22px;
    transition: 0.2s;
  }
`;
const TradeButton = styled.button`
  cursor: pointer;
  margin-top: 30px;
  height: 80px;
  border-style: none;
  border-radius: 0.2rem;
  background-color: #f75467;
  color: ${WHITE};
  font-size: 20px;
  font-weight: bold;
  transition: 0.2s;

  :hover {
    height: 90px;
    font-size: 25px;
    transition: 0.2s;
  }
`;
const LoginButton = styled.button`
  cursor: pointer;
  margin-top: 30px;
  height: 80px;
  border-style: none;
  border-radius: 0.2rem;
  background-color: #f75467;
  color: ${WHITE};
  font-size: 20px;
  font-weight: bold;
  transition: 0.2s;

  :hover {
    height: 90px;
    font-size: 25px;
    transition: 0.2s;
  }
`;
const AssetWrapper = styled.div`
  .my-asset {
    margin-right: 20px;
    border-radius: 0.2rem;
    font-weight: bold;
    color: '#a4a4a4';
    transition: 0.2s;
  }
  .my-asset:hover {
    background-color: ${MAIN_COLOR_1};
    color: ${WHITE};
    transition: 0.2s;
  }
`;
const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  .current-currency-price {
    font-size: 20px;
    font-weight: bold;
    transition: 0.2s;
  }

  .current-currency-price:hover {
    background-color: ${MAIN_COLOR_1};
    color: ${WHITE};
    transition: 0.2s;
  }

  .order-input {
    margin-top: 30px;
    width: 350px;
    height: 50px;
    font-size: 20px;
  }
`;
