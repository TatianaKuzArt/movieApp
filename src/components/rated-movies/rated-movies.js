import React from 'react';
import Movie from '../movie/movie';
import './rated-movies.css';

const RatedMovies = ({ movies, activeRate }) => {
  const elements = movies.map((movie) => {
    return (
      <li key={movie.id}>
        <Movie movie={movie} activeRate={activeRate} />
      </li>
    );
  });
  return <ul className="film-list">{elements}</ul>;
};

export default RatedMovies;
