import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import CreateMovie from './components/CreateMovie';
import ShowMovieList from './components/ShowMovieList';
import ShowMovieDetails from './components/ShowMovieDetails';
import ReviewForm from './components/ReviewForm';


const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route path='/showList' element={<ShowMovieList />} />
          <Route path='/addMovie' element={<CreateMovie />} />
          <Route path='/addReview' element={<ReviewForm username='default user'/>} />
          <Route path='/reviews/:id' element={<ShowMovieDetails />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;