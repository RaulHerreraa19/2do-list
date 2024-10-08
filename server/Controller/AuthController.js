const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { Response, TypeOfResponse } = require('../Common/Response');  // Tu clase de respuesta

// Controlador de autenticación
class AuthController {
    static async login(req, res) {
        const { username, password } = req.body;

        try {
            // Busca el usuario en la base de datos (implementa tu lógica aquí)
            const user = await UserModel.findByUsername(username);

            if (!user) {
                return res.status(401).json(new Response(TypeOfResponse.ERROR, {}, 'Usuario no encontrado.'));
            }

            // Verificar contraseña
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(401).json(new Response(TypeOfResponse.ERROR, {}, 'Contraseña incorrecta.'));
            }

            // Generar el token
            const token = jwt.sign(
                { id: user.id, username: user.username },
                process.env.JWT_SECRET,
                { expiresIn: process.env.JWT_EXPIRES_IN }
            );

            // Enviar la respuesta con el token
            return res.status(200).json(new Response(TypeOfResponse.SUCCESS, { token }, 'Autenticación exitosa.'));
        } catch (error) {
            return res.status(500).json(new Response(TypeOfResponse.ERROR, {}, 'Error en el servidor.'));
        }
    }
}

module.exports = AuthController;
