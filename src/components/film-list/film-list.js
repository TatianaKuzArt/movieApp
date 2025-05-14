import React, { Component } from 'react';
import './film-list.css';
import Movie from '../movie/movie';

export default class FilmList extends Component {
  render() {
    const { movies, onRateMovie, activeRate } = this.props;

    const elements = movies.map((movie) => {
      return (
        <li key={movie.id}>
          <Movie movie={movie} onRateMovie={onRateMovie} activeRate={activeRate} />
        </li>
      );
    });

    return <ul className="film-list">{elements}</ul>;
  }
}
