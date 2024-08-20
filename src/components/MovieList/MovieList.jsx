import { Link, useLocation } from 'react-router-dom';
import css from './MovieList.module.css';

const MovieList = ({ movies }) => {
  const location = useLocation();
  // console.log('location from List', location);

  return (
    <ul className={css.list}>
      {movies.map(movie => {
        return (
          <li key={movie.id} className={css.item}>
            <Link
              to={`/movies/${movie.id}`}
              state={{ from: location }}
              className={css.link}
            >
              {movie.poster_path === null ? (
                <div className={css.thumbPoster}>
                  <img
                    src={`https://dummyimage.com/400x600/cdcdcd/000.jpg&amp;text=No+poster`}
                    alt="Movie`s poster"
                    className={css.poster}
                  />
                </div>
              ) : (
                <div className={css.thumbPoster}>
                  <img
                    src={`https://image.tmdb.org/t/p/w400/${movie.poster_path}`}
                    alt="Movie`s poster"
                    className={css.poster}
                  />
                </div>
              )}

              <h3>
                {movie.title} ({movie.release_date.slice(0, 4)})
              </h3>
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default MovieList;
