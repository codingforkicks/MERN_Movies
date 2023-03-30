/*Form used for Login and Register */

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import FormErrors from './FormErrors';
import '../styles/style.css';

const Form = (props) => {

    console.log(props.setToken);

    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: '',
        admin: true
    });

    const [formErrors, setValidation] = useState({
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
        validateField(e.target.name, e.target.value);
    };

    const onSubmit = (e) => {
        e.preventDefault();

        axios
        .post(`http://localhost:8082/${props.url}`, user)
        .then((res) => {
            if(props.url === 'login'){
                console.log(res.data);
                const token = res.data;
                props.setToken(token);
            }
            if(res.status === 201 || res.status === 200) {
                setUser({
                    username: '',
                    password: '',
                    admin: false
                });

                setValidation({
                    errors: {
                        username: '', 
                        password: '',
                    },
                    usernameValid: false,
                    passwordValid: false,
                    formValid: false
                });
                
                alert(`${props.url} successful`);
                navigate(props.successForward);
            }
        })
        .catch((err) => {
            console.log(`Error in Form: ${err}`);
        });
    };

    //form validation
    let validateField = (fieldName, value) => {
        let fieldValidationErrors = formErrors.errors;
        let validUsername = formErrors.usernameValid;
        let validPassword = formErrors.passwordValid;

        const errMessages = {
            username: 'must be at least 5 characters',
            password: 'must begin with a letter, be at least 8 characters, and contain at least 1 capital letter, 1 lowercase letter, 1 number, and 1 symbol'
        }

        switch(fieldName) {
            case 'username':
                validUsername = value.length >= 5;
                fieldValidationErrors.username = validUsername ? '' : `${errMessages.username}`;
                if(validUsername) {
                    setValidation({
                            ...formErrors,
                            usernameValid: true,
                            formValid: formErrors.passwordValid && formErrors.usernameValid
                    });
                } else {
                    setValidation({
                        ...formErrors,
                        usernameValid: false,
                        formValid: formErrors.passwordValid && formErrors.usernameValid
                });
                }
                break;
            case 'password':
                validPassword = validatePassword(value);
                fieldValidationErrors.password = validPassword ? '' : `${errMessages.password}`;
                if(validPassword) {
                    setValidation({
                            ...formErrors,
                            passwordValid: true,
                            formValid: formErrors.passwordValid && formErrors.usernameValid
                    });
                } else {
                    setValidation({
                        ...formErrors,
                        passwordValid: false,
                        formValid: formErrors.passwordValid && formErrors.usernameValid
                });
                }
                break;
            default:
                break;
        };
    };

    let validatePassword = (pass) => {
        let passREGEX = new RegExp ('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');
        let result = passREGEX.test(pass);
        return result;
    }

    let errorClass = (err) => {
        return(err.length === 0 ? '' : 'has-error')
    }

    useEffect(() => {
        validateField();
        console.log(`use effect form validation: 
        username: ${formErrors.usernameValid}
        password ${formErrors.passwordValid}
        form valid: ${formErrors.formValid}`);
    }, [formErrors])

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

                <form onSubmit={onSubmit}>
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

Form.propTypes = {
    setToken: PropTypes.func.isRequired
}
export default Form;