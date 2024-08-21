import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviewsMovie } from '../../services/movies-api';
import css from './MovieReviews.module.css';
import Loader from '../Loader/Loader';

const MovieReviews = () => {
  const [reviews, setReviews] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    const getReviewsInfo = async () => {
      if (!movieId) return;

      setLoading(true);
      setError(null);
      try {
        const { data } = await fetchReviewsMovie(movieId);
        setReviews(data.results);
      } catch (err) {
        console.error('Error fetching reviews:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getReviewsInfo();
  }, [movieId]);

  if (loading) return <Loader />;
  if (error) return <p>Error: {error}</p>;

  // Обработка случая, когда отзывов нет
  if (!reviews || reviews.length === 0) {
    return <p>We don&apos;t have any reviews for this movie.</p>;
  }

  return (
    <ul className={css.list}>
      {reviews.map(review => (
        <li key={review.id} className={css.item}>
          <h3 className={css.title}>{review.author}</h3>
          <p className={css.text}>{review.content}</p>
        </li>
      ))}
    </ul>
  );
};

export default MovieReviews;
