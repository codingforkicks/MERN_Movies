/*
in this page you can see all the movies title, genre, year
*/

import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

function ShowMovieList() {
    const [movies, setMovies] = useState([]);
    
    useEffect(() => {
        axios
        .get('http://localhost:8082/movies')
        .then((res) => {
            console.log(res.data);
            setMovies(res.data);
        }).catch((err) => {
            console.log(err.response);
            console.log(`Error in Show Movie List: ${err}`);
        });
    }, []);

    //map through indivdual movies
    // const movieList = 
    //     movies.length ==== 0 
    //     ? 'Sorry, there are no movies' 
    //     : movies.map((movie, i) => <MovieCard moovie={movie} />);

    return (
        <div className='ShowMovieList'>
        <div className='container'>
            <div className='row'>
            <div className='col-md-12'>
                <br />
                <h2 className='display-4 text-center'>Movie List</h2>
            </div>

            <div className='col-md-11'>
                {/*
                Add conditional "add movie" render for admin user                 
                <Link
                to='/addMovie'
                className='btn btn-outline-warning float-right'
                >
                + Add New Movie
                </Link> */}
                <br />
                <br />
                <hr />
            </div>
            </div>
            {/* <div className='list'>{movieList}</div> */}
        </div>
    </div>
    );
};

export default ShowMovieList;