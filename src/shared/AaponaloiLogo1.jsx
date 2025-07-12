import React from 'react';
import logo from '../assets/logo/aaponaloi-logo5.png'
import { Link } from 'react-router';

const AaponaloiLogo1 = () => {
    return (
        <Link to='/'>
            <div>
                <img className='w-15 h-13' src={logo} alt="" />
            </div>
        </Link>
    );
};

export default AaponaloiLogo1;