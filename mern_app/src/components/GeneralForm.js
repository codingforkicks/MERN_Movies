/*Form used for Login and Register */

import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import FormErrors from './FormErrors';

const Form = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: '',
        admin: false
    });

    const [formErrors, setValidation] = useState({
        errors: {username: '', password: ''},
        usernameValid: false,
        passwordValid: false,
        formValid: false
    });

    //set event listener
    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
        setValidation({

        })
    };

    const onSubmit = (e) => {
        e.preventDefault();

        axios
        .post(`http://localhost:8082/${props.url}`, user)
        .then((res) => {
            if(res.status)
            console.log(res);
            setUser({
                username: '',
                password: '',
                admin: false
            });

            navigate(props.successForward);
        })
        .catch((err) => {
            console.log(`Error in Form: ${err}`);
        });
    };

    return(
        <div className='GeneralForm'>
        <div className='container'>
            <div className='row'>
            <div className='col-md-8 m-auto'>
                <br />
            </div>
            <div className='col-md-8 m-auto'>
                <h1 className='display-4 text-center'>123 Movies</h1>
                <p className='lead text-center'>{props.header}</p>

                <form noValidate onSubmit={onSubmit}>
                <div className='form-group'>
                    <input
                        type='text'
                        placeholder='Username'
                        name='username'
                        className='form-control'
                        value={user.username}
                        onChange={onChange}
                        required
                    />
                </div>
                <div className='form-group'>
                    <input
                        type='password'
                        id="password"
                        placeholder='Password'
                        name='password'
                        className='form-control'
                        value={user.password}
                        onChange={onChange}
                        required
                    />
                </div>
                <input
                    type='submit'
                    className='btn btn-outline-warning btn-block mt-4'
                />
                </form>
                <div>
                    <FormErrors formErrors={formErrors} />
                </div>
                <br />
                <div>
                    {props.redirectMessage.split('\n').map(str => <p style={{textAlign: 'right'}}>{str}</p>)}
                </div>
                <Link to={props.buttonForward} className='btn btn-outline-info float-right'>
                {props.buttonTitle}
                </Link>
            </div>
            </div>
        </div>
        </div>
    );
};
export default Form;