import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movies: [],
    error: false,
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
    // doesn't actually mutate the state because it uses the Immer library,
    // which detects changes to a "draft state" and produces a brand new
    // immutable state based off those changes
    processMovies: (state, action) => {
      state.movies = action.payload;
      state.error = false;
    },
    getMoviesError: (state, action) => {
      state.error = action.payload;
    },
    clearError: state => {
      state.error = false;
    },
    deleteMovie: (state, action) => {
      state.movies = state.movies.filter(movie => movie.imdbID !== action.payload);
    },
  },
});

export const { processMovies, getMoviesError, clearError, deleteMovie } = movieSlice.actions;

// The function below is called a thunk and allows us to perform async logic.
export const getMovies = searchTerm => dispatch => {
  axios.get(`http://www.omdbapi.com/?apikey=${process.env.REACT_APP_OMDB_API_KEY}&s=${searchTerm}`)
    .then(response => {
      if(response.data.Response === 'True') {
        console.log(response.data.Search);
        dispatch(processMovies(response.data.Search));
      } else {
        dispatch(processMovies([]));
      }
    })
    .catch(error => {
      console.log('Error getting movies: ', error.message);
      dispatch(getMoviesError(error.message));
    });
};

// The function below is called a selector and allows us to select a value from
// the state.
export const selectMovies = state => state.movie.movies;
export const selectError = state => state.movie.error;

export default movieSlice.reducer;
