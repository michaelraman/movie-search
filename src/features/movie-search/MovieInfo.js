import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, Paper, Button, Typography } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles(theme => ({
  paper: {
    padding: theme.spacing(2),
    margin: '5%',
  },
  img: {
    margin: 'auto',
    display: 'block',
    width: '100%',
  },
  button: {
    margin: theme.spacing(1),
  },
}));

export function MovieInfo({title, year, poster, imdbID, deleteMovie}) {
  const classes = useStyles();

  return (
    <Grid item>
      <Paper className={classes.paper}>
        {poster !== 'N/A' && <img className={classes.img} alt={'Movie poster'} src={poster} />}
        <Typography variant="h6">{title}</Typography>
        <Typography variant="h6">({year})</Typography>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          className={classes.button}
          startIcon={<DeleteIcon />}
          onClick={() => deleteMovie(imdbID)}
        >
          Delete
        </Button>
      </Paper>
    </Grid>
  );
}
