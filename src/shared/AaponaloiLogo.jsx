import React from 'react';
import logo from '../assets/aaponaloiLogo.png'
import { Link } from 'react-router';

const AaponaloiLogo = () => {
    return (
        <Link to='/'>
            <div>
                <img src={logo} alt="" />
            </div>
        </Link>
    );
};

export default AaponaloiLogo;