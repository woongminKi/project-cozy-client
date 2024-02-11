import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { WHITE, BLACK, MAIN_COLOR_1 } from '../common/style';

export default function SettingModal({ onTrade, onClose, children }) {
  console.log('??', onClose);
  const [show, setShow] = useState(true);
  let defaultAsset = '100000000';
  const ref = useRef(defaultAsset);

  const handleDefaultAsset = (e) => {
    defaultAsset = e.target.value;
    localStorage.setItem('default_asset', defaultAsset);
    // console.log('??', e.target.value);
  };
  const setAsset = () => {
    setShow(false);
    console.log('show?', show);
    if (ref.current) {
      // ref.current.setAttribute('value', defaultAsset)
      localStorage.setItem('default_asset', defaultAsset);
    }
    if (!show) {
      this.setAttribute('display', 'none');
    }
  };
  return (
    <>
      <Dimmed onClick={onClose} />
      <CheckModalWrapper>
        <Div>연습할 초기 자산을 설정하세요</Div>
        <Select onChange={handleDefaultAsset}>
          <option value='default'>클릭해주세요</option>
          <option value='100000000'>1억원</option>
          <option value='200000000'>2억원</option>
          <option value='300000000'>3억원</option>
          <option value='400000000'>4억원</option>
          <option value='500000000'>5억원</option>
          <option value='600000000'>6억원</option>
          <option value='700000000'>7억원</option>
          <option value='800000000'>8억원</option>
          <option value='900000000'>9억원</option>
          <option value='1000000000'>10억원</option>
          <option value='2000000000'>20억원</option>
          <option value='3000000000'>30억원</option>
          <option value='4000000000'>40억원</option>
          <option value='5000000000'>50억원</option>
          <option value='6000000000'>60억원</option>
          <option value='7000000000'>70억원</option>
          <option value='8000000000'>80억원</option>
          <option value='9000000000'>90억원</option>
          <option value='10000000000'>100억원</option>
        </Select>

        <Button data-testid='confirm-button' onClick={onClose}>
          확인
        </Button>
        <Button data-testid='cancel-button' onClick={onClose}>
          취소
        </Button>
      </CheckModalWrapper>
    </>
  );
}

SettingModal.propTypes = {
  onTrade: PropTypes.func,
  onClose: PropTypes.func,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]),
};

const CheckModalWrapper = styled.div`
  top: 50%;
  left: 50%;
  width: 360px;
  height: auto;
  position: absolute;
  margin-left: -180px;
  margin-top: -110px;
  text-align: center;
  border-radius: 0.5rem;
  background-color: ${WHITE};
`;

const Dimmed = styled.div`
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0%;
  top: 0%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Button = styled.button`
  width: 40%;
  height: 40px;
  margin: 24px 0;
  text-align: center;
  background: ${WHITE};
  color: ${BLACK};
  border-style: none;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: 100;
  border-radius: 0.4rem;
  :hover {
    color: ${MAIN_COLOR_1};
    font-size: 1.5rem;
    font-weight: 400;
    transition: 0.2s;
  }
`;

const Div = styled.div`
  color: ${BLACK};
  margin-top: 50px;
  margin-bottom: 45px;
  font-size: 1.4rem;
  font-weight: 100;
`;

const Select = styled.select`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  left: 50%;
  transform: translateX(-50%);
  color: ${BLACK};
  font-size: 1.4rem;
  font-weight: 100;
  padding: 8px;
`;
