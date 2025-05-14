class MovieService {
  _apiBase;
  _apiToken;
  static genresMap;

  constructor() {
    this._apiBase = 'https://api.themoviedb.org/';
    this._apiToken =
      'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMTcxNDhjODNkMTJjYmUyZTE0M2YzMjQ2YWUwNjVjMiIsIm5iZiI6MTc0NjEwOTM4Ny4yNCwic3ViIjoiNjgxMzgzY2JjZGI5NzU4OGU3MDIwOGVhIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.cuJXUSVWxeFSoc_93XGWSGmwI433wjw8PmF1bh0hhcM';
    MovieService.genresMap = new Map();
  }

  async qetMovies(filmName, page = 1) {
    const res = await fetch(
      `${this._apiBase}3/search/movie?query=${encodeURIComponent(filmName)}&include_adult=true&language=ru-RU&page=${page}`,
      {
        headers: {
          Authorization: this._apiToken,
        },
      }
    );

    if (!res.ok) {
      throw new Error('Ошибка загрузки фильмов:' + res.statusText);
    }

    const result = await res.json();
    result.results.forEach((movie) => {
      movie.rating = sessionStorage.getItem(movie.id);
    });
    return result;
  }

  //часть для гостевой сессии
  async createGuestSession() {
    let sessionId = sessionStorage.getItem('sessionId');
    if (sessionId) {
      return sessionId;
    } else {
      const res = await fetch(`${this._apiBase}3/authentication/guest_session/new`, {
        headers: { Authorization: this._apiToken },
      });

      if (!res.ok) {
        throw new Error('Ошибка создания гостевой сессии');
      }

      const data = await res.json();
      sessionId = data.guest_session_id;
      sessionStorage.setItem('sessionId', sessionId);
      return sessionId;
    }
  }

  async getRatedMovies(page = 1) {
    const sessionId = await this.createGuestSession();
    const res = await fetch(
      `${this._apiBase}3/guest_session/${sessionId}/rated/movies?page=${page}&language=ru-RU&sort_by=created_at.asc`,
      {
        headers: {
          Authorization: this._apiToken,
        },
      }
    );

    if (!res.ok) {
      throw new Error('Ошибка загрузки оценённых фильмов');
    }
    return await res.json();
  }

  //часть для голосования
  async rateMovie(movieId, value) {
    sessionStorage.setItem(movieId, value);
    const sessionId = await this.createGuestSession();
    const res = await fetch(`${this._apiBase}3/movie/${movieId}/rating?guest_session_id=${sessionId}`, {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json;charset=utf-8',
        Authorization: this._apiToken,
      },
      body: JSON.stringify({ value }),
    });
    if (!res.ok) {
      throw new Error('Ошибка при голосовании');
    }

    return await res.json();
  }

  async fillGenres() {
    const res = await fetch(`${this._apiBase}3/genre/movie/list?language=ru`, {
      headers: {
        Authorization: this._apiToken,
      },
    });

    if (!res.ok) {
      throw new Error(' ' + res.statusText);
    }
    let result = await res.json();
    result.genres.forEach((genre) => {
      MovieService.genresMap.set(genre.id, genre.name);
    });
  }
}

export default MovieService;
