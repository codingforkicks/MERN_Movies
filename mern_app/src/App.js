import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './components/login-register/Login';
import Register from './components/login-register/Register';
import CreateMovie from './components/movies/CreateMovie';
import ShowMovieList from './components/movies/ShowMovieList';
import ShowMovieDetails from './components/movies/ShowMovieDetails';
import Unauthorized from './components/other/Unauthorized';
import AddReview from './components/reviews/AddReview';
import AdminModule from './components/other/AdminModule';
import useToken from './components/hooks/useToken';

const App = () => {
  const { token, setToken } = useToken();

  if(!token) {
    return (
      <BrowserRouter>
        <Login setToken={setToken} />
      </BrowserRouter>
    );
  };

  if (!token.admin) {
    return (
      <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Login setToken={setToken}/>} />
            <Route exact path='/register' element={<Register admin={token.admin}/>} />
            <Route path='/showList' element={<ShowMovieList admin={token.admin}/>} />
            <Route path='/movie/:id' element={<ShowMovieDetails />} />
            <Route path='/movie/:id/addReview' element={<AddReview token={token}/>} />
            {['/404', '/addMovie', '/adminScreen'].map((path, index) => 
              <Route path={path} element={<Unauthorized/>} key={index} />
            )};
          </Routes>
      </BrowserRouter>
    );
  };
  
  return (
    <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Login setToken={setToken}/>} />
          <Route exact path='/register' element={<Register admin={token.admin}/>} />
          <Route path='/showList' element={<ShowMovieList admin={token.admin}/>} />
          <Route path='/addMovie' element={<CreateMovie />} />
          <Route path='/adminScreen' element={<AdminModule />} />
          <Route path='/movie/:id' element={<ShowMovieDetails />} />
          <Route path='/movie/:id/addReview' element={<AddReview token={token}/>} />
          {['/404'].map((path, index) => 
            <Route path={path} element={<Unauthorized/>} key={index} />
          )};
        </Routes>
    </BrowserRouter>
  );
};

export default App;