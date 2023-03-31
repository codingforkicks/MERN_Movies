import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import CreateMovie from './components/CreateMovie';
import ShowMovieList from './components/ShowMovieList';
import ShowMovieDetails from './components/ShowMovieDetails';
import AddReview from './components/AddReview';
import useToken from './components/hooks/useToken';
import Unauthorized from './components/other/Unauthorized';

const App = () => {
  const { token, setToken } = useToken();

  console.log('app.js');
  console.log(token);

  if(!token) {
    return (
      <BrowserRouter>
        <Login setToken={setToken} />
      </BrowserRouter>
    )
  }

  return (
    <BrowserRouter>
      <div>
        <Routes>
          <Route exact path='/' element={<Login setToken={setToken}/>} />
          <Route exact path='/register' element={<Register />} />
          <Route path='/showList' element={<ShowMovieList admin={token.admin}/>} />
          <Route path='/addMovie' element={<CreateMovie />} />
          <Route path='/movie/:id' element={<ShowMovieDetails />} />
          <Route path='/movie/:id/addReview' element={<AddReview token={token}/>} />
          <Route path='/404' element={<Unauthorized />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;