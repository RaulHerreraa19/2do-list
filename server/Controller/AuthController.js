require('dotenv').config();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
saltRounds = 10;
const { Response, TypeOfResponse } = require('../Common/Response');  // Tu clase de respuesta
var session = require('express-session')
const UserModel = require('../Models/UsersModel');


// Controlador de autenticación
class AuthController {
    static async login(req, res) {
        const { username, password } = req.body;
        let response = new Response();
        try {
            response = await UserModel.findByUsername(username)
            console.log("response controller", response)
            if (!response) {
                res.status(401).json(new Response(TypeOfResponse.ERROR, {}, 'Usuario no encontrado.'));
            }
            const validPassword = await bcrypt.compare(password, response.data.password);
            console.log(validPassword)
            if (!validPassword) {
            return res.status(401).json(new Response(TypeOfResponse.ERROR, {}, 'Contraseña incorrecta.'));
            }
            const token = jwt.sign({ id: response.data.id, username: response.data.username,
                email: response.data.email, cellphone: response.data.cellphone },  process.env.JWT_SECRET, // Clave secreta
                { expiresIn: process.env.JWT_EXPIRES_IN } // Duración del token
            );
            console.log(session.token)
            return res.status(200).json(new Response(TypeOfResponse.SUCCESS, { token, username }, 'Autenticación exitosa.'));
        }
        catch (error) {
        return res.status(500).json(new Response(TypeOfResponse.ERROR, {}, 'Error en el servidor.'));
        }
    }
};
module.exports = AuthController;
