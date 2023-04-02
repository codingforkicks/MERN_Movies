/*
in this page you can see all the reviews for a given movie
*/

import React, { useState, useEffect } from 'react';
import '../../App.css';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReviewCard from './ReviewCard';

function ShowReviews() {
    const [reviews, setReviews] = useState([]);
    const [avgRating, setAvgRating] = useState();
    const {id} = useParams();
    
    useEffect(() => {
        axios
        .get(`http://localhost:8082/reviews/${id}`)
        .then((res) => {
            setReviews(res.data.reviews);
            setAvgRating(res.data.averageRating);
        }).catch((err) => {
            console.log(`Error in Show Movie: ${err}`);
        })
    }, []);

    //map through indivdual reviews
    const reviewList = 
        reviews.length === 0 
        ? 'Sorry, there are no reviews for this movie' : reviews.map((review) =>
            <ReviewCard review={review} key={review.id} avgRating={avgRating}/>
        );

    return (
        <div className='ShowMovieList'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-12'>
                        <br />
                        <h2 className='display-4 text-center'>Review List</h2>
                        <span className='rating'> Average Rating: {avgRating}</span>
                        <br/>
                    </div>
                </div>
                <div className='reviewList'>{reviewList}</div>
            </div>
        </div>
    );
};

export default ShowReviews;