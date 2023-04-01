/*
in this page you can see all the admin functions
*/

import React from 'react';
import '../App.css';
import { Link } from 'react-router-dom';
import HeaderBar from './HeaderBar';

function AdminModule() {
    return (
        <div className='AdminModule'>
            <div className='container'>
                <div className='row'>
                    <div className='col-md-11'>
                        <HeaderBar />
                        <h2 className='display-4 text-center'>Admin Module</h2>
                        <hr />
                    </div>
                    <div className='list adminList col-md-11'>
                        <h4>Add Movie</h4>
                        <Link
                            to='/addMovie'
                            className='btn btn-outline-warning float-center'
                            >
                            + Add New Movie
                        </Link>
                        <h4>Register User</h4>
                        <Link
                            to='/register'
                            className='btn btn-outline-warning float-center'
                            >
                            + Register User
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminModule;