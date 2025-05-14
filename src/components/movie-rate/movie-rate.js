import React from 'react';
import { ConfigProvider, Rate } from 'antd';

const MovieRate = ({ currentRating, onRate, activeRate }) => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Rate: {
            starSize: 12,
          },
        },
      }}
    >
      <Rate disabled={activeRate} allowHalf onChange={onRate} value={Number(currentRating)} count={10} />
    </ConfigProvider>
  );
};
export default MovieRate;
