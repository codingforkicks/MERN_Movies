/*Individual view for each review*/

import React from 'react';
import '../../App.css';

const ReviewCard = (props) => {
    const ReviewItem = (
        <div>
            <table className='table table-hover table-dark'>
                <tbody>
                    <tr>
                        <th scope='row'>Description:</th>
                        <td>{props.review.description}</td>
                        <th scope='row'>Rating:</th>
                        <td>{props.review.rating}</td>
                    </tr>
                </tbody>
                <tfoot>
                    &ensp; Entered By: {props.review._id}
                </tfoot>
            </table>
        </div>
    );

    return (
        <div className='card-container'>
            <div className='desc'>
                {ReviewItem}
            </div>
        </div>
    );
};

export default ReviewCard;