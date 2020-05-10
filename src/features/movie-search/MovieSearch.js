import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getMovies,
  clearError,
  deleteMovie,
  selectMovies,
  selectError,
} from './movieSlice';
import { MovieInfo } from './MovieInfo';
import { makeStyles } from '@material-ui/core/styles';
import {
  Grid,
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText,
} from '@material-ui/core';
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

  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState('');
  const [dialog, setDialog] = useState({
    open: false,
    message: '',
  });

  const handleDialogOpen = message => {
    setDialog({open: true, message: message});
  };

  const handleDialogClose = () => {
    setDialog({open: false, message: ''});
  };

  const deleteMovieById = imdbID => {
    dispatch(deleteMovie(imdbID));
  };

  const handleSubmit = () => {
    if (searchTerm === '') {
      handleDialogOpen('Search term is required');
    } else {
      dispatch(getMovies(searchTerm));
    }
  }

  const classes = useStyles();

  return (
    <div>
      <div>
        <Dialog
          open={dialog.open}
          onClose={handleDialogClose}
        >
          <DialogTitle>{dialog.message}</DialogTitle>
          <DialogActions>
            <Button onClick={handleDialogClose} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <Dialog
          open={error !== false}
          onClose={() => dispatch(clearError())}
        >
          <DialogTitle>Error retrieving movies</DialogTitle>
          <DialogContent>
            <DialogContentText>{error}</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => dispatch(clearError())} color="primary">
              OK
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <div>
        <TextField
          value={searchTerm}
          label="Search for a movie"
          onChange={e => setSearchTerm(e.target.value)}
        />
        <Button
          variant="contained"
          color="primary"
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
