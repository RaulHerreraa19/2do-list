// src/components/Header.js
import React from 'react';

const Header = () => {
    return (
        <header style={headerStyle}>
            <h1>Mi Aplicación</h1>
        </header>
    );
};

const headerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    textAlign: 'center'
};

export default Header;
