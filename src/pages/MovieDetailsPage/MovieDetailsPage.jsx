import { useEffect, useRef, useState } from 'react';
import { fetchDetailsMovieData } from '../../services/movies-api';
import {
  Link,
  useParams,
  Outlet,
  useLocation,
  NavLink,
} from 'react-router-dom';
import Loader from '../../components/Loader/Loader';
import css from './MovieDetailsPage.module.css';

const MovieDetailsPage = ({ loading, setLoading, error, setError }) => {
  const [movieInfo, setMovieInfo] = useState([]);
  const [genres, setGenres] = useState([]);

  const params = useParams(); // movieId
  const movieId = params.movieId;

  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');
  // console.log('location from Details', location);

  useEffect(() => {
    setLoading(true);
    setError(false);

    const fetchMovieDetails = async () => {
      try {
        const data = await fetchDetailsMovieData(movieId);
        setMovieInfo(data.data);
        setGenres(data.data.genres);
      } catch (err) {
        setError(err.message);
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  //   console.log(movieInfo);
  //   console.log(genres);

  return (
    <section className="details">
      <Link to={backLinkRef.current} className={css.backLink}>
        go back
      </Link>

      {loading && <Loader />}

      {error ? (
        <p>{error}</p>
      ) : (
        <div className={css.content}>
          <div className={css.mainBlock}>
            <div className="tumbPoster">
              <img
                src={`https://image.tmdb.org/t/p/w400/${movieInfo.poster_path}`}
                alt={`Poster by ${movieInfo.title}`}
                className="poster"
              />
            </div>
            <div>
              <h2>
                {movieInfo.title}&nbsp; ({movieInfo.release_date})
              </h2>
              <p>User Score: {movieInfo.vote_average}</p>
              <h3>Overview</h3>
              <p>{movieInfo.overview}</p>
              <h3>Genres</h3>
              <ul>
                {genres.map(genre => {
                  return <li key={genre.id}>{genre.name}</li>;
                })}
              </ul>
            </div>
          </div>

          <div className="additionalBlok">
            <h3>Additional information</h3>
            <ul className={css.additionalList}>
              <li>
                <NavLink to="cast" className={css.additionalLink}>
                  Cast
                </NavLink>
              </li>
              <li>
                <NavLink to="reviews" className={css.additionalLink}>
                  Reviews
                </NavLink>
              </li>
            </ul>
            <div>
              <Outlet />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default MovieDetailsPage;
