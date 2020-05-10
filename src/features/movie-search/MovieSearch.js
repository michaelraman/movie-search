import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getMovies,
  deleteMovie,
  selectMovies,
} from './movieSlice';
import { MovieInfo } from './MovieInfo';
import Grid from '@material-ui/core/Grid';

export function MovieSearch() {
  const movies = useSelector(selectMovies);
  console.log(movies);
  const dispatch = useDispatch();
  const [searchTerm, setSearchTerm] = useState('');

  const deleteMovieById = imdbID => {
    dispatch(deleteMovie(imdbID));
  };

  return (
    <div>
      <div>
        <input
          aria-label="Submit"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button
          onClick={() =>
            dispatch(getMovies(searchTerm))
          }
        >
          Submit
        </button>
      </div>
      <div>
        <Grid container spacing={2}>
          {
            movies
              .filter(movie => movie.Deleted === false)
              .map((movie, i) => {
                return(
                  <MovieInfo
                    key = {i}
                    title = {movie.Title}
                    year = {movie.Year}
                    poster = {movie.Poster}
                    imdbID = {movie.imdbID}
                    deleteMovie = {deleteMovieById}
                  />
                )
              })
          }
        </Grid>
      </div>
    </div>
  );
}
