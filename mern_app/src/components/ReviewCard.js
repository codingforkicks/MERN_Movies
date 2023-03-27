/*Individual view for each review*/

import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../App.css';

const ReviewCard = (props) => {
    const review = props.review;

    useEffect(() => {
        console.log(props.review);

    }, []);

    const ReviewItem = (
        <div>
            <table className='table table-hover table-dark'>
                <tbody>
                <tr>
                    <th scope='row'>enteredBy</th>
                    <td>{}</td>
                </tr>
                <tr>
                    <th scope='row'>Rating</th>
                    <td>{}</td>
                </tr>
                </tbody>
            </table>
        </div>
    );

    return (
        <div className='card-container'>
            <div className='desc'>
                {ReviewItem}
            </div>
        </div>
    )
};

export default ReviewCard;