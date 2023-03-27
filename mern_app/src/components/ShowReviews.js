/*
in this page you can see all the reviews for a given movie
*/

import React, { useState, useEffect } from 'react';
import '../App.css';
import axios from 'axios';
import { Link, useParams, useNavigate } from 'react-router-dom';
import ReviewCard from './ReviewCard';

function ShowReviews() {
    const [reviews, setReviews] = useState([]);
    const {id} = useParams();
    
    useEffect(() => {
        axios
        .get(`http://localhost:8082/reviews/${id}`)
        .then((res) => {
            setReviews(res.data.reviews);
        }).catch((err) => {
            console.log(`Error in Show Movie: ${err}`);
        })
    }, [reviews]);

    //map through indivdual reviews
    const reviewList = 
        reviews.length === 0 
        ? 'Sorry, there are no reviews for this movie' 
        : reviews.map((review) => {
            // console.log(`review: ${review}
            // review.description: ${review.description}
            // review.rating ${review.rating}
            // `);
            <ReviewCard review={review} />
        });

    return (
        <div className='ShowMovieList'>
        <div className='container'>
            <div className='row'>
            <div className='col-md-12'>
                <br />
                <h2 className='display-4 text-center'>Review List</h2>
            </div>
            <div className='col-md-11'>
            </div>
            </div>
            <div className='list'>{reviewList}</div>
            <div>
                <ReviewCard review={reviews} />
            </div>
        </div>
    </div>
    );
};

export default ShowReviews;