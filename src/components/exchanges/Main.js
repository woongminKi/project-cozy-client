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
  const coinObj = {
    BTC: '비트코인',
    SOFI: '라이파이낸스',
    ETH: '이더리움',
    SOL: '솔라나',
    ETC: '이더리움 클래식',
    XRP: '리플',
    USDT: '테더',
    ARB: '아비트럼',
    SEI: '세이',
    BSV: '비트코인에스브이',
    STX: '스택스',
    ADA: '에이다',
    LINK: '체인링크',
    SUI: '수이',
    BCH: '비트코인 캐시',
    BTG: '비트코인 골드',
    BLUR: '블러',
    MATIC: '폴리곤',
    DOGE: '도지코인',
    WEMIX: '위믹스',
    WLD: '월드코인',
    ZBC: '지벡',
    TIA: '셀레스티아',
    OP: '옵티미즘',
    SAND: '샌드박스',
    DOT: '폴카닷',
    KLAY: '클레이튼',
    ASTR: '아스타',
    AVAX: '아발란체',
    REQ: '리퀘스트',
    ROA: '로아코어',
    T: '쓰레스홀드',
    XEC: '이캐시',
    ACE: '퓨저니스트',
    BIGTIME: '빅타임',
    EOS: '이오스',
    AXS: '엑시인피니티',
    GMT: '스테픈',
    TRX: '트론',
    ALEX: '알렉스',
    POWR: '파워렛저',
    GXA: '갤럭시아',
    STRAX: '스트라티스',
    PENDLE: '펜들',
    YFI: '연파이낸스',
    QTUM: '퀀텀',
    ALT: '아치루트',
    GHX: '게이머코인',
    POLA: '폴라리스 쉐어',
    USDC: '유에싀코인',
    AGI: '델리시움',
    XLM: '스텔라루멘',
    LDO: '리도다오',
    APT: '앱토스',
    MINA: '미나',
    SHIB: '시바이누',
    BOBA: '보바토큰',
    IMX: '이뮤터블엑스',
    VELO: '벨로프로토콜',
    INJ: '인젝티브',
    ALGO: '알고랜드',
    FNSA: '핀시아',
    RPL: '로켓풀',
    WNCG: '랩트 나인 크로니클 골드',
    FLZ: '펠라즈',
    GALA: '갈라',
    MASK: '마스크네트워크',
    ATOM: '코스모스',
    WOM: '왐토큰',
    MAP: '맵프로토콜',
    BTT: '비트토렌트',
    IOTX: '아이오텍스',
    CTC: '크레딧코인',
    AAVE: '에이브',
    MAV: '매버릭 프로토콜',
    YGG: '일드길드게임즈',
    GRT: '더그래프',
    TAVA: '알타바',
    NMR: '뉴메레르',
    VET: '비체인',
    EVER: '에버스케일',
    WAVES: '웨이브',
    GAL: '갤럭시',
    SNX: '신세틱스',
    WAXL: '엑셀라',
    RNDR: '렌더토큰',
    ZTX: '지티엑스',
    CELO: '셀로',
    EGLD: '멀티버스엑스',
    MANA: '디센트럴랜드',
    ZIL: '질리카',
    MTL: '메탈',
    LEVER: '레버파이',
    '1INCH': '1인치',
    CTXC: '코르텍스',
    FET: '페치',
    WAXP: '왁스',
    LPT: '라이브피어',
    ENTC: '엔터버튼',
    ARKM: '아캄',
    LBL: '레이블',
    FLOW: '플로우',
    MLK: '밀크',
    PEPE: '페페',
    LOOM: '룸네트워크',
    SXP: '솔라',
    ORBS: '오브스',
    CHR: '크로미아',
    HIGH: '하이스트리트',
    APM: '에이피엠 코인',
    SNT: '스테이터스네트워크토큰',
    ELF: '엘프',
    CRTS: '크라토스',
    MBX: '마브렉스',
    KNC: '카이버 네트워크',
    ANV: '애니버스',
    BNB: '비앤비',
    BAL: '밸런서',
    STORJ: '스토리지',
    MIX: '믹스마블',
    LRC: '루프링',
    ACH: '알케미페이',
    COMP: '컴파운드',
    ARPA: '알파',
    ONG: '온톨로지가스',
    OAS: '오아시스',
    CTK: '센투',
    ORC: '오르빗 체인',
    ID: '스페이스 아이디',
    RVN: '레이븐코인',
    ANKR: '앵커',
    MKR: '메이커',
    APE: '에이프코인',
    WOO: '우네트워크',
    RSR: '리저브라이트',
    SUSHI: '스시스왑',
    FITFI: '스텝앱',
    OSMO: '오스모시스',
    LM: '레저메타',
    RDNT: '라디언트 캐피탈',
    MXC: '머신익스체인지코인',
    ASM: '어셈블프로토콜',
    CFX: '콘플럭스',
    ICX: '아이콘',
    PYR: '불칸 포지드',
    KSM: '쿠사마',
    PUNDIX: '펀디엑스',
    TFUEL: '쎄타퓨엘',
    UMA: '우마',
    CYBER: '사이버커넥트',
    EDU: '오픈 캠퍼스',
    BORA: '보라',
    JOE: '트레이더 조',
    MBL: '무비블록',
    VRA: '베라시티',
    CSPR: '캐스퍼',
    CTSI: '카르테시',
    DAO: '다오메이커',
    AGIX: '싱귤래리티넷',
    XTZ: '테조스',
    ZRX: '제로엑스',
    DYDX: '디와이디엑스',
    VIX: '빅스코',
    GLM: '골렘',
    XVS: '비너스',
    FRONT: '프론티어',
    IOST: '이오스트',
    HIVE: '하이브',
    STEEM: '스팀',
    EVZ: '이브이지',
    NPT: '네오핀',
    FANC: '팬시',
    DAI: '다이',
    STG: '스타게이트 파이낸스',
    BAT: '베이지거텐션토큰',
    UNI: '유니스왑',
    ENJ: '엔진코인',
    STPT: '에스티피',
    STMX: '스톰엑스',
    CAKE: '팬케이크스왑',
    C98: '코인98',
    THTA: '쎄타토큰',
    XPLA: '엑스플라',
    HOOK: '훅트 프로토콜',
    OBSR: '옵저버',
    RLC: '아이젝',
    CHZ: '칠리즈',
    SPURS: '토트넘 홋스퍼',
    RLY: '랠리',
    GRND: '슈퍼워크',
    OXT: '오키드',
    STAT: '스탯',
    HBAR: '헤데라',
    FXS: '프랙스 셰어',
    RSS3: '알에스에스쓰리',
    FTM: '팬텀',
    OCEAN: '오션프로토콜',
    HIFI: '하이파이',
    OGN: '오리진프로토콜',
    AZIT: '아지트',
    ILV: '일루비움',
    EGG: '네스트리',
    GRACY: '그레이시',
    MOC: '모스코인',
    WIKEN: '위드',
    ADP: '어댑터 토큰',
    BEL: '벨라프로토콜',
    ONT: '온톨로지',
    MVC: '마일버스',
    API3: '에이피아이쓰리',
    UOS: '울트라',
    XCN: '오닉스코인',
    MEV: '미버스',
    DVI: '디비전',
    NCT: '폴리스웜',
    FLOKI: '플로키',
    AQT: '알파쿼크',
    BOA: '보아',
    VALOR: '밸러토큰',
    XPR: '프로톤',
    CRO: '크로노스',
    FX: '펑션엑스',
    HFT: '해시플로우',
    GMX: '지엠엑스',
    EL: '엘리시아',
    ALICE: '마이네이버앨리스',
    AUDIO: '오디우스',
    COS: '콘텐토스',
    JST: '저스트',
    BNT: '뱅코르',
    FLR: '플레어',
    PLA: '플레이댑',
    AMO: '아모코인',
    CON: '코넌',
    CRV: '커브',
    QTCON: '퀴즈톡',
    JASMY: '재스미코인',
    META: '메타디움',
    SIX: '식스',
    REI: '레이',
    FLUX: '플럭스',
    FCT2: '피르마체인',
    ACS: '액세스프로토콜',
    BFC: '바이프로스트',
    SUN: '썬',
    TDROP: '티드랍',
    NFT: '에이피이앤에프티',
    COTI: '코티',
    BLY: '블로서리',
    TEMCO: '템코',
    DAR: '마인즈 오브 달라니아',
    CKB: '너보스',
    SFP: '세이프팔',
    FIT: '300피트 네트워크',
    BIOT: '바이오패스포트',
    ONIT: '온버프',
    AERGO: '아르고',
    SSX: '썸씽',
    MED: '메디블록',
    SWAP: '트러스트스왑',
    CELR: '셀러네트워크',
  };
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
