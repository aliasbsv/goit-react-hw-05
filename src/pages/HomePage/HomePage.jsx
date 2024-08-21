import { useEffect, useState } from 'react';
import { fetchTrandingMoviesData } from '../../services/movies-api';
import { sendErrorNotification } from '../../services/messages';

import MovieList from '../../components/MovieList/MovieList';
import Loader from '../../components/Loader/Loader';
import css from './HomePage.module.css';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);

      try {
        const data = await fetchTrandingMoviesData();
        setMovies(data.results);
      } catch (err) {
        sendErrorNotification(
          err.message || 'Failed to fetch movies. Please try again later.'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  return (
    <section>
      {loading ? (
        <Loader />
      ) : (
        <>
          <h1 className={css.title}>TOP the most popular movies today</h1>
          {movies.length > 0 ? (
            <MovieList movies={movies} />
          ) : (
            <p>No movies found. Please try again later.</p>
          )}
        </>
      )}
    </section>
  );
};

export default HomePage;
