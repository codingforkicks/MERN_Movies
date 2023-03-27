/*
only users can use this form to review a movie from the movies list (addReview api)
does not work....need to get enteredBy value
*/

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';
import { Slider } from '@mui/material';

const AddReviewForm = (props) => {
    //define state with useState
    const navigate = useNavigate();

    const defaultUser = "6420dfcbe275a96fdea1ed5a";

    const [review, setReview] = useState({
        enteredBy: defaultUser,
        movie: props.movie._id,
        description: '',
        rating: 5,
    });

    //set event listener
    const onChange = (e) => {
        setReview({...review, [e.target.name]: e.target.value});
        console.log(`target.name: ${e.target.name}
        target.value ${e.target.value}`);
    };

    const onSubmit = (e) => {
        e.preventDefault();
        console.log(`review: ${Object.entries(review)}`);
        console.log(`movie: ${Object.entries(props.movie)}`);

        axios
        .post('http://localhost:8082/addReview', review)
        .then((res) => {
            console.log(`movie: ${props.movie._id}`);
            console.log(res);
            setReview({
                enteredBy: defaultUser,
                movie: props.movie._id,
                description: '',
                rating: 5,
            })

            navigate('/showList');
        })
        .catch((err) => {
            console.log(`Error in create movie: ${err}`);
        });
    };

    return (
        <div className='AddReview'>
        <div className='container'>
            <div className='row'>
            <div className='col-md-8 m-auto'>
            </div>
            <div className='col-md-8 m-auto'>
                <h1 className='display-4 text-center'>Add Review</h1>
                <p className='lead text-center'>Write your review for {props.movie.title} below</p>

                <form onSubmit={onSubmit}>
                <div className='form-group'>
                    <input
                    type='text'
                    name='username'
                    className='form-control'
                    value={props.username}
                    readOnly
                    />
                </div>
                <div className='form-group'>
                    <input
                    type='text'
                    placeholder='movie title'
                    name='title'
                    className='form-control'
                    value={props.movie.title}
                    readOnly
                    />
                </div>
                <br />
                <label>Review: </label>
                <div className='form-group'>
                    <textarea
                    type='textarea'
                    placeholder='Reviews have a maximum length of 120 characters'
                    name='description'
                    minLength={10}
                    maxLength={120}
                    className='form-control'
                    onChange={onChange}
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
                        required
                    />
                </div>
                <input
                    type='submit'
                    className='btn btn-outline-warning btn-block mt-4'
                />
                </form>
            </div>
            </div>
        </div>
        </div>
    );
};

export default AddReviewForm;