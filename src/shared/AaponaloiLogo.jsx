import React from 'react';
import logo from '../assets/logo/aaponaloi-logo3.png'
import { Link } from 'react-router';

const AaponaloiLogo = () => {
    return (
        <Link to='/'>
            <div>
                <img className='' src={logo} alt="" />
            </div>
        </Link>
    );
};

export default AaponaloiLogo;