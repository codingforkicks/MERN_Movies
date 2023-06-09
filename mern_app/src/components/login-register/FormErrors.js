/* display form error messages */

import React from 'react';
import '../../styles/style.css';

export const FormErrors = ({ formErrors }) =>
    <div className='formErrors restricted'>
        {Object.keys(formErrors).map((fieldName, i) => {
            if(formErrors[fieldName].length > 0){
                return (
                <p key={i}>{fieldName} {formErrors[fieldName]}</p>
                )        
            } else {
                return '';
            }
        })}
    </div>

export default FormErrors;