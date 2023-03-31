/*
only users are registered with this page (register api), to register an admin you need to login as
an admin. You can add the first admin from the MongoDb server directly.
*/

import React from 'react';
import Form from './GeneralForm';

const Register = (props) => {
    return(
        <Form 
            url='register'
            header='Register to see and review your favorite movies' 
            buttonTitle='Login' 
            redirectMessage={'Already have an account?\nClick below to Login'}
            buttonForward='/'
            successForward='/'
            isAdminUser={props.admin}
        >
        </Form>
    );
};

export default Register;