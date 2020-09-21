import React from 'react';
import {Link} from 'react-router-dom';

function Navigation() {
    return (
        <nav>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/profile">My Profile</Link></li>
        </nav>
    )
}

export default Navigation
