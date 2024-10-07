const express = require('express');
const session = require('express-session');
const userRoutes = require('./routes/Routes');
const cors = require('cors'); 
const app = express();
app.use(cors());
app.use(express.json());

app.set('view engine', 'ejs'); // Configurar EJS como motor de vistas

app.use(express.urlencoded({ extended: true })); // Para manejar datos de formularios
app.use(express.json());
app.use(express.static('public')); // Para servir archivos estáticos

app.use(session({
    secret: '12345',
    resave: false,
    saveUninitialized: true,
}));

// Rutas
app.use('/', userRoutes);  // Usar las rutas de userRoutes

// Iniciar el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
