// src/pages/Index.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Index = () => {
    return (
        <>

            <div className='container'>
                <div className='row'>
                    <div className='col text-center'>
                        <h1>Bienvenido a OrganizeMe</h1>
                        <Link to='/login' className='btn btn-primary'>Iniciar sesión</Link>
                        <hr />
                        <h2>Organiza tus tareas de forma sencilla</h2>
                        <h4>Actividades que puedes realizar con esta app:</h4>
                        <ul>
                            <div className='row mt-5'>
                                <div className='col'>
                                    <div className="card" >
                                        <img src="..." className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <p className="card-text">Mantén tus tareas organizadas y nunca olvides lo que tienes pendiente.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="card" >
                                        <img src="..." className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <p className="card-text">Cumple tus objetivos con mayor rapidez y sin estrés.</p>
                                        </div>
                                    </div>
                                </div>
                                <div className='col'>
                                    <div className="card" >
                                        <img src="..." className="card-img-top" alt="..." />
                                        <div className="card-body">
                                            <p className="card-text">Visualiza tu avance y motívate a completar más.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </ul>
                    </div >
                </div >
            </div >
        </>

    );
};

export default Index;
