import { configureStore } from '@reduxjs/toolkit';
import movieSearchReducer from '../features/movie-search/movieSlice';

export default configureStore({
  reducer: {
    movie: movieSearchReducer,
  },
});
