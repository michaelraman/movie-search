import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import DeleteIcon from '@material-ui/icons/Delete';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    margin: '5%',
  },
  img: {
    margin: 'auto',
    display: 'block',
  },
}));

export function MovieInfo({title, year, poster, imdbID, deleteMovie}) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <Grid container spacing={2}>
          <Grid item>
            {poster !== 'N/A' && <img className={classes.img} alt={'Movie poster'} src={poster} />}
            {title}, {year}
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              startIcon={<DeleteIcon />}
              onClick={() => deleteMovie(imdbID)}
            >
              Delete
          </Button>
          </Grid>
        </Grid>
      </Paper>
    </div>
  );
}
