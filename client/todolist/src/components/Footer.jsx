// src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer style={footerStyle}>
            <p>&copy; 2024 Mi Aplicación. Todos los derechos reservados.</p>
        </footer>
    );
};

const footerStyle = {
    backgroundColor: '#333',
    color: '#fff',
    padding: '10px',
    position: 'fixed',
    bottom: 0,
    width: '100%',
    textAlign: 'center'
};

export default Footer;
