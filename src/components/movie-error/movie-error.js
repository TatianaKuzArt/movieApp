import React from 'react';
import { Alert } from 'antd';

const MovieError = ({ description }) => <Alert message="Error" description={description} type="error" showIcon />;
export default MovieError;
