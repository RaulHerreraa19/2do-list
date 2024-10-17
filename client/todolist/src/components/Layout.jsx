// src/components/Layout.js
import React from 'react';
import Header from './Header';
import Footer from './Footer';
import Navbar from './NavBar';

const Layout = ({ children }) => {
    return (
        <div style={layoutStyle}>
            <Header />
            <Navbar />
            <main style={mainStyle}>
                {children}
            </main>
            <Footer />
        </div>
    );
};

const layoutStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
};

const mainStyle = {
    flex: '1',
    padding: '20px',
    marginTop: '10px'
};

export default Layout;
