const { Response, TypeOfResponse } = require('../Common/Response');
const UserModel = require('../Models/UsersModel');
const bcrypt = require('bcrypt');
saltRounds = 10;



class UserController{

    static GetUsers(username, password){
        const response = new Response();    
        try{
            const user = UserModel.findByUsername(username);
            if(user.password == password){
                response.type_of_response = TypeOfResponse.SUCCESS;
                response.message = 'Usuario logeado correctamente'; 
                
            }
            else{
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = 'Contraseña incorrecta';
            }
        }
        catch(error){
            response.message = 'Error en la conexión al servidor';
            response.type_of_response = TypeOfResponse.ERROR;
        }
        return response;    
    }
    
    static Logout(){
        try{
            Response.type_of_response = TypeOfResponse.SUCCESS;
            Response.message = 'Usuario deslogeado correctamente';
            sessionStorage.clear();
            return Response;
        }
        catch(error){
            Response.message = 'Error en la conexión al servidor';
            Response.type_of_response = TypeOfResponse.ERROR;
            return Response;
        }
    }

static async CreateUser(req, res) {
    const response = new Response();
    const { username, password, email, cellphone, created_date } = req.body; // Asegúrate de que req.body esté definido
    let result = null;

    try {
        console.log("inicia");
        console.log("username:", username, "password:", password, "email:", email, "cellphone:", cellphone);

        // Verifica que todos los campos requeridos no sean undefined
        if (!username || !password || !email || !cellphone) {
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = 'Todos los campos son requeridos';
            return res.status(400).json(response);
        }

        console.log("try");

        // Encriptar la contraseña con async/await
        const hash = await bcrypt.hash(password, saltRounds);

        // Crear el usuario en la base de datos con la contraseña encriptada
        result = await UserModel.CreateUser({
            username: username,
            password: hash, // Contraseña encriptada
            email: email,
            cellphone: cellphone,
            created_date: created_date || new Date().toISOString().split('T')[0] // Usa la fecha actual si no se proporciona
        });
        if (result.type_of_response === TypeOfResponse.SUCCESS) {
            console.log("result controller", result);
            response.type_of_response = TypeOfResponse.SUCCESS;
            response.message = 'Usuario creado correctamente';
            response.data = result.data; // Devuelve información del usuario creado
            res.status(200).json(response);
        } else {
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = 'Error al crear el usuario';
            res.status(500).json(response);
        }

    } catch (error) {
        console.error("Error en la creación del usuario:", error);
        response.message = 'Error en la conexión al servidor o en la operación';
        response.type_of_response = TypeOfResponse.ERROR;
        res.status(500).json(response); // Devuelve la respuesta con el error
    }
    return res;
}

}


module.exports = UserController;