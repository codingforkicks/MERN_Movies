import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import CreateMovie from './components/CreateMovie';
import ShowMovieList from './components/ShowMovieList';
import ShowMovieDetails from './components/ShowMovieDetails';
import Unauthorized from './components/Unauthorized';
import AddReview from './components/AddReview';
import AdminModule from './components/AdminModule';
import useToken from './components/hooks/useToken';

const App = () => {
  const { token, setToken } = useToken();

  if(!token) {
    return (
      <BrowserRouter>
        <Login setToken={setToken} />
      </BrowserRouter>
    )
  }

  if (!token.admin) {
    return (
      <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Login setToken={setToken}/>} />
            <Route path='/showList' element={<ShowMovieList admin={token.admin}/>} />
            <Route path='/movie/:id' element={<ShowMovieDetails />} />
            <Route path='/movie/:id/addReview' element={<AddReview token={token}/>} />
            {['/404', '/register', '/addMovie', '/adminScreen'].map((path, index) => 
              <Route path={path} element={<Unauthorized/>} key={index} />
            )}
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
          )}
        </Routes>
    </BrowserRouter>
  );
};

export default App;