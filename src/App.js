import './App.css';
import HomePage from './Components/homepage/homepage.component';
import MoviePage from './Pages/movie-page/movie-page.component';
import { Routes, Route } from "react-router-dom";
import CustomHeader from './Components/header/custom-header.component';

function App() {
  return (
  <div className='App'>
    <CustomHeader/>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="movie/:movieId" element={<MoviePage />} />
      </Routes> 
  </div>
  );
}

export default App;
