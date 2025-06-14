import React from 'react';
import './app.css';
import Search from '../search/search';
import Header from '../header';
import MoviePagination from '../movie-pagination/movie-pagination';
import MovieLoader from '../movie-loader';
import MovieError from '../movie-error';
import MovieService from '../../movie-service/movie-service';
import Context from '../context/context';
import RatedMovies from '../rated-movies/rated-movies';
import SearchMovies from '../search-movies/search-movies';

class App extends React.Component {
  state = {
    movies: [],
    loading: true,
    error: false,
    filmName: null,
    page: 1,
    totalElements: 0,
    activeTab: 'Search',
    ratedMovies: [],
    genresMap: [],
  };

  movieService = new MovieService();

  componentDidMount() {
    this.movieService.createGuestSession();
    this.movieService.fillGenres();
  }

  findMovies = (filmName, page) => {
    if (!filmName) {
      this.setState({ movies: [] });
      return;
    }
    this.setState({ loading: true, error: false, filmName: filmName });

    this.movieService.qetMovies(filmName, page).then((movies) => {
      this.setState({
        movies: movies.results,
        loading: false,
        page: movies.page,
        totalElements: movies.total_results,
      });
    }, this.onError);
  };

  findRate = (page) => {
    this.setState({ loading: true, error: false });
    this.movieService.getRatedMovies(page).then((res) => {
      console.log('получили оцененные фильмы - ', res);
      this.setState({
        ratedMovies: res.results,
        error: false,
        loading: false,
        page: res.page,
        totalElements: res.total_results,
      });
    }, this.onError);
  };

  onError = (err) => {
    this.setState({
      errDescription: err.message,
      error: true,
      loading: false,
    });
  };

  handlePageChange = (page) => {
    if (this.state.activeTab === 'Search') {
      this.findMovies(this.state.filmName, page);
    } else if (this.state.activeTab === 'Rate') {
      this.findRate(page);
    }
  };

  setTab = (tab) => {
    if (tab === 'Rate') {
      this.findRate();
    } else {
      this.findMovies(this.state.filmName, this.state.page);
    }
    this.setState({ activeTab: tab });
  };

  onRateMovie = (movieId, value) => {
    this.movieService.rateMovie(movieId, value).then(
      () =>
        this.setState(({ movies }) => {
          const idx = movies.findIndex((el) => el.id === movieId);
          const oldItem = movies[idx];
          const newItem = {
            ...oldItem,
            rating: value,
          };
          const newArray = [...movies.slice(0, idx), newItem, ...movies.slice(idx + 1)];
          return { movies: newArray };
        }),
      this.onError
    );
  };

  render() {
    const { activeTab } = this.state;
    return (
      <Context.Provider value={{ genres: MovieService.genresMap }}>
        <div className="app-container">
          <Header activeTab={activeTab} setTab={this.setTab} />
          {activeTab === 'Search' && <Search onSearch={this.findMovies} />}
          {this.state.error && <MovieError description={this.state.errDescription} />}
          {this.state.loading && <MovieLoader />}
          {/*<div>*/}
          {/*  <FilmList*/}
          {/*    movies={activeTab === 'RatedMovies' ? this.state.ratedMovies : this.state.movies}*/}
          {/*    activeRate={activeTab === 'RatedMovies'}*/}
          {/*    onRateMovie={this.onRateMovie}*/}
          {/*    ratedMoviesMap={this.state.ratedMoviesMap || {}}*/}
          {/*  />*/}
          {/*</div>*/}
        </div>
        {activeTab === 'Search' && (
          <SearchMovies movies={this.state.movies} activeRate={false} onRateMovie={this.onRateMovie} />
        )}

        {activeTab === 'Rate' && <RatedMovies movies={this.state.ratedMovies} activeRate={true} />}
        <MoviePagination
          page={this.state.page}
          handlePageChange={this.handlePageChange}
          totalElements={this.state.totalElements}
        />
      </Context.Provider>
    );
  }
}

export default App;
