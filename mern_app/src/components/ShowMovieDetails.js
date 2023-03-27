import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import AddReviewForm from './AddReviewForm';
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
            <br />
                <Link to='/showList' className='btn btn-outline-warning float-left'>
                    Show Movie List
                </Link>
                <Link to='/' className='btn btn-outline-warning float-right'>Sign Out</Link>
                <br />
                <br /> <br />
                <h2 className='display-4 text-center'>Movie</h2>
            </div>

            <div className='col-md-11'>
            </div>
            </div>
            <div className='list text-center'>
                <MovieCard movie={movie} key={movie.id} disabled={'disabled-link'}/>
            </div>
            <div>
                <ShowReviews reviews={reviews} />
            </div>
            <Link to={`/movie/${id}/addReview`} className='btn btn-outline-warning float-left'>
                    Add Review
            </Link>
        </div>
    </div>
    );
};

export default ShowMovieDetails;