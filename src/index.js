import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/app/app';
import './index.css';
import 'antd/dist/reset.css';

const movieapp = ReactDOM.createRoot(document.querySelector('#root'));
movieapp.render(<App />);

// const options = {
//   method: 'GET',
//   headers: {
//     accept: 'application/json',
//     Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTcxNDhjODNkMTJjYmUyZTE0M2YzMjQ2YWUwNjVjMiIsIm5iZiI6MTc0NjEwOTM4Ny4yNCwic3ViIjoiNjgxMzgzY2JjZGI5NzU4OGU3MDIwOGVhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cuJXUSVWxeFSoc_93XGWSGmwI433wjw8PmF1bh0hhcM'
//   }
// };
//
// fetch('https://api.themoviedb.org/3/search/movie?query=fast%20and&include_adult=true&language=en-US&page=1&api_key=a17148c83d12cbe2e143f3246ae065c2', options)
//   .then(res => res.json())
//   .then(res => console.log(res))
//   .catch(err => console.error(err));
