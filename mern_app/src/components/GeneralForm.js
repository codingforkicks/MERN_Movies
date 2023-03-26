/*Form used for Login and Register */

import React, { useState, useEffect } from 'react';
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
        username: '',
        password: '',
        errors: {
            username: '', 
            password: '',
        },
        usernameValid: false,
        passwordValid: false,
        formValid: false
    });

    //set event listeners
    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
        setValidation({...formErrors, [e.target.name]: e.target.value});
        validateField(e.target.name, e.target.value);
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

    //form validation
    let validateField = (fieldName, value) => {
        let fieldValidationErrors = formErrors.errors;
        let usernameValid = formErrors.usernameValid;
        let passwordValid = formErrors.passwordValid;

        const errMessages = {
            username: 'must be at least 5 characters',
            password: 'must begin with a letter, be at least 10 characters, and contain at least 1 capital letter, 1 lowercase letter, 1 number, and 1 symbol'
        }

        switch(fieldName) {
            case 'username':
                usernameValid = value.length >= 5;
                fieldValidationErrors.username = usernameValid ? '' : `${errMessages.username}`;
                if(formErrors.errors.username === '') {
                    console.log('no errors')
                    setValidation({...formErrors, usernameValid: true});
                    console.log(`form errors update: ${formErrors.usernameValid}`);
                    validateForm();
                }else {
                    //setValidation({...formErrors, usernameValid: false});
                }
                break;
            case 'password':
                passwordValid = validatePassword(value);
                fieldValidationErrors.password = passwordValid ? '' : `${errMessages.password}`;
                if(formErrors.errors.password === '') {
                    setValidation({...formErrors, passwordValid: true});
                }else {
                    setValidation({...formErrors, passwordValid: false});
                }
                validateForm();
                break;
            default:
                break;
        };
    };

    var errors = {
        uppercase: { regex: /[A-Z]/},
        lowercase: { regex: /[a-z]/},
        digit: { regex: /[0-9]/},
        special: { regex: /[^A-Za-z0-9]/ },
        length: { test: e => e.length > 8 },
     };

    let validatePassword = (pass) => {
        console.log(`validating password`);
        let flag = true;
            Object.entries(errors).flatMap(([name, { test, regex}]) => {
                const isValid = test ? test(pass) : regex.test(pass);
                if(!isValid){
                    flag = false;
                };
        });
        return flag;
    };

    let validateForm = () => {
        console.log(`validating form`);
        setValidation({...formErrors,
            formValid: formErrors.usernameValid && formErrors.passwordValid
        });
        console.log(`form validation: 
        \n username: ${formErrors.usernameValid}
        \n password ${formErrors.passwordValid}
        \n form valid: ${formErrors.formValid}`)
    };

    let errorClass = (err) => {
        return(err.length === 0 ? '' : 'has-error')
    }

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
                <div className={`form-group ${errorClass(formErrors.errors.username)}`}>
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
                <div className={`form-group ${errorClass(formErrors.errors.password)}`}>
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
                    disabled={!formErrors.formValid}
                />
                </form>
                <div className='panel panel-default'>
                    <FormErrors formErrors={formErrors.errors} />
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