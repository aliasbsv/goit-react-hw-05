import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchCastMovie } from '../../services/movies-api';
import css from './MovieCast.module.css';
import Loader from '../Loader/Loader'; // Предполагается, что у вас есть компонент Loader

const MovieCast = () => {
  const [cast, setCast] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const getCastInfo = async () => {
      setLoading(true);
      setError(null);
      try {
        const { data } = await fetchCastMovie(movieId);
        setCast(data.cast);
      } catch (err) {
        console.log(err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getCastInfo();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;
  if (!cast) return null;

  return (
    <>
      {cast.length === 0 && <p>We don't have any information</p>}

      {cast.length > 0 && (
        <ul className={css.actorList}>
          {cast.map(actor => (
            <li key={actor.id} className={css.actorItem}>
              <div className={css.actorPhoto}>
                <img
                  src={
                    actor.profile_path
                      ? `https://image.tmdb.org/t/p/w200/${actor.profile_path}`
                      : `https://dummyimage.com/400x600/cdcdcd/000.jpg&text=No+poster`
                  }
                  alt={actor.name || 'Actor'}
                  className={css.actorImg}
                />
              </div>
              <div className={css.actorInfo}>
                <p>{actor.name}</p>
                <p>Character: {actor.character}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default MovieCast;
