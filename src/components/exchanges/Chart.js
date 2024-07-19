import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Highcharts from 'highcharts/highstock';
import { useParams } from 'react-router-dom';
import HighchartsReact from 'highcharts-react-official';
import styled from 'styled-components';
import './chartStyle.css';
import { candleStickRequest } from '../../features/candleStick/candleStickSlice';
import { BREAK_POINT_MOBILE } from '../common/style';

export default function Chart() {
  const dispatch = useDispatch();
  // const [time, setTime] = useState('10m');
  const [time] = useState('10m');
  const { currencyName } = useParams();
  const chartData = useSelector((state) => state.candleStick.candleStick);

  useEffect(() => {
    let setTimeoutID = null;
    const fetchData = function () {
      setTimeoutID = setTimeout(() => {
        dispatch(candleStickRequest({ currencyName, time }));

        fetchData();
      }, 1000);
    };
    fetchData();

    return () => {
      clearTimeout(setTimeoutID);
    };
  }, [currencyName, dispatch, time]);

  const ohlc = [];
  const volume = [];
  const groupingUnits = [
    ['minute', [5, 10, 30, 60]],
    ['hour', [1, 2, 4, 6, 12, 24]],
    ['day', [1]],
    ['week', [1]],
    ['month', [1, 2, 3, 6]],
  ];

  for (let i = 0; i < chartData.length; i++) {
    ohlc.push([
      chartData[i][0] + 32400000,
      Number(chartData[i][1]),
      Number(chartData[i][2]),
      Number(chartData[i][3]),
      Number(chartData[i][4]),
    ]);
    volume.push([chartData[i][0] + 32400000, Number(chartData[i][5])]);
  }

  const options = {
    rangeSelector: {
      buttons: [
        {
          type: 'hour',
          count: 1,
          text: '1시간',
        },
        {
          type: 'day',
          count: 1,
          text: '1일',
        },
        {
          type: 'day',
          count: 7,
          text: '7일',
        },
        {
          type: 'month',
          count: 1,
          text: '1달',
        },
        {
          type: 'year',
          count: 1,
          text: '1년',
        },
        {
          type: 'all',
          text: 'All',
        },
      ],
    },
    yAxis: [
      {
        startOnTick: false,
        endOnTick: false,
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: currencyName,
        },
        height: '60%',
        lineWidth: 2,
        resize: {
          enabled: true,
        },
      },
      {
        labels: {
          align: 'right',
          x: -3,
        },
        title: {
          text: '거래량',
        },
        top: '65%',
        height: '35%',
        offset: 0,
        lineWidth: 2,
      },
    ],
    tooltip: {
      split: true,
    },
    plotOptions: {
      series: {
        dataGrouping: {
          units: groupingUnits,
        },
      },
    },
    title: {
      text: currencyName,
    },
    series: [
      {
        type: 'candlestick',
        name: 'Bitcoin',
        id: 'coin',
        zIndex: 2,
        data: ohlc,
      },
      {
        type: 'column',
        name: 'Volume',
        id: 'volume',
        data: volume,
        yAxis: 1,
      },
    ],
    chart: {
      animation: false,
      styledMode: true,
    },
  };

  return (
    <>
      <ChartWrapper>
        <div className='date-selector'>
          <HighchartsReact
            highcharts={Highcharts}
            constructorType={'stockChart'}
            options={options}
          />
        </div>
      </ChartWrapper>
    </>
  );
}

const ChartWrapper = styled.div`
  width: 100%;
  height: 100vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-right: 24px;

  .date-selector {
    // margin: 227px 24px 50px 0px;
  }

  .highcharts-container {
    display: flex;
    justify-content: center;
  }

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    width: 100%;
    height: unset;

    .date-selector {
      margin: 90px 0px 24px 0px;
    }
  }
`;
