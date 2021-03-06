import './App.css';
import HomePage from './Pages/homepage/homepage.component';
import MoviePage from './Pages/movie-page/movie-page.component';
import { Routes, Route } from "react-router-dom";
import CustomHeader from './Components/custom-header/custom-header.component';
import Navbar from './Components/navbar/navbar.component';

function App() {
  return (
  <div className='App'>
    <CustomHeader/>
    <Navbar/>
    <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="movie/:movieId" element={<MoviePage />} />
      </Routes> 
  </div>
  );
}

export default App;
