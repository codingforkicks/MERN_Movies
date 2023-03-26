/*
only users can use this form to review a movie from the movies list (addReview api)
*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/style.css';
import { Slider } from '@mui/material';

const ReviewForm = (props) => {
    //define state with useState
    const navigate = useNavigate();
    const [movie, setMovie] = useState({
        title: '',
        year: '',
        genre: ''
    });

    const [review, setReview] = useState({
        enteredBy: '',
        movie: null,
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

        axios
        .post('http://localhost:8082/addReview', review)
        .then((res) => {
            console.log(res);
            setMovie({
                title: '',
                year: '',
                genre: ''
            });
            setReview({
                enteredBy: '',
                movie: null,
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
                <br />
                <Link to='/showList' className='btn btn-outline-warning float-left'>
                Show Movie List
                </Link>
                <Link to='/' className='btn btn-outline-warning float-right'>
                Sign Out
                </Link>
            </div>
            <div className='col-md-8 m-auto'>
                <h1 className='display-4 text-center'>Add Review</h1>
                <p className='lead text-center'>Write your review below</p>

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
                    value={''}
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
                    minLength={20}
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

export default ReviewForm;