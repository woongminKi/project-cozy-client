import React from 'react';
import { useDispatch } from 'react-redux';
import { NavLink, useNavigate } from 'react-router-dom';
import { MAIN_COLOR_1, MAIN_COLOR_3, WHITE, BLACK } from './style';
import styled from 'styled-components';

export default function Header() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const defaultAsset = localStorage.getItem('default_asset');

  return (
    <>
      <StyledHeader>
        <CozyNavLink to='/'>COZY</CozyNavLink>
        <StyledNavLink to='/main'>거래소</StyledNavLink>
        <StyledNavLink to='/assets'>자산 현황</StyledNavLink>
        <div>{Number(defaultAsset).toLocaleString()}원</div>
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
  background-color: ${MAIN_COLOR_1};
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  margin: 0.5rem;
  margin-top: 1rem;
  font-size: 1.2rem;
  font-weight: 700;
  color: ${BLACK};
  cursor: pointer;

  :hover {
    color: ${MAIN_COLOR_3};
  }
`;

const CozyNavLink = styled(StyledNavLink)`
  color: ${WHITE};
  margin-top: 0.5rem;
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
