import { useEffect, useState } from 'react';
import { fetchMovieBySearch } from '../../services/movies-api';
import { useSearchParams } from 'react-router-dom';

import SearchForm from '../../components/SearchForm/SearchForm';
import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';

import { Toaster } from 'react-hot-toast';
import {
  sendNoteEmptyField,
  sendNoteBadRequest,
} from '../../services/messages';

const MoviesPage = () => {
  const [movies, setMovies] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get('query');

  useEffect(() => {
    if (!query) return;

    const fetchMovie = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await fetchMovieBySearch(query);
        setMovies(data.results);

        if (data.results.length === 0) {
          sendNoteBadRequest();
        }
      } catch (err) {
        setError(err.message);
        console.error(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchMovie();
  }, [query]);

  const onSearch = queryValue => {
    if (queryValue === '') {
      sendNoteEmptyField();
      return;
    }
    setSearchParams({ query: queryValue });
  };

  return (
    <section className="moviePage">
      <SearchForm onSearch={onSearch} />
      {loading && <Loader />}
      {error && <p>{error}</p>}
      {Array.isArray(movies) && movies.length > 0 && (
        <MovieList movies={movies} />
      )}
      <Toaster />
    </section>
  );
};

export default MoviesPage;
