import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const movieSlice = createSlice({
  name: 'movie',
  initialState: {
    movies: [],
    error: false,
    // resultsEmpty is true when getMovies has been called but returns no results, false otherwise
    // Initially, it is false because getMovies has not yet been called
    resultsEmpty: false,
    pageInfo: {
      currentPage: 1,
      numPages: 0,
    }
  },
  // Redux Toolkit allows us to write "mutating" logic in reducers. It
  // doesn't actually mutate the state because it uses the Immer library,
  // which detects changes to a "draft state" and produces a brand new
  // immutable state based off those changes
  reducers: {
    // sets state appropriately based on result of retrieving movies using getMovies
    // used for initial page of movies
    processMovies: (state, action) => {
      state.movies = action.payload.Search;
      state.error = false;
      state.resultsEmpty = false;
      state.pageInfo.currentPage = 1;

      // Calculate numPages
      if (action.payload.totalResults % 10 === 0) {
        state.pageInfo.numPages = action.payload.totalResults / 10;
      } else {
        state.pageInfo.numPages = parseInt(action.payload.totalResults / 10) + 1;
      }
    },
    // sets state appropriately based on result of retrieving movies using getMoreMovies
    // used for each page of movies except first
    processMoreMovies: (state, action) => {
      state.movies = [...state.movies, ...action.payload.Search];
      state.error = false;
      state.pageInfo.currentPage++;
    },
    // handle case where no movies are found (initial page)
    processNoMovies: state => {
      state.movies = [];
      state.error = false;
      state.resultsEmpty = true;
    },
    // handle error when retrieving movies using getMovies or getMoreMovies
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

export const {
  processMovies,
  processMoreMovies,
  processNoMovies,
  getMoviesError,
  clearError,
  deleteMovie,
} = movieSlice.actions;

// The function below is a thunk and allows us to perform async logic.
// getMovies is used on search submit to load the initial page of movies
export const getMovies = searchTerm => dispatch => {
  axios.get(`/getMovies/${searchTerm}/1`)
    .then(response => {
      if (response.data.Response === 'True') {
        dispatch(processMovies(response.data));
      } else {
        dispatch(processNoMovies());
      }
    })
    .catch(error => {
      console.log('Error getting movies: ', error.message);
      dispatch(getMoviesError(error.message));
    });
};

// The function below is a thunk and allows us to perform async logic.
// getMoreMovies is used to load the next page of movies
export const getMoreMovies = searchTerm => (dispatch, getState) => {
  const pageInfo = getState().movie.pageInfo;
  if (pageInfo.currentPage < pageInfo.numPages) {
    axios.get(`/getMovies/${searchTerm}/${pageInfo.currentPage + 1}`)
      .then(response => {
        if(response.data.Response === 'True') {
          dispatch(processMoreMovies(response.data));
        }
      })
      .catch(error => {
        console.log('Error getting movies: ', error.message);
        dispatch(getMoviesError(error.message));
      });
  }
};

// selectors
export const selectMovies = state => state.movie.movies;
export const selectError = state => state.movie.error;
export const selectResultsEmpty = state => state.movie.resultsEmpty;
export const selectPageInfo = state => state.movie.pageInfo;

export default movieSlice.reducer;
