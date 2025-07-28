import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieListingApp from './components/MovieListingApp';

function App() {
  return (
    <div>
      <Router>
        
        <Routes>
          <Route path='/' element={<MovieListingApp />} />
        </Routes>
      </Router>
    </div>
  );

}

export default App;
