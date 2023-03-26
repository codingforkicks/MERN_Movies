/*
When a user login in they can see the list of all movies entered by the admin (movies page),
they can click on a movie to see reviews and average rating (movie page).

When an admin login in they can see a link to the register page (can add an admin), add
movie page
*/

import React from 'react';
import Form from './GeneralForm';

const Login = (props) => {
    return(
        <Form 
            url='login'
            header='Login using your credentials' 
            buttonTitle='Register' 
            redirectMessage={'Don\'t have an account?\nClick below to Register'}
            buttonForward='/register'
            successForward='/showList'
        >
        </Form>
    );
};

export default Login;