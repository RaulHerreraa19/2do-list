# To-Do List App

## Descripción

Esta es una aplicación de lista de tareas (To-Do List) con funcionalidades de autenticación (login), que permite a los usuarios gestionar sus tareas (crear, leer, actualizar y eliminar). La aplicación está desarrollada con un **frontend en React** y un **backend en Node.js** utilizando Express. Implementa un CRUD completo y utiliza JWT (JSON Web Tokens) para la autenticación de los usuarios.

## Características

- **Registro e inicio de sesión**: Los usuarios pueden registrarse y autenticarse mediante un sistema de login.
- **Gestión de tareas (CRUD)**:
  - **Crear** nuevas tareas.
  - **Leer** las tareas existentes.
  - **Actualizar** las tareas existentes.
  - **Eliminar** tareas que ya no son necesarias.
- **Autenticación**: La autenticación de usuarios se maneja con tokens JWT.
- **Interfaz de usuario**: La interfaz es intuitiva y fácil de usar, construida con React.
- **Backend**: El servidor está construido con Node.js y Express, conectándose a una base de datos para gestionar las tareas y usuarios.

## Tecnologías Utilizadas

### Frontend

- **React**: Librería para construir la interfaz de usuario.
- **Axios**: Para hacer peticiones HTTP al backend.
- **React Router**: Para la navegación entre componentes.
- **CSS Modules / SASS**: Para los estilos del frontend.

### Backend

- **Node.js**: Entorno de ejecución para el backend.
- **Express**: Framework para la construcción de la API REST.
- **JWT (JSON Web Tokens)**: Para la autenticación de usuarios.
- **bcrypt**: Para el hash de contraseñas.
- **MySQL / SQL Server**: Base de datos relacional para almacenar usuarios y tareas.

### Contenedores

- **Docker**: Para contenerizar la aplicación y facilitar su despliegue.
- **Docker Compose**: Para orquestar los contenedores de frontend y backend.

## Requisitos

- **Docker** instalado en tu máquina.
- **Node.js** y **npm** si prefieres ejecutarlo sin Docker.

## Instalación y Uso

### Ejecutar con Docker

1. Clona este repositorio:

   ```bash
   git clone https://github.com/tu-usuario/tu-repositorio.git
   cd tu-repositorio
2. Asegúrate de que Docker y Docker Compose están instalados.

3. Construye y ejecuta los contenedores:
docker-compose up --build
Accede a la aplicación:

Frontend (React): `
   - **Frontend** (React): `http://localhost:5173   `
   - **Backend** (Node.js): `http://localhost:3000`

### Ejecutar sin Docker

#### Backend

1. Entra en la carpeta `server`:

   ```bash
   cd server
2. Instala las dependencias del backend:
   npm install

3. Crea un archivo .env en la carpeta server con las siguientes variables:
    PORT=5000
    DB_HOST=tu-host
    DB_USER=tu-usuario
    DB_PASSWORD=tu-contraseña
    DB_NAME=nombre-de-la-base-de-datos
    JWT_SECRET=tu-secreto-jwt

4. Inicia el servidor:
    npm start

Frontend
Entra en la carpeta client:

bash
Copiar código
cd client
Instala las dependencias del frontend:

bash
Copiar código
npm install
Inicia la aplicación de React:

bash
Copiar código
npm start
La aplicación estará disponible en http://localhost:3000.

Endpoints del API (Backend)
Autenticación:

POST /CreateUser Registrar un nuevo usuario.
POST /login Iniciar sesión y obtener un token JWT.
POST /GetUser obtener un usuario por id.


POST /tasks Obtener todas las tareas del usuario autenticado.
POST /addTask Crear una nueva tarea.
POST /edittasks Actualizar una tarea existente.
POST /deleteTask Eliminar una tarea.

Estructura del Proyecto

/raiz-del-proyecto
│
├── /client               # Carpeta del cliente (React)
│   ├── /src              # Código fuente del frontend
│   ├── Dockerfile        # Dockerfile del frontend
│   └── ...               # Otros archivos de React
│
├── /server               # Carpeta del servidor (Node.js)
│   ├── /src              # Código fuente del backend
│   ├── Dockerfile        # Dockerfile del backend
│   ├── .env              # Archivo de configuración de variables de entorno
│   └── ...               # Otros archivos de Node.js
│
├── docker-compose.yml     # Docker Compose para orquestar el frontend y backend
├── .gitignore             # Ignorar archivos innecesarios en Git
└── README.md              # Este archivo
Licencia
Este proyecto está bajo la Licencia MIT. Para más detalles, consulta el archivo LICENSE.

Contribuciones
Las contribuciones son bienvenidas. Si encuentras algún error o tienes una sugerencia de mejora, por favor crea un "issue" o envía un "pull request".


### Explicación:

Este README completo incluye toda la información importante para instalar, configurar y ejecutar la aplicación, tanto con Docker como sin Docker. También se incluye la estructura del proyecto y una descripción detallada de los endpoints del backend.


