import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  MAIN_COLOR_1,
  MAIN_COLOR_3,
  WHITE,
  BREAK_POINT_MOBILE,
  FONT_COLOR,
} from './style';
import styled from 'styled-components';
import hamburgerIcon from '../../images/icon-hamburger.svg';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultAsset = localStorage.getItem('default_asset');
  let isMobile = false;
  if (window.innerWidth < 992) {
    isMobile = true;
  }

  const hamburgerStyle = {
    width: '24px',
    height: '24px',
    display: 'flex',
    alignItems: 'center',
  };

  return (
    <>
      <StyledHeader>
        {isMobile ? '' : <CozyNavLink to='/'>COZY</CozyNavLink>}
        <StyledNavLink to='/main'>거래소</StyledNavLink>
        <StyledNavLink to='/assets'>자산 현황</StyledNavLink>
        <StyledNavLink style={{ cursor: 'unset' }}>
          {Number(defaultAsset).toLocaleString()}원
        </StyledNavLink>
        {isMobile ? (
          <StyledNavLink>
            <img
              src={hamburgerIcon}
              style={hamburgerStyle}
              alt='hamburger-icon'
            />
          </StyledNavLink>
        ) : (
          ''
        )}
      </StyledHeader>
    </>
  );
}

const StyledHeader = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  background-color: ${WHITE};

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    height: 64px;
    justify-content: space-evenly;
    top: 12px;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  // margin: 0.5rem;
  // margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'Poppins-Light';
  font-size: 1.2rem;
  font-weight: 700;
  color: ${FONT_COLOR};
  cursor: pointer;

  :hover {
    color: ${MAIN_COLOR_3};
  }

  @media only screen and (max-width: ${BREAK_POINT_MOBILE}px) {
    height: 64px;
    justify-content: space-evenly;
  }
`;

const CozyNavLink = styled(StyledNavLink)`
  margin-top: 0.5rem;
  color: ${FONT_COLOR};
  font-size: 2.8rem;
  font-weight: 900;
`;

const Button = styled.button`
  position: fixed;
  margin: 0.1rem;
  top: 1px;
  right: 0;
  border: none;
  background: ${MAIN_COLOR_1};
  color: ${WHITE};
`;

const LogoutButton = styled(Button)`
  cursor: pointer;

  :hover {
    color: ${MAIN_COLOR_3};
  }
`;

const NameButton = styled(Button)`
  right: 60px;
  cursor: cursor;
`;
