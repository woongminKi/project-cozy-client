import React, { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { createChart } from 'lightweight-charts';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import './chartStyle.css';
import { candleStickRequest } from '../../features/candleStick/candleStickSlice';
import { BREAK_POINT_MOBILE, MAIN_COLOR_1 } from '../common/style';

export default function Chart() {
  const chartContainerRef = useRef(null);
  const dispatch = useDispatch();
  const [time] = useState('10m');
  const { currencyName } = useParams();
  const chartData = useSelector((state) => state.candleStick.candleStick);
  const [activeButton, setActiveButton] = useState('1day');

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

  const handleToggle = (id) => {
    setActiveButton(id);
  };

  return (
    <>
      <ChartWrapper>
        <ChartButtonWapper>
          <div>Time</div>
          <ChartButton
            className={activeButton === '1min' ? 'active' : ''}
            id='1min'
            onClick={() => handleToggle('1min')}
          >
            1min
          </ChartButton>
          <ChartButton
            className={activeButton === '1day' ? 'active' : ''}
            id='1day'
            onClick={() => handleToggle('1day')}
          >
            1Day
          </ChartButton>
          <ChartButton
            className={activeButton === '1week' ? 'active' : ''}
            id='1week'
            onClick={() => handleToggle('1week')}
          >
            1Week
          </ChartButton>
          <ChartButton
            className={activeButton === '1month' ? 'active' : ''}
            id='1month'
            onClick={() => handleToggle('1month')}
          >
            1Month
          </ChartButton>
        </ChartButtonWapper>
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
  display: flex;
  justify-content: center;
  flex-direction: column;
  margin-top: 100px;
  margin-bottom: 24px;

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

const ChartButtonWapper = styled.div`
  display: flex;
  align-items: center;
  div {
    margin-right: 8px;
  }
`;

const ChartButton = styled.button`
  min-width: 0px;
  margin-right: 8px;
  background-color: #fff;
  border: none;
  border-radius: 2px;
  cursor: pointer;
  font-size: 12px;
  line-height: 16px;
  padding: 4px;

  &.active {
    color: ${MAIN_COLOR_1} !important;
  }
`;
