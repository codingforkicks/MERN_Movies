/*Individual view for each movie*/

import React from 'react';
import { Link } from 'react-router-dom';
import '../../App.css';

const MovieCard = (props) => {
    const img = 'https://images.unsplash.com/photo-1560109947-543149eceb16?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=735&q=80'
    const movie = props.movie;

    return (
        <div className='card-container'>
            <img
                // image placeholder for movies
                src={img}
                height={200}
            />
            <div className='desc'>
                <h2>
                <Link to={`/movie/${movie.id}`} className={props.disabled}>{movie.title}</Link>
                </h2>
                <h3>{movie.year}</h3>
                <p>{movie.genre}</p>
            </div>
        </div>
    );
};

export default MovieCard;