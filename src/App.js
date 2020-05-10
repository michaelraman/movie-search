import React from 'react';
import { MovieSearch } from './features/movie-search/MovieSearch';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <MovieSearch />
      </header>
    </div>
  );
}

export default App;
