import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchReviewsMovie } from '../../services/movies-api';
import Loader from '../Loader/Loader';

const MovieReviews = ({ loading, setLoading, setError }) => {
  const [reviews, setReviews] = useState(null);
  const { movieId } = useParams();

  useEffect(() => {
    setError(false);
    const getReviewsInfo = async () => {
      try {
        setLoading(true);
        const { data } = await fetchReviewsMovie(movieId);
        setReviews(data.results);
      } catch (err) {
        console.log(err.message);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    getReviewsInfo();
  }, [movieId]);

  return (
    <div>
      {loading && <Loader />}

      {Array.isArray(reviews) && reviews.length === 0 && (
        <p>We dont have any information about reviews</p>
      )}

      {Array.isArray(reviews) && (
        <ul>
          {reviews.map(review => {
            return (
              <li key={review.id}>
                <h3>{review.author}</h3>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default MovieReviews;
