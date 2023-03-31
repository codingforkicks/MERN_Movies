import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import HeaderBar from './HeaderBar';
import ShowReviews from './ShowReviews';

function ShowMovieDetails() {
    const [movie, setMovie] = useState({});
    const [reviews, setReviews] = useState({});

    const {id} = useParams();
    const navigate = useNavigate();
    
    useEffect(() => {
        axios
        .get(`http://localhost:8082/movie/${id}`)
        .then((res) => {
            setMovie(res.data.movie);
            axios
                .get(`http://localhost:8082/reviews/${id}`)
                .then((res) => {
                    setReviews(res.data);
            })
        }).catch((err) => {
            console.log(`Error in Show Movie: ${err}`);
        })
    }, []);

    return (
        <div className='ShowMovieDetails'>
        <div className='container'>
            <div className='row'>
            <div className='col-md-12'>
                <HeaderBar />
                <h2 className='display-4 text-center'>Movie</h2>
            </div>
            </div>
            <div className='list text-center'>
                <MovieCard movie={movie} key={movie.id} disabled={'disabled-link'}/>
            </div>
            <div>
                <ShowReviews reviews={reviews} />
            </div>
            <div className='col-md-12'>
                <Link to={`/movie/${id}/addReview`} className='btn btn-outline-warning float-right'>
                        Add Review
                </Link>
            </div>
            <br />
        </div>
    </div>
    );
};

export default ShowMovieDetails;