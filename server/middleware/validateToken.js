const session = require('express-session');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const validateToken = async (req, res, next) => {
    const token = req.headers['authorization'];   
    if (!token) {
        return res.status(403).json({
            message: 'Token no proporcionado',
            type_of_response: 'ERROR'
        });
    }
    try {
        // Si el token es 'Bearer <token>', extraemos solo la segunda parte
        const tokenWithoutBearer = token.split(' ')[1];
        // Verificar y decodificar el token

        const decoded = jwt.verify(tokenWithoutBearer, process.env.JWT_SECRET);  // Asegúrate de usar la misma clave secreta
        req.user = decoded;
        next(); // Pasar al siguiente middleware o controlador
    } catch (error) {
        return res.status(401).json({
            message: 'Token inválido',
            type_of_response: 'ERROR'
        });
    }
};

module.exports = validateToken;