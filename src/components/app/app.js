import React from 'react';
import './app.css';
import FilmList from '../film-list';
import Search from '../search/search';
import Header from '../header';
import MoviePagination from '../movie-pagination/movie-pagination';
import MovieLoader from '../movie-loader';
import MovieError from '../movie-error';
import MovieService from '../../movie-service/movie-service';
import Context from '../context/context';

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

  //методы переключения табов и загрузки оцененных фильмов
  setTab = (tab) => {
    this.setState({ activeTab: tab });
    if (tab === 'Rate') {
      this.findRate();
    } else {
      this.findMovies(this.state.filmName, this.state.page);
    }
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
          <div>
            <FilmList
              movies={activeTab === 'Rate' ? this.state.ratedMovies : this.state.movies}
              activeRate={activeTab === 'Rate'}
              onRateMovie={this.onRateMovie}
              ratedMoviesMap={this.state.ratedMoviesMap || {}}
            />
          </div>
        </div>
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
