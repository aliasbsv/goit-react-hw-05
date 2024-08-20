import { Suspense, lazy, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

import css from './App.module.css';

// --------- Components ---------------/
import MovieCast from '../MovieCast/MovieCast';
import Navigation from '../Navigation/Navigation';
import MovieReviews from '../MovieReviews/MovieReviews';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Loader from '../Loader/Loader';

// -------------------------------------/

// --------------- Pages ---------------/
const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage')
);
// -------------------------------------/

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const sharedProps = {
    loading,
    setLoading,
    error,
    setError,
  };

  return (
    <div className={css.wrapper}>
      <header className={css.header}>
        <Navigation />
      </header>

      <main>
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage {...sharedProps} />} />
            <Route path="/movies" element={<MoviesPage {...sharedProps} />} />
            <Route
              path="/movies/:movieId"
              element={<MovieDetailsPage {...sharedProps} />}
            >
              <Route path="cast" element={<MovieCast {...sharedProps} />} />
              <Route
                path="reviews"
                element={<MovieReviews {...sharedProps} />}
              />
            </Route>
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </main>

      <footer></footer>
    </div>
  );
}

export default App;
