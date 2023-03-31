import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import MovieCard from './MovieCard';
import AddReviewForm from './AddReviewForm';

function AddReview(props) {
    const [movie, setMovie] = useState({});
    const {id} = useParams();
    
    useEffect(() => {
        axios
        .get(`http://localhost:8082/movie/${id}`)
        .then((res) => {
            setMovie(res.data.movie);
        }).catch((err) => {
            console.log(`Error in Show Movie: ${err}`);
        })
    }, [movie]);

    return (
        <div className='ShowMovieWithReviews'>
        <div className='container'>
            <div className='row'>
            <div className='col-md-12'>
                <br/>
                <Link to={`/movie/${id}`} className='btn btn-outline-warning float-left'>
                        Back
                </Link>
                <Link to='/showList' className='btn btn-outline-warning float-left'>
                    Show Movie List
                </Link>
                <Link to='/' className='btn btn-outline-warning float-right' onClick={() => sessionStorage.clear()}>Sign Out</Link>
                <br /><br/>
                <h2 className='display-4 text-center'>Movie</h2>
            </div>
            <div className='col-md-11'>
            </div>
            </div>
            <div className='list text-center'>
                <MovieCard movie={movie} key={movie.id} disabled={'disabled-link'}/>
            </div>
            <div>
                <AddReviewForm movie={movie} key={movie.id} user={props.token}/>
            </div>
        </div>
    </div>
    );
};

export default AddReview;