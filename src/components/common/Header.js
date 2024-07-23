import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { MAIN_COLOR_3, WHITE, BREAK_POINT_MOBILE, FONT_COLOR } from './style';
import { logoutRequest } from '../../features/auth/authSlice';
import { getCookie, removeCookie } from '../../utils/cookies';
import styled from 'styled-components';
// import hamburgerIcon from '../../images/icon-hamburger.svg';

export default function Header() {
  const [isToken, setIsToken] = useState(false);
  const { isLoggedIn, user } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultAsset = localStorage.getItem('default_asset');

  let isMobile = false;
  if (window.innerWidth < 992) {
    isMobile = true;
  }

  useEffect(() => {
    const checkToken = () => {
      getCookie('accessToken') ? setIsToken(true) : setIsToken(false);
    };

    checkToken();

    const observer = new MutationObserver(() => {
      checkToken();
    });

    observer.observe(document, {
      attributes: true,
      childList: true,
      subtree: true,
    });

    return () => observer.disconnect();
  }, [isLoggedIn]);

  function logout() {
    dispatch(logoutRequest({ user }));
    removeCookie('accessToken');
    removeCookie('refreshToken');
    navigate('/');
  }

  return (
    <>
      <StyledHeader>
        {isMobile ? '' : <CozyNavLink to='/'>COZY</CozyNavLink>}
        {isToken ? (
          <>
            <StyledNavLink to='/main'>거래소</StyledNavLink>
            <StyledNavLink to='/assets'>자산 현황</StyledNavLink>
            <StyledNavLink style={{ cursor: 'unset' }}>
              {Number(defaultAsset).toLocaleString()}원
            </StyledNavLink>

            <StyledNavLink onClick={logout}>로그아웃</StyledNavLink>
          </>
        ) : (
          <>
            <StyledNavLink to='/'>거래소</StyledNavLink>
            <StyledNavLink to='/'>자산 현황</StyledNavLink>
            <StyledNavLink to='/login'>로그인</StyledNavLink>
          </>
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
    z-index: 1;
  }
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  // margin: 0.5rem;
  // margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: 'PretendardVariable';
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
