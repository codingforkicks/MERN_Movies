import React from 'react';
import { Link } from 'react-router-dom';



const HeaderBar = () => {
    return (
        <div>
            <br />
            <Link to='/showList' className='btn btn-outline-warning float-left'>
                Show Movie List
            </Link>
            <Link to='/' className='btn btn-outline-warning float-right' onClick={() => sessionStorage.clear()}>Sign Out</Link>
            <br />
            <br /> <br />
        </div>
    );
};

export default HeaderBar;