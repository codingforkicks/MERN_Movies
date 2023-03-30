import React, { useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Login from './components/Login';
import Register from './components/Register';
import CreateMovie from './components/CreateMovie';
import ShowMovieList from './components/ShowMovieList';
import ShowMovieDetails from './components/ShowMovieDetails';
import AddReview from './components/AddReview';

//store token in session data
function setToken(userToken) {
  sessionStorage.setItem('token', JSON.stringify(userToken));
};

//get token from session data
function getToken(){
  //retrieve token
  const tokenString = sessionStorage.getItem('token');
  //turn token to obj
  const userToken = JSON.parse(tokenString);
  //return token obj
  return userToken?.token;
}

const App = () => {
  // const [token, setToken] = useState();
  // console.log('appjs: token')
  const token = getToken();
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
          <Route path='/showList' element={<ShowMovieList />} />
          <Route path='/addMovie' element={<CreateMovie />} />
          <Route path='/movie/:id' element={<ShowMovieDetails />} />
          <Route path='/movie/:id/addReview' element={<AddReview token={token}/>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
};

export default App;