// src/components/Navbar.js
import React from 'react';
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav style={navStyle}>
            <ul style={ulStyle}>
                <li><Link to="/">Inicio</Link></li>
                <li><Link to="/dashboard">Dashboard</Link></li>
                <li><Link to="/login">Login</Link></li>
            </ul>
        </nav>
    );
};

const navStyle = {
    backgroundColor: '#444',
    padding: '10px',
    textAlign: 'center'
};

const ulStyle = {
    listStyleType: 'none',
    margin: 0,
    padding: 0,
    display: 'flex',
    justifyContent: 'space-around'
};

export default Navbar;
