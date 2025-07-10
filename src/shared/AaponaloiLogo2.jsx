import React from 'react';
import logo from '../assets/logo/aaponaloi-logo2.png'
import { Link } from 'react-router';

const AaponaloiLogo = () => {
    return (
        <Link to='/'>
            <div>
                <img className='w-32 h-32' src={logo} alt="" />
            </div>
        </Link>
    );
};

export default AaponaloiLogo;