import React, { useState, useEffect } from 'react';
import { init, dispose } from 'klinecharts';

const types = [
  { key: 'candle_solid', text: '캔들' },
  { key: 'candle_stroke', text: '투명 캔들' },
  { key: 'ohlc', text: 'Bar 형식의 OHLC' },
  { key: 'area', text: 'Mountain' },
];
export default function Main() {
  let chart;
  const [userId, setUserId] = useState('');
  const [nickName, setNickName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [initialized, setInitiallized] = useState(false);

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

  useEffect(() => {
    getProfile();
  }, []);

  return <div>Main</div>;
}
