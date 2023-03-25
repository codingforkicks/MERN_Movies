/*
can see all reviews and rating (reviews/:movieId api) should have a review button that takes the
user to review form, in this step the info of the movie and user should be sent over to the review form
somehow.
*/

import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import '../App.css';
import axios from 'axios';

function ShowMovieDetails(props) {
    const [movie, setMovie] = useState({});

    const {id} = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        axios
        .get(`http://localhost:8082/reviews/${id}`)
        .then((res) => {
            console.log(res.data);
            setMovie(res.data);
        }).catch((err) => {
            console.log(`Error from ShowMovieDetails: ${err}`);
        });
    }, [id]);

    const onDeleteClick = (id) => {
        axios
        .delete(`http://localhost:8082/reviews/${id}`)
        .then((res) => {
            console.log("delete successful");
            navigate('/');
        }).catch((err) => {
            console.log(`Error from ShowMovieDetails delete: ${err}`);
        });
    };

    const MovieItem = (
        <div>
            <table className='table table-hover table-dark'>
                <tbody>
                <tr>
                    <th scope='row'>1</th>
                    <td>Title</td>
                    <td>{movie.title}</td>
                </tr>
                <tr>
                    <th scope='row'>2</th>
                    <td>Year</td>
                    <td>{movie.year}</td>
                </tr>
                <tr>
                    <th scope='row'>3</th>
                    <td>Genre</td>
                    <td>{movie.genre}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );

    return (
        <div className='ShowMovieDetails'>
            <div className='container'>
                <div className='row'>
                <div className='col-md-10 m-auto'>
                    <br /> <br />
                    <Link to='/' className='btn btn-outline-warning float-left'>
                    Show Movie List
                    </Link>
                </div>
                <br />
                <div className='col-md-8 m-auto'>
                    <h1 className='display-4 text-center'>Movie's Record</h1>
                    <p className='lead text-center'>View Movie's Info</p>
                    <hr /> <br />
                </div>
                <div className='col-md-10 m-auto'>{BookItem}</div>
                <div className='col-md-6 m-auto'>
                    <button
                    type='button'
                    className='btn btn-outline-danger btn-lg btn-block'
                    onClick={() => {
                        onDeleteClick(movie._id);
                    }}
                    >
                    Delete Review
                    </button>
                </div>
                {/* option to edit review if already exists
                    <div className='col-md-6 m-auto'>
                    <Link
                    to={`/reviews/edit/${movie._id}`}
                    className='btn btn-outline-info btn-lg btn-block'
                    >
                    Edit Review
                    </Link>
                </div> */}
                </div>
            </div>
        </div>
    );
};

export default ShowMovieDetails;