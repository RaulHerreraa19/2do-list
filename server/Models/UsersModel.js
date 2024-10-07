const {Response, TypeOfResponse} = require('../Common/Response');

class UserModel{
    constructor(id, username, password, email, cellphone){
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.cellphone = cellphone;
    }

    static async GetUserByUsername(username, password){
        const response = new Response();
        try{
            const pool = await sql.connect(dbConfig);
            response.data = await pool.request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, password)
            .query('SELECT * FROM USERS WHERE USERNAME = @username AND PASSWORD = @password');
            if(response.type_of_response == TypeOfResponse.SUCCESS){
                response.type_of_response = TypeOfResponse.SUCCESS;
                response.message = 'Usuario obtenido correctamente';
                return response;
            }
        }
        catch(error){
            response.message = 'Error en la conexión al servidor';
            response.type_of_response = TypeOfResponse.ERROR;
            return response;
        }
        return response;
    }

    static async CreateUser({username, password, email, cellphone}){
        try{
            const pool = await sql.connect(dbConfig);
            Response.data = await pool.request()
            .input('username', sql.VarChar, username)
            .input('password', sql.VarChar, password)
            .input('email', sql.VarChar, email)
            .input('cellphone', sql.VarChar, cellphone)
            .query('INSERT INTO USERS (USERNAME, PASSWORD, EMAIL, CELLPHONE) VALUES (@username, @password, @email, @cellphone)');
            if(Response.type_of_response == TypeOfResponse.Ok){
                Response.type_of_response = TypeOfResponse.SUCCESS;
                Response.message = 'Usuario creado correctamente';
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

module.exports = UserModel;