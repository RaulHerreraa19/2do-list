const { Response, TypeOfResponse } = require('../Common/Response');
const UserModel = require('../Models/UsersModel');

class UserController{

    static Login(username, password){
        try{
            const user = UserModel.GetUserByUsername(username);
            if(user.password == password){
                Response.type_of_response = TypeOfResponse.SUCCESS;
                Response.message = 'Usuario logeado correctamente'; 
                return Response;
            }
            else{
                Response.type_of_response = TypeOfResponse.ERROR;
                Response.message = 'Contraseña incorrecta';
                return Response;
            }
        }
        catch(error){
            Response.message = 'Error en la conexión al servidor';
            Response.type_of_response = TypeOfResponse.ERROR;
            return Response;
        }

    }
    
    staticLogout(){
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

    static CreateUser({username, password, email, cellphone}){
        try{
            const user = UserModel.CreateUser({username, password, email, cellphone});
            if(user){
                Response.type_of_response = TypeOfResponse.SUCCESS;
                Response.message = 'Usuario creado correctamente';
                return Response;
            }
            else{
                Response.type_of_response = TypeOfResponse.ERROR;
                Response.message = 'Error al crear el usuario';
                return Response;
            }
        }
        catch(error){
            Response.message = 'Error en la conexión al servidor';
            Response.type_of_response = TypeOfResponse.ERROR;
            return Response;
        }
    }
}


module.exports = UserController;