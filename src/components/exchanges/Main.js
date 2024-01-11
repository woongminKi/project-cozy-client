import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-stockcharts';
import { useSelector, useDispatch } from 'react-redux';
import useCoinData from '../../hook/useCoinData';
import {
  requestCoinList,
  requestSocketData,
} from '../../features/stock/stockSlice';
// import { init, dispose, LineType } from 'klinecharts';
// import getLanguageOption from '../../utils/getLanguageOption';
// import getInitialDataList from '../../utils/getInitialDataList';
// import Layout from '../common/Layout';

const types = [
  { key: 'candle_solid', text: '캔들' },
  { key: 'candle_stroke', text: '투명 캔들' },
  { key: 'ohlc', text: 'Bar 형식의 OHLC' },
  { key: 'area', text: 'Mountain' },
];
export default function Main() {
  // let chart;
  const CanvasJS = CanvasJSReact.CanvasJS;
  const CanvasJSStockChart = CanvasJSReact.CanvasJSStockChart;
  const dispatch = useDispatch();

  const checkLogin = localStorage.getItem('accessToken');
  const [userId, setUserId] = useState('');
  const [nickName, setNickName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [initialized, setInitialized] = useState(false);
  const [coinList, setCoinList] = useState([]);
  const [searchCoin, setSearchCoin] = useState('');
  const coinData = useSelector((state) => state.stock.socketCoin);
  const tickerCoinList = useSelector((state) => state.stock.coinList);
  console.log('tickerCoinList?@?@?@?', tickerCoinList);
  // const newCoinData = useCoinData();
  // console.log('newCoinData??', newCoinData);

  useEffect(() => {
    dispatch(requestCoinList());
  }, [dispatch]);

  useEffect(() => {
    const parsedTickerCoin = JSON.parse(JSON.stringify(tickerCoinList));
    console.log('parsedTickerCoin!!!!', parsedTickerCoin);
    if (parsedTickerCoin) {
      const coinName = Object.keys(parsedTickerCoin.data.data);
      const coinInfo = Object.values(parsedTickerCoin.data.data);
      // console.log('coinName!!!!', coinName, coinName.length);
      // console.log('coinInfo!!!!', coinInfo, coinInfo.length);
      for (let i = 0; i < coinInfo.length - 1; i++) {
        if (coinInfo[i].currency_name === undefined) {
          // console.log('있어?', coinInfo[i].currency_name, i + 1, coinName[i]);
          coinInfo[i]['currency_name'] = coinName[i];
        }
      }

      setCoinList(coinInfo);
    }
  }, [tickerCoinList]);

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_SERVER_URL);

    ws.onmessage = (event) => {
      const res = JSON.parse(event.data);
      const socketCoinData = res.content;
      dispatch(requestSocketData(socketCoinData));

      ws.onerror = (error) => {
        console.error(error);
      };

      return () => {
        ws.close();
      };
    };
  }, [dispatch]);

  useEffect(() => {
    if (!checkLogin) {
      getProfile();
    }
  }, []);

  const filteredCoinList =
    searchCoin === ''
      ? coinList
      : coinList.filter((coin) => coin.currency_name === searchCoin);

  console.log('coinList??', coinList);

  coinList.forEach((coin) => {
    if (coinData.symbol) {
      if (coin.currency_name === coinData.symbol.split('_')[0]) {
        coin.closing_price = coinData.closePrice;
        coin.change_rate_24H = coinData.chgRate;
        coin.trade_value_24H = coinData.value;
      }
    }

    return coin;
  });

  const options = {
    title: {
      text: 'CanvasJS StockChart',
    },
    charts: [
      {
        data: [
          {
            type: 'line',
            dataPoints: [
              { x: new Date('2018-01-01'), y: 71 },
              { x: new Date('2018-02-01'), y: 55 },
              { x: new Date('2018-03-01'), y: 50 },
              { x: new Date('2018-04-01'), y: 65 },
              { x: new Date('2018-05-01'), y: 95 },
              { x: new Date('2018-06-01'), y: 68 },
              { x: new Date('2018-07-01'), y: 28 },
              { x: new Date('2018-08-01'), y: 34 },
              { x: new Date('2018-09-01'), y: 14 },
              { x: new Date('2018-10-01'), y: 71 },
              { x: new Date('2018-11-01'), y: 55 },
              { x: new Date('2018-12-01'), y: 50 },
              { x: new Date('2019-01-01'), y: 34 },
              { x: new Date('2019-02-01'), y: 50 },
              { x: new Date('2019-03-01'), y: 50 },
              { x: new Date('2019-04-01'), y: 95 },
              { x: new Date('2019-05-01'), y: 68 },
              { x: new Date('2019-06-01'), y: 28 },
              { x: new Date('2019-07-01'), y: 34 },
              { x: new Date('2019-08-01'), y: 65 },
              { x: new Date('2019-09-01'), y: 55 },
              { x: new Date('2019-10-01'), y: 71 },
              { x: new Date('2019-11-01'), y: 55 },
              { x: new Date('2019-12-01'), y: 50 },
            ],
          },
        ],
      },
    ],
    navigator: {
      slider: {
        minimum: new Date('2018-07-01'),
        maximum: new Date('2019-06-30'),
      },
    },
  };

  const containerProps = {
    width: '80%',
    height: '450px',
    margin: '82px 0 0 0',
  };

  const getProfile = async () => {
    try {
      const data = await window.Kakao.API.request({
        url: '/v2/user/me',
      });
      console.log('profile data?', data);
      setUserId(data.id);
      setNickName(data.properties.nickname);
      setProfileImage(data.properties.profile_image);
    } catch (err) {
      console.log('Get profile Error:', err);
    }
  };

  // useEffect(() => {
  //   // chart = init('coin-chart');
  //   // chart.setStyleOptions(getLanguageOption());

  //   chart = init('real-time-k-line', {
  //     styles: { grid: { horizontal: { style: LineType.Dashed } } },
  //   });

  //   const fetchData = async () => {
  //     const dataList = await getInitialDataList(1);
  //     // chart.applyNewData(dataList);
  //     chart?.applyNewData(dataList);
  //     setInitialized(true);
  //   };
  //   fetchData();

  //   return () => {
  //     dispose(chart);
  //   };
  // }, []);

  // useEffect(() => {
  //   chart = init('coin-chart');
  //   if (initialized) {
  //     chart.updateData(newCoinData);
  //   }
  // }, []);

  return (
    <>
      {/* <CanvasJSStockChart
        className='canvas-chart'
        options={options}
        containerProps={containerProps}
      /> */}

      {filteredCoinList.map((coin) => {
        return (
          <div>
            {coin.currency_name}
            {coin.closing_price}
          </div>
        );
      })}
    </>
  );

  // return (
  //   <Layout title='Bitcoin(BTC-KRW) 실시간 가격 조회'>
  //     <div id='coin-chart' className='coin-chart' />
  //     <div className='chart-menu-container'>
  //       {types.map(({ key, text }) => {
  //         return (
  //           <button
  //             key={key}
  //             onClick={(_) => {
  //               chart &&
  //                 chart.setStyles({
  //                   candle: {
  //                     type: key,
  //                   },
  //                 });
  //             }}
  //           >
  //             {text}
  //           </button>
  //         );
  //       })}
  //     </div>
  //   </Layout>
  // );
}
