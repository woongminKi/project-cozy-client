import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function Logout() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  try {
    sessionStorage.removeItem('access_token');
    navigate('/main');
  } catch (err) {
    console.log('error in logout');
  }
  // return <div>Logout</div>;
}
