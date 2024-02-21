import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';
import HelpModal from '../modal/HelpModal';
import {
  MAIN_COLOR_1,
  MAIN_COLOR_2,
  MAIN_COLOR_3,
  WHITE,
  BLACK,
  LIGHT_GREY,
  RED,
  BLUE,
  BREAK_POINT_MOBILE,
} from '../common/style';
import {
  ascendSortAboutName,
  ascendSortAboutMoney,
  descendSortAboutName,
  descendSortAboutMoney,
} from '../../utils/sort';
import { openHelpModal, closeHelpModal } from '../../features/user/userSlice';

export default function Asset() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { displayName, asset } = useSelector((state) => state.user.user);
  const isOpenHelpModal = useSelector((state) => state.user.isOpenHelpModal);
  const tickerCoinList = useSelector((state) => state.stock.coinList.data.data);

  let ownedCoinList = localStorage.getItem('order');
  if (!ownedCoinList) {
    ownedCoinList = [];
  }
  const coinData = useSelector((state) => state.stock.socketCoin); // 실시간 socket으로 넘어오는 코인 데이터

  const [searchCoin, setSearchCoin] = useState('');
  const [coinList, setCoinList] = useState([]);
  const [newCoinList, setNewCoinList] = useState([]);
  const [socketData, setSocketData] = useState('');
  const [renderedAssetList, setRenderedAssetList] = useState({});
  const [isSortBtnClick, setIsSortBtnClick] = useState(false);
  const [isAscendSort, setIsAscendSort] = useState({
    isName: true,
    isCoinCount: true,
    isAvgPrice: true,
    isBoughtPrice: true,
    isEvaluatedPrice: true,
    isEvaluatedProfit: true,
    isYieldRate: true,
  });
  const {
    isName,
    isCoinCount,
    isAvgPrice,
    isBoughtPrice,
    isEvaluatedPrice,
    isEvaluatedProfit,
    isYieldRate,
  } = isAscendSort;
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

  useEffect(() => {
    const ws = new WebSocket(process.env.REACT_APP_WEBSOCKET_SERVER_URL);

    ws.onmessage = (event) => {
      const res = JSON.parse(event.data);
      const socketCoinData = res.content;
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
  }, []);

  useEffect(() => {
    const parsedTickerCoin = JSON.parse(JSON.stringify(tickerCoinList));
    const coinName = Object.keys(parsedTickerCoin);
    const coinInfo = Object.values(parsedTickerCoin);

    for (let i = 0; i < coinInfo.length - 1; i++) {
      coinInfo[i].currency_name = coinName[i];

      if (coinObj[coinName[i]]) {
        coinInfo[i].currency_kr_name = `${coinObj[coinInfo[i].currency_name]}`;
      }
    }

    setCoinList(coinInfo);
  }, [tickerCoinList]);

  useEffect(() => {
    if (ownedCoinList) {
      const parsedCoinList = JSON.parse(ownedCoinList);
      const { coins } = parsedCoinList.asset;

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

  const handleClickSearch = () => {
    const coinName = document.getElementById('coin-search').value;
    setSearchCoin(coinName);
  };

  const handleKeyUpSearch = (e) => {
    if (e.key === 'Enter') {
      const coinName = e.target.value;
      setSearchCoin(coinName);
    }
  };

  const handleClickRefreshFilter = () => {
    document.getElementById('coin-search').value = '';
    setSearchCoin('');
  };

  const sortingByCoinName = () => {
    setIsSortBtnClick(true);
    setIsAscendSort({
      ...isAscendSort,
      isName: !isName,
    });

    isName
      ? setRenderedAssetList(
          filteredCoinList.sort((a, b) =>
            descendSortAboutName(a.currency_name, b.currency_name)
          )
        )
      : setRenderedAssetList(
          filteredCoinList.sort((a, b) =>
            ascendSortAboutName(a.currency_name, b.currency_name)
          )
        );
  };

  const sortingByCurrentCount = () => {
    setIsSortBtnClick(true);
    setIsAscendSort({
      ...isAscendSort,
      isCoinCount: !isCoinCount,
    });

    isCoinCount
      ? setRenderedAssetList(
          filteredCoinList.sort((a, b) =>
            descendSortAboutMoney(a.quantity, b.quantity)
          )
        )
      : setRenderedAssetList(
          filteredCoinList.sort((a, b) =>
            ascendSortAboutMoney(a.quantity, b.quantity)
          )
        );
  };

  const averageBoughtPrice = () => {
    setIsSortBtnClick(true);
    setIsAscendSort({
      ...isAscendSort,
      isAvgPrice: !isAvgPrice,
    });

    isAvgPrice
      ? setRenderedAssetList(
          filteredCoinList.sort((a, b) =>
            descendSortAboutMoney(a.averagePrice, b.averagePrice)
          )
        )
      : setRenderedAssetList(
          filteredCoinList.sort((a, b) =>
            ascendSortAboutMoney(a.averagePrice, b.averagePrice)
          )
        );
  };

  const boughtPrice = () => {
    setIsSortBtnClick(true);
    setIsAscendSort({
      ...isAscendSort,
      isBoughtPrice: !isBoughtPrice,
    });

    isBoughtPrice
      ? setRenderedAssetList(
          filteredCoinList.sort((a, b) =>
            descendSortAboutMoney(a.bought_price, b.bought_price)
          )
        )
      : setRenderedAssetList(
          filteredCoinList.sort((a, b) =>
            ascendSortAboutMoney(a.bought_price, b.bought_price)
          )
        );
  };

  const evaluatedPrice = () => {
    setIsSortBtnClick(true);
    setIsAscendSort({
      ...isAscendSort,
      isEvaluatedPrice: !isEvaluatedPrice,
    });

    isEvaluatedPrice
      ? setRenderedAssetList(
          filteredCoinList.sort((a, b) =>
            descendSortAboutMoney(
              a.quantity * a.current_price,
              b.quantity * b.current_price
            )
          )
        )
      : setRenderedAssetList(
          filteredCoinList.sort((a, b) =>
            ascendSortAboutMoney(
              a.quantity * a.current_price,
              b.quantity * b.current_price
            )
          )
        );
  };

  const evaluatedProfit = () => {
    setIsSortBtnClick(true);
    setIsAscendSort({
      ...isAscendSort,
      isEvaluatedProfit: !isEvaluatedProfit,
    });

    isEvaluatedProfit
      ? setRenderedAssetList(
          filteredCoinList.sort((a, b) =>
            descendSortAboutMoney(
              a.quantity * a.current_price - a.bought_price,
              b.quantity * b.current_price - b.bought_price
            )
          )
        )
      : setRenderedAssetList(
          filteredCoinList.sort((a, b) =>
            ascendSortAboutMoney(
              a.quantity * a.current_price - a.bought_price,
              b.quantity * b.current_price - b.bought_price
            )
          )
        );
  };

  const yieldRate = () => {
    setIsSortBtnClick(true);
    setIsAscendSort({
      ...isAscendSort,
      isYieldRate: !isYieldRate,
    });

    isYieldRate
      ? setRenderedAssetList(
          filteredCoinList.sort((a, b) =>
            descendSortAboutMoney(
              (a.quantity * a.current_price - a.bought_price) / a.bought_price,
              (b.quantity * b.current_price - b.bought_price) / b.bought_price
            )
          )
        )
      : setRenderedAssetList(
          filteredCoinList.sort((a, b) =>
            ascendSortAboutMoney(
              (a.quantity * a.current_price - a.bought_price) / a.bought_price,
              (b.quantity * b.current_price - b.bought_price) / b.bought_price
            )
          )
        );
  };

  const goDetail = (e) => {
    const classNameArray = e.target.className.split(' ');
    const clickedCoin = classNameArray[classNameArray.length - 1];
    navigate(`/trade/${clickedCoin}`);
  };

  return (
    // <AssetWrapper>
    //   {
    //     <>
    //       <TitleBodyWrapper>
    //         <TitleWrapper>
    //           자산 구분
    //           <SortButton onClick={sortingByCoinName}>
    //             {isName ? '🔼' : '🔽'}
    //           </SortButton>
    //         </TitleWrapper>
    //         <TitleWrapper>
    //           보유 개수
    //           <SortButton onClick={sortingByCurrentCount}>
    //             {isCoinCount ? '🔼' : '🔽'}
    //           </SortButton>
    //         </TitleWrapper>
    //         <TitleWrapper>
    //           평균 매수가
    //           <SortButton onClick={averageBoughtPrice}>
    //             {isAvgPrice ? '🔼' : '🔽'}
    //           </SortButton>
    //         </TitleWrapper>
    //         <TitleWrapper>
    //           매수 금액
    //           <SortButton onClick={boughtPrice}>
    //             {isBoughtPrice ? '🔼' : '🔽'}
    //           </SortButton>
    //         </TitleWrapper>
    //         <TitleWrapper>
    //           평가 금액
    //           <SortButton onClick={evaluatedPrice}>
    //             {isEvaluatedPrice ? '🔼' : '🔽'}
    //           </SortButton>
    //         </TitleWrapper>
    //         <TitleWrapper>
    //           펑가 순익
    //           <SortButton onClick={evaluatedProfit}>
    //             {isEvaluatedProfit ? '🔼' : '🔽'}
    //           </SortButton>
    //         </TitleWrapper>
    //         <TitleWrapper>
    //           수익률{' '}
    //           <SortButton onClick={yieldRate}>
    //             {isYieldRate ? '🔼' : '🔽'}
    //           </SortButton>
    //         </TitleWrapper>
    //         <button
    //           className='help-button'
    //           onClick={() => dispatch(openHelpModal())}
    //         >
    //           도움말
    //         </button>
    //       </TitleBodyWrapper>
    //       <Line />

    //       {!isSortBtnClick
    //         ? filteredCoinList.map((coinElements) => {
    //             return (
    //               <div key={coinElements.currency_name}>
    //                 <BodyWrapper>
    //                   <Wrapper>
    //                     <CoinLink
    //                       className={`${coinElements.currency_name}`}
    //                       onClick={goDetail}
    //                     >
    //                       {coinElements.currency_name}
    //                     </CoinLink>
    //                   </Wrapper>
    //                   <Wrapper>{`${coinElements.quantity}개`}</Wrapper>

    //                   <Wrapper>
    //                     {coinElements.averagePrice.toLocaleString()}원
    //                   </Wrapper>
    //                   <Wrapper>
    //                     {coinElements.bought_price.toLocaleString()}원
    //                   </Wrapper>
    //                   <Wrapper>
    //                     {coinElements.evaluate_price !== 0
    //                       ? `${coinElements.evaluate_price.toLocaleString()}원`
    //                       : `${(coinElements.evaluate_price = 0)}원`}
    //                   </Wrapper>
    //                   <Wrapper>
    //                     {coinElements.evaluate_profit ? (
    //                       coinElements.evaluate_profit > 0 ? (
    //                         <Red>
    //                           {coinElements.evaluate_profit.toLocaleString()}원
    //                         </Red>
    //                       ) : (
    //                         <Blue>
    //                           {coinElements.evaluate_profit.toLocaleString()}원
    //                         </Blue>
    //                       )
    //                     ) : (
    //                       `${(coinElements.evaluate_profit = 0)}원`
    //                     )}
    //                   </Wrapper>
    //                   <Wrapper>
    //                     {coinElements.evaluate_profit !== 0 ? (
    //                       coinElements.evaluate_profit > 0 ? (
    //                         <Red>{coinElements.yield_rate.toFixed(2)}%</Red>
    //                       ) : (
    //                         <Blue>{coinElements.yield_rate.toFixed(2)}%</Blue>
    //                       )
    //                     ) : (
    //                       `${(coinElements.yield_rate = 0)}%`
    //                     )}
    //                   </Wrapper>
    //                 </BodyWrapper>
    //                 <Line />
    //               </div>
    //             );
    //           })
    //         : renderedAssetList.map((coinElements) => {
    //             return (
    //               <div key={coinElements.currency_name}>
    //                 <BodyWrapper>
    //                   <Wrapper>
    //                     <CoinLink
    //                       className={`${coinElements.currency_name}`}
    //                       onClick={goDetail}
    //                     >
    //                       {coinElements.currency_name}
    //                     </CoinLink>
    //                   </Wrapper>
    //                   <Wrapper>{`${coinElements.quantity.toFixed(
    //                     4
    //                   )}개`}</Wrapper>

    //                   <Wrapper>
    //                     {coinElements.averagePrice.toLocaleString()}원
    //                   </Wrapper>
    //                   <Wrapper>
    //                     {coinElements.bought_price.toLocaleString()}원
    //                   </Wrapper>
    //                   <Wrapper>
    //                     {coinElements.evaluate_price !== 0 ? (
    //                       coinElements.evaluate_price > 0 ? (
    //                         <Red>
    //                           {coinElements.evaluate_price.toLocaleString()}원
    //                         </Red>
    //                       ) : (
    //                         <Blue>
    //                           {coinElements.evaluate_price.toLocaleString()}원
    //                         </Blue>
    //                       )
    //                     ) : (
    //                       `${(coinElements.evaluate_price = 0)}원`
    //                     )}
    //                   </Wrapper>
    //                   <Wrapper>
    //                     {coinElements.evaluate_profit ? (
    //                       coinElements.evaluate_profit > 0 ? (
    //                         <Red>
    //                           {coinElements.evaluate_profit.toLocaleString()}원
    //                         </Red>
    //                       ) : (
    //                         <Blue>
    //                           {coinElements.evaluate_profit.toLocaleString()}원
    //                         </Blue>
    //                       )
    //                     ) : (
    //                       `${(coinElements.evaluate_profit = 0)}원`
    //                     )}
    //                   </Wrapper>
    //                   <Wrapper>
    //                     {coinElements.evaluate_profit !== 0 ? (
    //                       coinElements.evaluate_profit > 0 ? (
    //                         <Red>{coinElements.yield_rate.toFixed(2)}%</Red>
    //                       ) : (
    //                         <Blue>{coinElements.yield_rate.toFixed(2)}%</Blue>
    //                       )
    //                     ) : (
    //                       `${(coinElements.yield_rate = 0)}%`
    //                     )}
    //                   </Wrapper>
    //                 </BodyWrapper>
    //                 <Line />
    //               </div>
    //             );
    //           })}
    //     </>
    //   }

    //   {isOpenHelpModal && (
    //     <HelpModal onClose={() => dispatch(closeHelpModal())}>
    //       <>
    //         <p>현재 페이지에서는 자산현황을 볼 수 있는 페이지입니다.</p>
    //         <p>
    //           가지고 있는 코인이 얼마나 올랐는지 그리고 어느 정도로 이익을
    //           냈는지 한 눈에 볼 수 있습니다.
    //         </p>
    //         <div>평균매수가란 ? 매수한 코인의 평균 매입가입니다.</div>
    //         <div>
    //           쉽게 말해서 {displayName}님이 평균적으로 얼마정도에 코인을
    //           매수했냐 를 뜻하는 단어가 평균매수가입니다.
    //         </div>
    //         <p>
    //           매수 금액이란 ? {displayName}님이 코인을 매수한 총 금액입니다.{' '}
    //         </p>
    //         <p>
    //           평가 금액이란 ? 현재 코인의 시세에서 {displayName}님이 매수하신
    //           코인의 수량이 곱해지면 평가금액이 됩니다.
    //         </p>
    //         <p>평가 순익이란 ? {displayName}님의 총 수익을 나타내어줍니다. </p>
    //         <p>
    //           수익률이란 ? {displayName}님이 얼마의 수익을 냈는지에 대한
    //           수치입니다.
    //         </p>
    //       </>
    //     </HelpModal>
    //   )}
    // </AssetWrapper>
    <AssetWrapper>
      {filteredCoinList.map((coinElements) => {
        return (
          <ContentsWrapper key={coinElements.currency_name}>
            <ContentsHeader>
              <div>
                {coinElements.currency_name} ({coinElements.currency_kr_name})
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
      })}
    </AssetWrapper>
  );
}

const AssetWrapper = styled.div`
  margin-top: 98px;

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    margin-top: 94px;
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

const BodyWrapper = styled.div`
  display: flex;
  margin: 5px 5px;
  justify-content: space-around;

  .help-button {
    cursor: pointer;
    position: fixed;
    bottom: 5%;
    right: 2%;
    padding: 35px 25px;
    border: none;
    border-radius: 50%;
    font-size: 20px;
    font-weight: 200;
    color: ${WHITE};
    background-color: ${MAIN_COLOR_1};
    opacity: 80%;
    transition: 0.2s;
  }

  .help-button:hover {
    padding: 40px 30px;
    opacity: 100%;
    transition: 0.2s;
  }
`;

const TitleBodyWrapper = styled(BodyWrapper)`
  text-align: center;
  font-size: 1rem;
  font-weight: 500;
  margin: 10px 5px 0px 5px;
`;

const TitleWrapper = styled.div`
  // margin: 0px 40px;
  color: ${BLACK};
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

const Wrapper = styled.div`
  color: ${BLACK};
  width: 100%;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-decoration: none;
`;

const Red = styled.div`
  color: ${RED};
`;

const Blue = styled.div`
  color: ${BLUE};
`;

const Input = styled.input`
  height: 30px;
  margin: 0px 10px;
`;

const SearchButton = styled.button`
  height: 35px;
  background: ${WHITE};
  color: ${MAIN_COLOR_1};
  border-color: ${WHITE};
  border-style: none;
  border-radius: 0.2rem;
  cursor: pointer;
  margin: 0px 10px;

  :hover {
    background-color: ${MAIN_COLOR_3};
    border-color: ${MAIN_COLOR_3};
    color: ${WHITE};
    transition: 0.2s;
  }
`;
const Button = styled.button`
  height: 35px;
  background-color: ${MAIN_COLOR_3};
  color: ${WHITE};
  border-color: ${MAIN_COLOR_3};
  border-style: none;
  border-radius: 0.2rem;
  cursor: pointer;
  margin: 0px 10px;

  :hover {
    background-color: ${MAIN_COLOR_2};
    border-color: ${MAIN_COLOR_2};
    color: ${WHITE};
    transition: 0.2s;
  }
`;

const SortButton = styled(Button)`
  padding: 0px;
  margin-right: 0px;
  background-color: ${WHITE};

  :hover {
    background-color: ${WHITE};
    border-color: ${WHITE};
  }
`;

const Message = styled.h4`
  text-align: center;
`;

const Line = styled.div`
  width: 100%;
  height: 1px;
  background-color: ${LIGHT_GREY};
`;

const CoinLink = styled.div`
  cursor: pointer;
`;

const SearchDiv = styled.div`
  display: flex;
  justify-content: flex-end;
`;
