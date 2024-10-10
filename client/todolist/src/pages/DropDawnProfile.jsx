// src/components/ProfileDropdown.jsx
import React from 'react';
import { Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const ProfileDropdown = ({ userImage }) => {
    const navigate = useNavigate();

    return (
        <Dropdown>
            <Dropdown.Toggle
                as="div"
                className="d-inline-block"
                style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    overflow: 'hidden',
                    cursor: 'pointer'
                }}
            >
                <img
                    src={userImage}
                    alt="User"
                    style={{
                        width: '100%',
                        height: '100%',
                        borderRadius: '50%'
                    }}
                />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
                <Dropdown.Item onClick={() => navigate('/profile')}>Ver Perfil</Dropdown.Item>
                <Dropdown.Item onClick={() => navigate('/logout')}>Cerrar Sesión</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
};

export default ProfileDropdown;
