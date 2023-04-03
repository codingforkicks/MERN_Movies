/*Form used for Login and Register */

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import FormErrors from './FormErrors';
import '../../styles/style.css';

const Form = (props) => {
    const navigate = useNavigate();

    const [user, setUser] = useState({
        username: '',
        password: '',
        admin: false
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
    const handleChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
        validateField(e.target.name, e.target.value);
    };

    const handleCheckBoxClick = (e) => {
        let checkbox = document.getElementById('adminCheckbox').checked;
        setUser({...user, admin: checkbox.checked});
    };

    const onSubmit = (e) => {
        e.preventDefault();

        axios
        .post(`http://localhost:8082/${props.url}`, user)
        .then((res) => {
            if(props.url === 'login'){
                props.setToken(res.data);
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
            alert('user not found');
        });
    };

    //form validation
    let validateField = (fieldName, value) => {
        let fieldValidationErrors = formErrors.errors;
        let validUsername = formErrors.usernameValid;
        let validPassword = formErrors.passwordValid;

        const errMessages = {
            username: 'must be at least 5 characters',
            password: 'must begin with a letter, be at least 10 characters, and contain at least 1 capital letter, 1 lowercase letter, 1 number, and 1 symbol'
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
                        formValid: false
                    });
                };
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
                        formValid: false
                    });
                };
                break;
            default:
                break;
        };
    };

    let validatePassword = (pass) => {
        let passREGEX = new RegExp ('(?=[A-Za-z0-9@#$%^&+!=]+$)^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[@#$%^&+!=])(?=.{10,}).*');
        let result = passREGEX.test(pass);
        return result;
    }

    let errorClass = (err) => {
        return(err.length === 0 ? '' : 'has-error')
    }

    return(
        <div className='GeneralForm'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-8 m-auto'>
                        <br />
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
                                    onChange={handleChange}
                                    onFocus={handleChange}
                                    onBlur={handleChange}
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
                                    onChange={handleChange}
                                    onFocus={handleChange}
                                    onBlur={handleChange}
                                    required
                                />
                            </div>
                            <div className='form-group float-right'>
                                <label form='adminCheckbox'>
                                    <input 
                                        type='checkbox'
                                        id='adminCheckbox'
                                        name="adminCheckbox"
                                        onClick={handleCheckBoxClick}
                                        disabled={!props.isAdminUser}
                                        defaultValue={false}
                                    />
                                    &nbsp;Admin User
                                </label>
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
                        {/* <div>
                            {props.redirectMessage.split('\n').map(str => <p style={{textAlign: 'right'}}>{str}</p>)}
                        </div>
                        <Link to={props.buttonForward} className='btn btn-outline-info float-right'>
                        {props.buttonTitle}
                        </Link> */}
                    </div>
                </div>
            </div>
        </div>
    );
};

Form.propTypes = {
    setToken: PropTypes.func.isRequired
};

export default Form;