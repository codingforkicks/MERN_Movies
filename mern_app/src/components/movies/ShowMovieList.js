/*
in this page you can see all the movies title, genre, year
*/

import React, { useState, useEffect } from 'react';
import '../../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import MovieCard from './MovieCard';
import HeaderBar from '../other/HeaderBar';

function ShowMovieList(props) {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        axios
        .get('http://localhost:8082/movies')
        .then((res) => {
            setMovies(res.data);
        }).catch((err) => {
            console.log(`Error in Show Movie List: ${err}`);
        });
    }, []);

    //map through indivdual movies
    const movieList = 
        movies.length === 0 
        ? 'Sorry, there are no movies' : movies.map((movie) => 
            <MovieCard movie={movie} key={movie.id} />
        );

    return (
        <div className='ShowMovieList'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <HeaderBar />
                        <h2 className='display-4 text-center'>Movie List</h2>
                        <hr />
                    </div>
    
                    {props.admin ? <div className='col-md-12'>  
                        <Link
                        to='/adminScreen'
                        className='btn btn-outline-warning float-right'
                        >
                        + Admin Module
                        </Link>
                        <br />
                        <br />
                        </div> : <div className='col-md-12'>  
                            <Link
                            to='/register'
                            className='btn btn-outline-warning float-right'
                            >
                            + Register
                            </Link>
                            <br />
                            <br />
                        </div>
                    }
                </div>
                <div className='list text-center'>{movieList}</div>
            </div>
        </div>
    );
};

export default ShowMovieList;