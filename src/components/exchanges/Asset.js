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
  var myChart;
  // const tickerCoinList = useSelector((state) => state.stock.coinList.data.data);

  let ownedCoinList = localStorage.getItem('order');
  if (!ownedCoinList) {
    ownedCoinList = [];
  } else {
  }

  const [coinList, setCoinList] = useState([]);
  const [newCoinList, setNewCoinList] = useState([]);
  const [socketData, setSocketData] = useState('');
  const [coinData, setCoinData] = useState({});
  // const coinObj = {
  //   BTC: '비트코인',
  //   SOFI: '라이파이낸스',
  //   ETH: '이더리움',
  //   SOL: '솔라나',
  //   ETC: '이더리움 클래식',
  //   XRP: '리플',
  //   USDT: '테더',
  //   ARB: '아비트럼',
  //   SEI: '세이',
  //   BSV: '비트코인에스브이',
  //   STX: '스택스',
  //   ADA: '에이다',
  //   LINK: '체인링크',
  //   SUI: '수이',
  //   BCH: '비트코인 캐시',
  //   BTG: '비트코인 골드',
  //   BLUR: '블러',
  //   MATIC: '폴리곤',
  //   DOGE: '도지코인',
  //   WEMIX: '위믹스',
  //   WLD: '월드코인',
  //   ZBC: '지벡',
  //   TIA: '셀레스티아',
  //   OP: '옵티미즘',
  //   SAND: '샌드박스',
  //   DOT: '폴카닷',
  //   KLAY: '클레이튼',
  //   ASTR: '아스타',
  //   AVAX: '아발란체',
  //   REQ: '리퀘스트',
  //   ROA: '로아코어',
  //   T: '쓰레스홀드',
  //   XEC: '이캐시',
  //   ACE: '퓨저니스트',
  //   BIGTIME: '빅타임',
  //   EOS: '이오스',
  //   AXS: '엑시인피니티',
  //   GMT: '스테픈',
  //   TRX: '트론',
  //   ALEX: '알렉스',
  //   POWR: '파워렛저',
  //   GXA: '갤럭시아',
  //   STRAX: '스트라티스',
  //   PENDLE: '펜들',
  //   YFI: '연파이낸스',
  //   QTUM: '퀀텀',
  //   ALT: '아치루트',
  //   GHX: '게이머코인',
  //   POLA: '폴라리스 쉐어',
  //   USDC: '유에싀코인',
  //   AGI: '델리시움',
  //   XLM: '스텔라루멘',
  //   LDO: '리도다오',
  //   APT: '앱토스',
  //   MINA: '미나',
  //   SHIB: '시바이누',
  //   BOBA: '보바토큰',
  //   IMX: '이뮤터블엑스',
  //   VELO: '벨로프로토콜',
  //   INJ: '인젝티브',
  //   ALGO: '알고랜드',
  //   FNSA: '핀시아',
  //   RPL: '로켓풀',
  //   WNCG: '랩트 나인 크로니클 골드',
  //   FLZ: '펠라즈',
  //   GALA: '갈라',
  //   MASK: '마스크네트워크',
  //   ATOM: '코스모스',
  //   WOM: '왐토큰',
  //   MAP: '맵프로토콜',
  //   BTT: '비트토렌트',
  //   IOTX: '아이오텍스',
  //   CTC: '크레딧코인',
  //   AAVE: '에이브',
  //   MAV: '매버릭 프로토콜',
  //   YGG: '일드길드게임즈',
  //   GRT: '더그래프',
  //   TAVA: '알타바',
  //   NMR: '뉴메레르',
  //   VET: '비체인',
  //   EVER: '에버스케일',
  //   WAVES: '웨이브',
  //   GAL: '갤럭시',
  //   SNX: '신세틱스',
  //   WAXL: '엑셀라',
  //   RNDR: '렌더토큰',
  //   ZTX: '지티엑스',
  //   CELO: '셀로',
  //   EGLD: '멀티버스엑스',
  //   MANA: '디센트럴랜드',
  //   ZIL: '질리카',
  //   MTL: '메탈',
  //   LEVER: '레버파이',
  //   '1INCH': '1인치',
  //   CTXC: '코르텍스',
  //   FET: '페치',
  //   WAXP: '왁스',
  //   LPT: '라이브피어',
  //   ENTC: '엔터버튼',
  //   ARKM: '아캄',
  //   LBL: '레이블',
  //   FLOW: '플로우',
  //   MLK: '밀크',
  //   PEPE: '페페',
  //   LOOM: '룸네트워크',
  //   SXP: '솔라',
  //   ORBS: '오브스',
  //   CHR: '크로미아',
  //   HIGH: '하이스트리트',
  //   APM: '에이피엠 코인',
  //   SNT: '스테이터스네트워크토큰',
  //   ELF: '엘프',
  //   CRTS: '크라토스',
  //   MBX: '마브렉스',
  //   KNC: '카이버 네트워크',
  //   ANV: '애니버스',
  //   BNB: '비앤비',
  //   BAL: '밸런서',
  //   STORJ: '스토리지',
  //   MIX: '믹스마블',
  //   LRC: '루프링',
  //   ACH: '알케미페이',
  //   COMP: '컴파운드',
  //   ARPA: '알파',
  //   ONG: '온톨로지가스',
  //   OAS: '오아시스',
  //   CTK: '센투',
  //   ORC: '오르빗 체인',
  //   ID: '스페이스 아이디',
  //   RVN: '레이븐코인',
  //   ANKR: '앵커',
  //   MKR: '메이커',
  //   APE: '에이프코인',
  //   WOO: '우네트워크',
  //   RSR: '리저브라이트',
  //   SUSHI: '스시스왑',
  //   FITFI: '스텝앱',
  //   OSMO: '오스모시스',
  //   LM: '레저메타',
  //   RDNT: '라디언트 캐피탈',
  //   MXC: '머신익스체인지코인',
  //   ASM: '어셈블프로토콜',
  //   CFX: '콘플럭스',
  //   ICX: '아이콘',
  //   PYR: '불칸 포지드',
  //   KSM: '쿠사마',
  //   PUNDIX: '펀디엑스',
  //   TFUEL: '쎄타퓨엘',
  //   UMA: '우마',
  //   CYBER: '사이버커넥트',
  //   EDU: '오픈 캠퍼스',
  //   BORA: '보라',
  //   JOE: '트레이더 조',
  //   MBL: '무비블록',
  //   VRA: '베라시티',
  //   CSPR: '캐스퍼',
  //   CTSI: '카르테시',
  //   DAO: '다오메이커',
  //   AGIX: '싱귤래리티넷',
  //   XTZ: '테조스',
  //   ZRX: '제로엑스',
  //   DYDX: '디와이디엑스',
  //   VIX: '빅스코',
  //   GLM: '골렘',
  //   XVS: '비너스',
  //   FRONT: '프론티어',
  //   IOST: '이오스트',
  //   HIVE: '하이브',
  //   STEEM: '스팀',
  //   EVZ: '이브이지',
  //   NPT: '네오핀',
  //   FANC: '팬시',
  //   DAI: '다이',
  //   STG: '스타게이트 파이낸스',
  //   BAT: '베이지거텐션토큰',
  //   UNI: '유니스왑',
  //   ENJ: '엔진코인',
  //   STPT: '에스티피',
  //   STMX: '스톰엑스',
  //   CAKE: '팬케이크스왑',
  //   C98: '코인98',
  //   THTA: '쎄타토큰',
  //   XPLA: '엑스플라',
  //   HOOK: '훅트 프로토콜',
  //   OBSR: '옵저버',
  //   RLC: '아이젝',
  //   CHZ: '칠리즈',
  //   SPURS: '토트넘 홋스퍼',
  //   RLY: '랠리',
  //   GRND: '슈퍼워크',
  //   OXT: '오키드',
  //   STAT: '스탯',
  //   HBAR: '헤데라',
  //   FXS: '프랙스 셰어',
  //   RSS3: '알에스에스쓰리',
  //   FTM: '팬텀',
  //   OCEAN: '오션프로토콜',
  //   HIFI: '하이파이',
  //   OGN: '오리진프로토콜',
  //   AZIT: '아지트',
  //   ILV: '일루비움',
  //   EGG: '네스트리',
  //   GRACY: '그레이시',
  //   MOC: '모스코인',
  //   WIKEN: '위드',
  //   ADP: '어댑터 토큰',
  //   BEL: '벨라프로토콜',
  //   ONT: '온톨로지',
  //   MVC: '마일버스',
  //   API3: '에이피아이쓰리',
  //   UOS: '울트라',
  //   XCN: '오닉스코인',
  //   MEV: '미버스',
  //   DVI: '디비전',
  //   NCT: '폴리스웜',
  //   FLOKI: '플로키',
  //   AQT: '알파쿼크',
  //   BOA: '보아',
  //   VALOR: '밸러토큰',
  //   XPR: '프로톤',
  //   CRO: '크로노스',
  //   FX: '펑션엑스',
  //   HFT: '해시플로우',
  //   GMX: '지엠엑스',
  //   EL: '엘리시아',
  //   ALICE: '마이네이버앨리스',
  //   AUDIO: '오디우스',
  //   COS: '콘텐토스',
  //   JST: '저스트',
  //   BNT: '뱅코르',
  //   FLR: '플레어',
  //   PLA: '플레이댑',
  //   AMO: '아모코인',
  //   CON: '코넌',
  //   CRV: '커브',
  //   QTCON: '퀴즈톡',
  //   JASMY: '재스미코인',
  //   META: '메타디움',
  //   SIX: '식스',
  //   REI: '레이',
  //   FLUX: '플럭스',
  //   FCT2: '피르마체인',
  //   ACS: '액세스프로토콜',
  //   BFC: '바이프로스트',
  //   SUN: '썬',
  //   TDROP: '티드랍',
  //   NFT: '에이피이앤에프티',
  //   COTI: '코티',
  //   BLY: '블로서리',
  //   TEMCO: '템코',
  //   DAR: '마인즈 오브 달라니아',
  //   CKB: '너보스',
  //   SFP: '세이프팔',
  //   FIT: '300피트 네트워크',
  //   BIOT: '바이오패스포트',
  //   ONIT: '온버프',
  //   AERGO: '아르고',
  //   SSX: '썸씽',
  //   MED: '메디블록',
  //   SWAP: '트러스트스왑',
  //   CELR: '셀러네트워크',
  // };

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
    if (ownedCoinList.length > 0) {
      const parsedCoinList = JSON.parse(ownedCoinList);
      const { coins } = parsedCoinList.asset;
      // console.log('coins??', coins);
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
    if (filteredCoinList.length > 0) {
      const ctx = chartRef.current.getContext('2d');

      // 기존 차트가 존재하면 삭제
      if (myChart) {
        myChart.destroy();
      }

      // eslint-disable-next-line react-hooks/exhaustive-deps
      myChart = new Chart(ctx, {
        type: 'pie',
        data: {
          // labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          labels: [filteredCoinList[0].currency_name],
          datasets: [
            {
              label: '보유자산 포트폴리오',
              // data: [12, 19, 3, 5, 2, 3],
              data: [filteredCoinList[0].quantity],
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

  return (
    <>
      <AssetWrapper>
        <PieChartDiv>
          <canvas ref={chartRef} />
        </PieChartDiv>
        {ownedCoinList.length > 0 ? (
          filteredCoinList.map((coinElements) => {
            return (
              // <ContentsWrapper key={coinElements.currency_name}>
              <ContentsWrapper>
                <ContentsHeader>
                  <div>
                    {coinElements.currency_name} (
                    {coinElements.currency_kr_name})
                  </div>
                  <div>
                    <EvaluationProfit>
                      <ContentsHeaderTitle>평가 손익</ContentsHeaderTitle>{' '}
                      <div>
                        {coinElements.evaluate_profit ? (
                          coinElements.evaluate_profit > 0 ? (
                            <Red>
                              {coinElements.evaluate_profit.toLocaleString()}원
                            </Red>
                          ) : (
                            <Blue>
                              {coinElements.evaluate_profit.toLocaleString()}원
                            </Blue>
                          )
                        ) : (
                          `${(coinElements.evaluate_profit = 0)}원`
                        )}
                      </div>
                    </EvaluationProfit>
                    <ProfitRate>
                      <ContentsHeaderTitle>수익률</ContentsHeaderTitle>{' '}
                      {coinElements.evaluate_profit !== 0 ? (
                        coinElements.evaluate_profit > 0 ? (
                          <Red>{coinElements.yield_rate.toFixed(2)}%</Red>
                        ) : (
                          <Blue>{coinElements.yield_rate.toFixed(2)}%</Blue>
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
                      {coinElements.bought_price.toLocaleString()}원
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
  align-items: center;
  flex-direction: column;
  justify-content: space-around;
`;
const ContentsBody2 = styled.div`
  display: flex;
  align-items: center;
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
