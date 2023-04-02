/*Individual view for each review*/

import React from 'react';
import '../../App.css';

const ReviewCard = (props) => {
    const ReviewItem = (
        <div>
            <table className='table table-hover table-dark'>
                <tbody>
                    <tr>
                        <th scope='row' className='reviewTitle'>Description:</th>
                        <td>{props.review.description}</td>
                    </tr>
                    <tr>
                        <th scope='row' className='reviewTitle'>Rating:</th>
                        <td>{props.review.rating}</td>
                    </tr>
                </tbody>
                <tfoot className='reviewFooter'>
                    &ensp; Entered By: {props.review._id}
                </tfoot>
            </table>
        </div>
    );

    return (
        <div className='review-container'>
            <div className='reviews'>
                {ReviewItem}
            </div>
        </div>
    );
};

export default ReviewCard;