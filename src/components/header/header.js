import React from 'react';
import { Tabs } from 'antd';
import '../app/app';

const Header = ({ setTab }) => {
  const items = [
    {
      key: 'Search',
      label: 'Search',
    },
    {
      key: 'Rate',
      label: 'Rate',
    },
  ];

  return <Tabs centered defaultActiveKey="Search" items={items} onChange={setTab} />;
};
export default Header;
