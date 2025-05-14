import React, { Component } from 'react';
import { Pagination } from 'antd';

export default class MoviePagination extends Component {
  render() {
    const { page, totalElements, handlePageChange } = this.props;

    return (
      <Pagination
        current={page}
        pageSize={20}
        total={totalElements}
        onChange={handlePageChange}
        showSizeChanger={false}
        style={{ marginTop: '20px', textAlign: 'center', display: 'block' }}
      />
    );
  }
}
