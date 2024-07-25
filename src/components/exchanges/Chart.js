import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createChart } from 'lightweight-charts';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import './chartStyle.css';
import { candleStickRequest } from '../../features/candleStick/candleStickSlice';
import { BREAK_POINT_MOBILE } from '../common/style';

export default function Chart() {
  const chartContainerRef = useRef(null);
  const dispatch = useDispatch();
  const [time] = useState('10m');
  const { currencyName } = useParams();
  const chartData = useSelector((state) => state.candleStick.candleStick);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
      width: chartContainerRef.current.clientWidth,
      height: 500,
      layout: {
        backgroundColor: '#ffffff',
        textColor: '#000',
      },
      grid: {
        vertLines: {
          color: '#e1e1e1',
        },
        horzLines: {
          color: '#e1e1e1',
        },
      },
      priceScale: {
        borderColor: '#cccccc',
      },
      timeScale: {
        borderColor: '#cccccc',
      },
    });

    const candleSeries = chart.addCandlestickSeries();

    let formattedData = chartData.map((item) => ({
      time: item.candle_date_time_kst.split('T')[0], // 날짜만 사용
      open: item.opening_price,
      high: item.high_price,
      low: item.low_price,
      close: item.trade_price,
    }));
    formattedData = formattedData.sort(
      (a, b) => new Date(a.time) - new Date(b.time)
    );

    candleSeries.setData(formattedData);

    const handleResize = () => {
      chart.resize(chartContainerRef.current.clientWidth, 500);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      chart.remove();
    };
  }, [chartData]);

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

  return (
    <>
      <ChartWrapper>
        <div
          ref={chartContainerRef}
          style={{ width: '100%', height: '500px' }}
        />
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
