import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import CreateMovie from './components/CreateMovie';
import ShowMovieList from './components/ShowMovieList';
import ShowMovieDetails from './components/ShowMovieDetails';
import AddReview from './components/AddReview';


const App = () => {
  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path='/' element={<Login />} />
          <Route exact path='/register' element={<Register />} />
          <Route path='/showList' element={<ShowMovieList />} />
          <Route path='/addMovie' element={<CreateMovie />} />
          <Route path='/movie/:id' element={<ShowMovieDetails />} />
          <Route path='/movie/:id/addReview' element={<AddReview />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;