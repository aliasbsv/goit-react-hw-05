import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();

  return (
    <ul className={css.list}>
      {movies.map(movie => (
        <li key={movie.id} className={css.item}>
          <Link
            to={`/movies/${movie.id}`}
            state={{ from: location }}
            className={css.link}
          >
            <div className={css.thumbPoster}>
              <img
                src={
                  movie.poster_path
                    ? `https://image.tmdb.org/t/p/w400/${movie.poster_path}`
                    : `https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster`
                }
                alt={`${movie.title} poster`}
                className={css.poster}
              />
            </div>
            <div className={css.cardInfo}>
              <h3 className={css.cardTitle}>
                {movie.title} ({movie.release_date?.slice(0, 4) || 'N/A'})
              </h3>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
