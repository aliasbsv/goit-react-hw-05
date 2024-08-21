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

const MovieDetailsPage = () => {
  const [movieInfo, setMovieInfo] = useState(null);
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state?.from ?? '/');

  useEffect(() => {
    setLoading(true);
    setError(null);

    const fetchMovieDetails = async () => {
      try {
        const response = await fetchDetailsMovieData(movieId);
        setMovieInfo(response.data);
        setGenres(response.data.genres);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p>{error}</p>;
  if (!movieInfo) return null;

  return (
    <section className="details">
      <Link to={backLinkRef.current} className={css.backLink}>
        Go back
      </Link>

      <div className={css.container}>
        <div className={css.mainBlock}>
          {movieInfo.poster_path ? (
            <div className={css.tumbPoster}>
              <img
                src={`https://image.tmdb.org/t/p/w400/${movieInfo.poster_path}`}
                alt={`Poster by ${movieInfo.title}`}
                className={css.poster}
              />
            </div>
          ) : (
            <div className={css.tumbPoster}>
              <img
                src={`https://dummyimage.com/400x600/cdcdcd/000.jpg&amp;text=No+poster`}
                alt={`Poster by ${movieInfo.title}`}
                className={css.poster}
              />
            </div>
          )}

          <div className={css.content}>
            <h2 className={css.contentTitle}>
              {movieInfo.title}&nbsp; ({movieInfo.release_date})
            </h2>
            <div className={css.category}>
              <h3 className={css.contentSubtitle}>User Score:</h3>
              <p>{movieInfo.vote_average}</p>
            </div>
            <div className={css.category}>
              <h3 className={css.contentSubtitle}>Overview</h3>
              <p>{movieInfo.overview}</p>
            </div>
            <div className={css.category}>
              <h3 className={css.contentSubtitle}>Genres</h3>
              <ul>
                {genres.map(genre => (
                  <li key={genre.id}>{genre.name}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={css.additionalBlock}>
          <h3 className={css.additionalTitle}>Additional information</h3>
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
    </section>
  );
};

export default MovieDetailsPage;
