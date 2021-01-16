import React from 'react';
import classes from './Nav.module.css';

const Nav = () => {
    return(
        <div className = {classes.link}>
            <a href="/Roads">
                Roads
            </a>
            <a href="/">
                Logout
            </a>
        </div>
    );
}

export default Nav;