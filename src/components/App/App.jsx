import { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';

import css from './App.module.css';

// --------- Components
import MovieCast from '../MovieCast/MovieCast';
import Navigation from '../Navigation/Navigation';
import MovieReviews from '../MovieReviews/MovieReviews';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import Loader from '../Loader/Loader';

// --------------- Pages
const HomePage = lazy(() => import('../../pages/HomePage/HomePage.jsx'));
const MoviesPage = lazy(() => import('../../pages/MoviesPage/MoviesPage.jsx'));
const MovieDetailsPage = lazy(() =>
  import('../../pages/MovieDetailsPage/MovieDetailsPage')
);

const App = () => {
  return (
    <>
      <header className={css.header}>
        <div className={css.container}>
          <Navigation />
        </div>
      </header>

      <main>
        <div className={css.container}>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/movies" element={<MoviesPage />} />
              <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
                <Route path="cast" element={<MovieCast />} />
                <Route path="reviews" element={<MovieReviews />} />
              </Route>
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </Suspense>
        </div>
      </main>

      <footer></footer>
      <Toaster position="top-right" />
    </>
  );
};

export default App;
