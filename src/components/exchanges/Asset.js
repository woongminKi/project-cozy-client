import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useNavigate } from 'react-router-dom';
import { RED, BLUE, BREAK_POINT_MOBILE } from '../common/style';
import { requestCoinList } from '../../features/stock/stockSlice';
import Chart from 'chart.js/auto';

export default function Asset() {
  const dispatch = useDispatch();
  const chartRef = useRef(null);
  const navigate = useNavigate();
  const tickerCoinList = useSelector((state) => state.stock.coinList);
  const ownedCoinList = useSelector((state) => state.user);
  const [coinList, setCoinList] = useState([]);
  const [newCoinList, setNewCoinList] = useState([]);
  const [socketData, setSocketData] = useState('');
  const [coinData, setCoinData] = useState({});

  useEffect(() => {
    dispatch(requestCoinList());
  }, [dispatch]);

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_SERVER_URL);

    ws.onmessage = (event) => {
      const res = JSON.parse(event.data);
      const socketCoinData = res.content;
      setCoinData(socketCoinData);
      const socketCoinName = socketCoinData.symbol.split('_')[0];
      const socketCoinCurrentPrice = socketCoinData.closePrice;
      const socketCoinObj = {
        name: socketCoinName,
        price: socketCoinCurrentPrice,
      };

      setSocketData(socketCoinObj);
    };

    ws.onerror = (error) => {
      console.error(error);
    };

    return () => {
      ws.close();
    };
  }, [dispatch]);

  useEffect(() => {
    const parsedTickerCoin = JSON.parse(JSON.stringify(tickerCoinList));
    if (parsedTickerCoin) {
      const coinName = Object.keys(parsedTickerCoin.data.data);
      let coinInfo = Object.values(parsedTickerCoin.data.data);
      for (let i = 0; i < coinInfo.length - 1; i++) {
        if (coinInfo[i].currency_name === undefined) {
          coinInfo[i]['currency_name'] = coinName[i];
        }
      }
      coinInfo = coinInfo.slice(0, coinInfo.length - 1);
      setCoinList(coinInfo);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [coinData]);

  useEffect(() => {
    if (ownedCoinList.coins.length > 0) {
      const { coins } = ownedCoinList;
      setNewCoinList(coins);
    }
  }, [ownedCoinList]);

  let filteredCoinList = [];
  for (let i = 0; i < newCoinList.length; i++) {
    for (let j = 0; j < coinList.length - 1; j++) {
      if (coinList[j].currency_name === newCoinList[i].currencyName) {
        coinList[j].orderPrice = newCoinList[i].orderPrice;
        coinList[j].bought_price = newCoinList[i].price;
        coinList[j].transactionDate = newCoinList[i].transactionDate;
        coinList[j].quantity = newCoinList[i].unitsTraded;
        coinList[j].averagePrice =
          newCoinList[i].unitsTraded * newCoinList[i].price;

        if (coinList[j].currency_name === socketData.name) {
          coinList[j].current_price = socketData.price;
          coinList[j].evaluate_price =
            newCoinList[i].unitsTraded * socketData.price;
          coinList[j].evaluate_profit =
            coinList[j].quantity * socketData.price - newCoinList[i].price;
          coinList[j].yield_rate =
            ((coinList[j].quantity * socketData.price - newCoinList[i].price) /
              newCoinList[i].price) *
            100;
        } else {
          coinList[j].evaluate_price =
            newCoinList[i].unitsTraded * coinList[j].closing_price;
          coinList[j].evaluate_profit =
            newCoinList[i].unitsTraded * coinList[j].closing_price -
            newCoinList[i].price;
          coinList[j].yield_rate =
            ((newCoinList[i].unitsTraded * coinList[j].closing_price -
              newCoinList[i].price) /
              newCoinList[i].price) *
            100;
        }

        filteredCoinList.push(coinList[j]);
      }
    }
  }

  useEffect(() => {
    const totalUnits = ownedCoinList.coins.reduce((acc, transaction) => {
      const { currencyName, unitsTraded } = transaction;

      if (!acc[currencyName]) {
        acc[currencyName] = 0;
      }

      acc[currencyName] += unitsTraded;
      return acc;
    }, {});

    // const totalFilteredCoinList = filteredCoinList.reduce(
    //   (acc, transaction) => {
    //     const {
    //       currency_name,
    //       quantity,
    //       evaluate_profit,
    //       yield_rate,
    //       averagePrice,
    //       evaluate_price,
    //       bought_price,
    //     } = transaction;

    //     if (!acc[currency_name]) {
    //       acc[currency_name] = 0;
    //     }
    //     console.log('!@!@!', acc[currency_name]);
    //     acc[currency_name] += quantity;
    //     acc[currency_name] += evaluate_profit;
    //     return acc;
    //   },
    //   {}
    // );

    if (filteredCoinList.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      // eslint-disable-next-line react-hooks/exhaustive-deps
      new Chart(ctx, {
        type: 'pie',
        data: {
          labels: Object.keys(totalUnits),
          datasets: [
            {
              label: '보유자산 포트폴리오',
              data: Object.values(totalUnits),
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)',
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
              ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'right',
            },
            tooltip: {
              enabled: true,
              callbacks: {
                label: function (tooltipItem) {
                  var label = tooltipItem.label || '';
                  if (label) {
                    label += ': ';
                  }
                  label += parseFloat(tooltipItem.dataset.data[0]).toFixed(5);
                  return label;
                },
              },
            },
          },
        },
      });
    }
  }, [filteredCoinList.length]);

  const goToMain = () => {
    navigate('/');
  };

  // console.log('filteredCoinList?', filteredCoinList);
  return (
    <>
      <AssetWrapper>
        <PieChartDiv>
          <canvas ref={chartRef} />
        </PieChartDiv>
        {ownedCoinList.coins.length > 0 ? (
          filteredCoinList.map((coinElements) => {
            return (
              // <ContentsWrapper key={coinElements.currency_name}>
              <ContentsWrapper>
                <ContentsHeader>
                  <div>{coinElements.currency_name}</div>
                  <div>
                    <EvaluationProfit>
                      <ContentsHeaderTitle>평가 손익</ContentsHeaderTitle>{' '}
                      <div>
                        {coinElements.orderPrice ? (
                          coinElements.orderPrice -
                            coinElements.evaluate_price >
                          0 ? (
                            <Red>
                              {(
                                coinElements.orderPrice -
                                coinElements.evaluate_price
                              ).toLocaleString()}
                              원
                            </Red>
                          ) : (
                            <Blue>
                              {(
                                coinElements.orderPrice -
                                coinElements.evaluate_price
                              ).toLocaleString()}
                              원
                            </Blue>
                          )
                        ) : (
                          `${(coinElements.orderPrice = 0)}원`
                        )}
                      </div>
                    </EvaluationProfit>
                    <ProfitRate>
                      <ContentsHeaderTitle>수익률</ContentsHeaderTitle>{' '}
                      {coinElements.yield_rate !== 0 ? (
                        100 + coinElements.yield_rate > 0 ? (
                          <Red>
                            {(100 + coinElements.yield_rate).toFixed(2)}%
                          </Red>
                        ) : (
                          <Blue>
                            {(100 + coinElements.yield_rate).toFixed(2)}%
                          </Blue>
                        )
                      ) : (
                        `${(coinElements.yield_rate = 0)}%`
                      )}
                    </ProfitRate>
                  </div>
                </ContentsHeader>

                <ContentsBody>
                  <ContentsBody1>
                    <ContentsBodyElements>
                      <div style={{ marginRight: '8px' }}>보유 수량</div>{' '}
                      {`${coinElements.quantity}개`}
                    </ContentsBodyElements>
                    <ContentsBodyElements>
                      <div style={{ marginRight: '8px' }}>평균 매수가</div>{' '}
                      {coinElements.averagePrice.toLocaleString()}원
                    </ContentsBodyElements>
                  </ContentsBody1>
                  <ContentsBody2>
                    <ContentsBodyElements>
                      <div style={{ marginRight: '8px' }}>평가 금액</div>{' '}
                      {coinElements.evaluate_price !== 0
                        ? `${coinElements.evaluate_price.toLocaleString()}원`
                        : `${(coinElements.evaluate_price = 0)}원`}
                    </ContentsBodyElements>
                    <ContentsBodyElements>
                      <div style={{ marginRight: '8px' }}>매수 금액</div>{' '}
                      {(
                        coinElements.quantity * coinElements.orderPrice
                      ).toLocaleString()}
                      원
                    </ContentsBodyElements>
                  </ContentsBody2>
                </ContentsBody>
              </ContentsWrapper>
            );
          })
        ) : (
          <EmptyContentsWrapper>
            <div>보유한 코인이 없습니다.</div>
            <MoveBtn onClick={goToMain}>메인 페이지로 이동</MoveBtn>
          </EmptyContentsWrapper>
        )}
      </AssetWrapper>
    </>
  );
}

const AssetWrapper = styled.div`
  margin-top: 98px;

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    margin-top: 94px;
  }
`;

const PieChartDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  canvas {
    width: 300px !important;
    height: 300px !important;
  }
`;

const ContentsWrapper = styled.div`
  padding: 16px;
  border-top: 1px solid #dcdcdc;

  &:last-child {
    border-bottom: 1px solid #dcdcdc;
  }
`;

const ContentsHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 8px;
`;

const ContentsHeaderTitle = styled.div`
  // width: 100%;
  margin-right: 4px;
  text-align: center;
`;

const EvaluationProfit = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;
const ProfitRate = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const ContentsBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ContentsBody1 = styled.div`
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: space-around;
`;
const ContentsBody2 = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;
  justify-content: space-around;
`;
const ContentsBodyElements = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`;

const Red = styled.div`
  color: ${RED};
`;

const Blue = styled.div`
  color: ${BLUE};
`;

const EmptyContentsWrapper = styled.div`
  text-align: center;
`;

const MoveBtn = styled.button`
  width: 300px;
  height: 48px;
  margin-top: 24px;
  border: none;
  border-radius: 24px;
  background: #ebebeb;
  cursor: pointer;
`;
