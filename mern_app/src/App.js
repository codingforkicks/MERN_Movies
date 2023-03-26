import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import CreateMovie from './components/CreateMovie';
import ShowMovieList from './components/ShowMovieList';
// import MovieCard from './components/MovieCard';


const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route path='/showList' element={<ShowMovieList />} />
          <Route path='/addMovie' element={<CreateMovie />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;