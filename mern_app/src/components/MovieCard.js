/*Individual view for each movie*/

import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const MovieCard = (props) => {
    const movie = props.movie;

    return (
        <div className='card-container'>
            <img
                // image placeholder for movies
                src='https://unsplash.com/photos/dWYjy9zIiF8'
                alt='Movie'
                height={200}
            />
            <div className='desc'>
                <h2>
                <Link to={`/reviews/${movie._id}`}>{movie.title}</Link>
                </h2>
                <h3>{movie.year}</h3>
                <p>{movie.genre}</p>
            </div>
        </div>
    )
};

export default MovieCard;