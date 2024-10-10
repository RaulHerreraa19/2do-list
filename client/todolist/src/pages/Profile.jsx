import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import bcrypt from 'bcryptjs';
import axios from 'axios';

const Profile = () => {
    const [profileImage, setProfileImage] = useState(null);
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [isEditing, setIsEditing] = useState(false);


    const token = localStorage.getItem('token'); // o de donde sea que obtengas el token

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.post('http://localhost:3000/GetUser', {}, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                console.log(response);
                const { username, email, cellphone } = response.data.data;
                setUsername(username);
                setPassword(password);
                setEmail(email);
                setPhone(cellphone);
            } catch (error) {
                console.error('Error fetching profile data', error);
            }
        };

        fetchData();
    }, []);



    // Handle profile image change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
        }
    };

    // Handle form submission
    const handleSaveChanges = () => {
        if (newPassword !== confirmPassword) {
            alert('New passwords do not match');
            return;
        }

        const encryptedNewPassword = newPassword ? bcrypt.hashSync(newPassword, 10) : null;

        const updatedData = {
            username,
            email,
            phone,
            oldPassword, // send old password for validation
            newPassword: encryptedNewPassword
        };

        axios.post('/UpdateUser', updatedData)
            .then(response => {
                alert('Profile updated successfully');
                setIsEditing(false);
            })
            .catch(error => {
                console.error('Error updating profile:', error);
            });
    };

    return (
        <div className="container profile-container mt-4">
            <button onClick={() => navigate('/Dashboard')} className='btn btn-secondary position-fixed top-0 start-0 m-3' >Regresar</button>
            <h2 className="text-center">PERFIL</h2>
            <hr />
            <div className="d-flex justify-content-center mb-4">
                <div className="profile-image">
                    <img
                        src={profileImage ? URL.createObjectURL(profileImage) : 'default-profile.png'}
                        alt="Profile"
                        className="rounded-circle img-thumbnail"
                        width="150"
                        height="150"
                    />
                    {isEditing && (
                        <input
                            type="file"
                            className="form-control mt-3"
                            onChange={handleImageChange}
                        />
                    )}
                </div>
            </div>

            <form className="profile-form">
                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Username</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Correo</label>
                    <div className="col-sm-10">
                        <input
                            type="email"
                            className="form-control"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                </div>

                <div className="mb-3 row">
                    <label className="col-sm-2 col-form-label">Teléfono</label>
                    <div className="col-sm-10">
                        <input
                            type="text"
                            className="form-control"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            disabled={!isEditing}
                        />
                    </div>
                </div>

                {isEditing && (
                    <>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Contraseña Actual</label>
                            <div className="col-sm-10">
                                <input
                                    type="password"
                                    className="form-control"
                                    value={oldPassword}
                                    onChange={(e) => setOldPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Nueva Contraseña</label>
                            <div className="col-sm-10">
                                <input
                                    type="password"
                                    className="form-control"
                                    value={newPassword}
                                    onChange={(e) => setNewPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="mb-3 row">
                            <label className="col-sm-2 col-form-label">Confirmar Contraseña</label>
                            <div className="col-sm-10">
                                <input
                                    type="password"
                                    className="form-control"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                            </div>
                        </div>
                    </>
                )}

                <div className="text-center">
                    {!isEditing ? (
                        <button type="button" className="btn btn-primary" onClick={() => setIsEditing(true)}>
                            Editar Perfil
                        </button>
                    ) : (
                        <>
                            <button type="button" className="btn btn-success me-2" onClick={handleSaveChanges}>
                                Guardar Cambios
                            </button>
                            <button type="button" className="btn btn-secondary" onClick={() => setIsEditing(false)}>
                                Cancelar
                            </button>
                        </>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Profile;
