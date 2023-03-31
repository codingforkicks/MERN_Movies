/*
only an admin can add a new movie (addMovie api)
*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import HeaderBar from './HeaderBar';

const CreateMovie = (props) => {
    //define state with useState
    const navigate = useNavigate();
    const [movie, setMovie] = useState({
        title: '',
        year: '',
        genre: ''
    });

    //set event listener
    const onChange = (e) => {
        setMovie({...movie, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();

        axios
        .post('http://localhost:8082/addMovie', movie)
        .then((res) => {
            console.log(res);
            setMovie({
                title: '',
                year: '',
                genre: ''
            });

            navigate('/showList');
        })
        .catch((err) => {
            console.log(`Error in create movie: ${err}`);
        });
    };

    return (
        <div className='CreateMovie'>
        <div className='container'>
            <div className='row'>
            <div className='col-md-8 m-auto'>
                <HeaderBar />
            </div>
            <div className='col-md-8 m-auto'>
                <h1 className='display-4 text-center'>Add Movie</h1>
                <p className='lead text-center'>Create new movie</p>

                <form noValidate onSubmit={onSubmit}>
                <div className='form-group'>
                    <input
                    type='text'
                    placeholder='Title of the Movie'
                    name='title'
                    className='form-control'
                    value={movie.title}
                    onChange={onChange}
                    required
                    />
                </div>
                <br />
                <div className='form-group'>
                    <input
                    type='number'
                    placeholder='Year'
                    name='year'
                    className='form-control'
                    min="1895"
                    max="3000"
                    value={movie.year}
                    onChange={onChange}
                    required
                    />
                </div>
                <div className='form-group'>
                    <input
                    type='text'
                    placeholder='Genre'
                    name='genre'
                    className='form-control'
                    value={movie.genre}
                    onChange={onChange}
                    required
                    />
                </div>
                <input
                    type='submit'
                    className='btn btn-outline-warning btn-block mt-4'
                />
                </form>
            </div>
            </div>
        </div>
        </div>
    );
};

export default CreateMovie;