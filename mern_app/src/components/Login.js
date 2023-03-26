/*
When a user login in they can see the list of all movies entered by the admin (movies page),
they can click on a movie to see reviews and average rating (movie page).

When an admin login in they can see a link to the register page (can add an admin), add
movie page
*/

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {
    const navigate = useNavigate();
    const [user, setUser] = useState({
        username: '',
        password: '',
        admin: false
    });

    //set event listener
    const onChange = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    };

    const onSubmit = (e) => {
        e.preventDefault();

        axios
        .post('http://localhost:8082/login', user)
        .then((res) => {
            if(res.status)
            console.log(res);
            setUser({
                username: '',
                password: '',
                admin: false
            });

            navigate('/showList');
        })
        .catch((err) => {
            console.log(`Error in Login: ${err}`);
        });
    };

    return(
        <div className='Login'>
        <div className='container'>
            <div className='row'>
            <div className='col-md-8 m-auto'>
                <br />
            </div>
            <div className='col-md-8 m-auto'>
                <h1 className='display-4 text-center'>123 Movies</h1>
                <p className='lead text-center'>Login using your credentials</p>

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
                <br />
                <Link to='/register' className='btn btn-outline-info float-left'>
                Register
                </Link>
            </div>
            </div>
        </div>
        </div>
    );
};

export default Login;