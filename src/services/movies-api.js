import axios from 'axios';

const API_KEY = '3a88d78c5c3057e676d982cf37cf1f62';
const ACCESS_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzYTg4ZDc4YzVjMzA1N2U2NzZkOTgyY2YzN2NmMWY2MiIsIm5iZiI6MTcyNDA4MjA2MC45MDQ0MTgsInN1YiI6IjY2YzM1ZjFkNTliYzk2YmYyOGRhMWFjZCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.XiJpxufiR3RZCddbp4yP1hbNaBNKhDDQS8EpnNLB8OI';

export const fetchTrandingMoviesData = async () => {
  const timeWindow = {
    day: 'day',
    week: 'week',
  };

  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ACCESS_TOKEN,
    },

    params: {
      api_key: API_KEY,
      include_adult: 'false',
      language: 'en-US',
    },
  };

  const { data } = await axios.get(
    `https://api.themoviedb.org/3/trending/movie/${timeWindow.day}`,
    options
  );
  return data;
};

export const fetchDetailsMovieData = async movieId => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ACCESS_TOKEN,
    },
    params: {
      api_key: API_KEY,
      include_adult: 'false',
      language: 'en-US',
    },
  };

  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}`,
    options
  );
  return response;
};

export const fetchMovieBySearch = async query => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ACCESS_TOKEN,
    },

    params: {
      api_key: API_KEY,
      include_adult: 'false',
      language: 'en-US',
      query,
    },
  };

  const response = await axios.get(
    `https://api.themoviedb.org/3/search/movie?&page=1`,
    options
  );

  return response;
};

export const fetchCastMovie = async movieId => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ACCESS_TOKEN,
    },
    params: {
      api_key: API_KEY,
      include_adult: 'false',
      language: 'en-US',
    },
  };
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/credits`,
    options
  );

  return response;
};

export const fetchReviewsMovie = async movieId => {
  const options = {
    method: 'GET',
    headers: {
      accept: 'application/json',
      Authorization: ACCESS_TOKEN,
    },
    params: {
      api_key: API_KEY,
      include_adult: 'false',
      language: 'en-US',
    },
  };
  const response = await axios.get(
    `https://api.themoviedb.org/3/movie/${movieId}/reviews`,
    options
  );

  return response;
};
