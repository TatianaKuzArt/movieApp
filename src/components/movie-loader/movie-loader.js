import React from 'react';
import { Spin } from 'antd';

const MovieLoader = () => (
  <div
    style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh', // делаем высоту на весь экран
    }}
  >
    <Spin size="large" />
  </div>
);

export default MovieLoader;
