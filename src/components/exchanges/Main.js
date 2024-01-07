import React, { useState, useEffect } from 'react';
import CanvasJSReact from '@canvasjs/react-stockcharts';
import { useSelector, useDispatch } from 'react-redux';
import { init, dispose, LineType } from 'klinecharts';
import useCoinData from '../../hook/useCoinData';
import getLanguageOption from '../../utils/getLanguageOption';
import getInitialDataList from '../../utils/getInitialDataList';
import Layout from '../common/Layout';

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

  const checkLogin = localStorage.getItem('accessToken');
  const [userId, setUserId] = useState('');
  const [nickName, setNickName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [initialized, setInitialized] = useState(false);
  const dispatch = useDispatch();
  // const newCoinData = useCoinData();
  // console.log('newCoinData??', newCoinData);

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

  useEffect(() => {
    if (checkLogin) {
      getProfile();
    }
  }, []);

  return (
    <>
      <CanvasJSStockChart
        className='canvas-chart'
        options={options}
        containerProps={containerProps}
      />
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
