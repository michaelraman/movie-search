import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getMovies,
  deleteMovie,
  selectMovies,
  selectError,
} from './movieSlice';
import { MovieInfo } from './MovieInfo';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Button, TextField } from '@material-ui/core';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export function MovieSearch() {
  const movies = useSelector(selectMovies);
  const error = useSelector(selectError);

  if (error !== false) {
    alert('There was en error retrieving movies: '.concat(error));
  }

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');

  const deleteMovieById = imdbID => {
    dispatch(deleteMovie(imdbID));
  };

  const handleSubmit = () => {
    if (searchTerm === '') {
      alert('Search term is required.');
    } else {
      dispatch(getMovies(searchTerm));
    }
  }

  const classes = useStyles();

  return (
    <div>
      <div>
        <TextField
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
          size="small"
          className={classes.button}
          startIcon={<ArrowForwardIcon />}
          onClick={handleSubmit}
        >
          Submit
      </Button>
      </div>
      <div className={classes.root}>
          <Grid
            container
            spacing={2}
            alignItems="center"
            justify="center"
          >
            {
              movies.map((movie, i) => {
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
