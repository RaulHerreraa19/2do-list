const sql = require('mssql');
const dbConfig = require('../Config/dbConfig');
const {Response, TypeOfResponse} = require('../Common/Response');
const { query } = require('express');
const jwt = require('jsonwebtoken');
require('dotenv').config();


class UserModel{
    constructor(id, username, password, email, cellphone){
        this.id = id;
        this.username = username;
        this.password = password;
        this.email = email;
        this.cellphone = cellphone;
    }

    static async findByUsername(username){
        const response = new Response();
        try{
            const pool = await sql.connect(dbConfig);
            const result = await pool.request()
                .input('username', sql.VarChar, username)
                .query('SELECT * FROM USERS WHERE USERNAME = @username');   
            response.type_of_response = TypeOfResponse.SUCCESS;
            response.message = 'Usuario obtenido correctamente';
            response.data = result.recordset[0];
        }
        catch(error){
            response.message = 'Error en la conexión al servidor';
            response.type_of_response = TypeOfResponse.ERROR;
            console.log("error", error)
        }
        return response;
    }

    static async CreateUser({username, password, email, cellphone, created_date}){
        console.log("entra create")
        const response = new Response();
        try{        
            console.log("entra create method try")
            const pool = await sql.connect(dbConfig);
            console.log("pool: ", pool)
            const result = await pool.request()
        .input('username', sql.VarChar, username)
        .input('password', sql.VarChar, password)
        .input('email', sql.VarChar, email)
        .input('cellphone', sql.VarChar, cellphone)
        .input('created_date', sql.DateTime, created_date)
        .query(`INSERT INTO USERS (USERNAME, PASSWORD, EMAIL, CELLPHONE, CREATED_DATE)
                OUTPUT INSERTED.id
                VALUES (@username, @password, @email, @cellphone, @created_date)`);                
                if (result.recordset.length > 0) {
                    const insertedId = result.recordset[0].id;
                    // Devolver los datos del usuario insertado
                    response.type_of_response = TypeOfResponse.SUCCESS;
                    response.message = 'Usuario creado correctamente';
                    response.data = {
                        id: insertedId,
                        username: username,
                        email: email,
                        cellphone: cellphone,
                        created_date: created_date
                    };
            } else {
                response.type_of_response = TypeOfResponse.ERROR;
                response.message = 'No se insertó ningún usuario';
                response.data = null;
            }
        } catch (error) {
            // Capturar el mensaje exacto del error para mayor claridad
            response.type_of_response = TypeOfResponse.ERROR;
            response.message = 'Error al crear el usuario: ' + error.message;
        }
        return response;
    }

    static async GetUserById(token){
        const response = new Response();
        try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user_id = decoded.id;
        console.log(decoded);
        console.log("pool")
        const pool = await sql.connect(dbConfig);
            // Hacer la consulta usando el id
        const result = await pool.request()
            .input('id', sql.Int, user_id)
            .query('SELECT * FROM USERS WHERE id = @id');
            response.type_of_response = TypeOfResponse.SUCCESS;
            response.message = 'Usuario obtenido correctamente';
            response.data = result.recordset[0];
    } catch (error) {
        console.error(error); // Añadir el error a la consola para depuración
        response.type_of_response = TypeOfResponse.ERROR;
        response.message = 'Error al conectar al servidor';
    }
    return response;
}   
}

module.exports = UserModel;