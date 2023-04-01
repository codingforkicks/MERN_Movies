/*
only users can use this form to review a movie from the movies list (addReview api)
does not work....need to get enteredBy value
*/

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Slider } from '@mui/material';
import '../../styles/style.css';

const AddReviewForm = (props) => {
    //define state with useState
    const navigate = useNavigate();
    let movieId = props.movie._id;

    useEffect(() => {
        movieId = props.movie_id;
    }, []);

    const [review, setReview] = useState({
        enteredBy: props.user.id,
        movie: movieId,
        description: '',
        rating: 5,
    });

    //set event listener
    const onChange = (e) => {
        setReview({...review, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();

        setReview({...review, movie: movieId});

        axios
        .post('http://localhost:8082/addReview', review)
        .then((res) => {
            console.log(res);
            setReview({
                enteredBy: props.user.id,
                movie: movieId,
                description: '',
                rating: 5,
            });
            
            alert('review created');
            navigate('/showList');
        })
        .catch((err) => {
            console.log(`Error in create movie: ${err}`);
            alert('You\'ve already reviewed this movie');
            navigate('/showList');
        });
    };

    return (
        <div className='AddReviewForm'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        <h1 className='display-4 text-center'>Add Review</h1>
                        <p className='lead text-center'>Hi {props.user.name}! Write your review for {props.movie.title} below</p>

                        <form onSubmit={onSubmit}>
                            <label>Review: </label>
                            <div className='form-group'>
                                <textarea
                                type='textarea'
                                placeholder='Reviews must have a length between 10 and 120 characters'
                                name='description'
                                minLength={10}
                                maxLength={120}
                                className='form-control'
                                onChange={onChange}
                                onFocus={onChange}
                                onBlur={onChange}
                                required
                                />
                            </div>
                            <label>Rating:</label>
                            <div className='form-group'>
                                <Slider
                                    name='rating'
                                    aria-label="Temperature"
                                    defaultValue={5}
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={1}
                                    max={5}
                                    onChange={onChange}
                                    onFocus={onChange}
                                    onBlur={onChange}
                                    required
                                />
                            </div>
                            <input
                                type='submit'
                                className='btn btn-outline-warning btn-block mt-4'
                                disabled={review.description.length < 10 || review.description.length > 120}
                            />
                            <br/><br/>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddReviewForm;