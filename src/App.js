import React from 'react';
import { MovieSearch } from './features/movie-search/MovieSearch';
import { Typography, Link } from '@material-ui/core';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Typography variant="h4" style={{margin: '1%'}}>
          <Link href="/" color="inherit" underline="none">
            Movie Search
          </Link>
        </Typography>
        <MovieSearch />
      </header>
    </div>
  );
}

export default App;
