const sql = require('mssql');
const dbConfig = require('../Config/dbConfig'); // Configuración de la base de datos
const { Response, TypeOfResponse } = require('../Common/Response');
const jwt = require('jsonwebtoken');
require('dotenv').config();


class TareasModel{
    constructor(id, user_id, title, description, status){
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.description = description;
        this.status = status;
    }

<<<<<<< HEAD
    static async GetTasks(token){
        const response = new Response(); // Crear una instancia de Response
        try {
                // Verificar y decodificar el token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user_id = decoded.id; 
            
            const pool = await sql.connect(dbConfig);
            const result = await pool.request()
            .input('user_id', sql.Int, user_id)
            .query('SELECT * FROM TASKS WHERE user_id = @user_id');            
            response.type_of_response = TypeOfResponse.SUCCESS;
            response.message = 'Tareas obtenidas correctamente';
            response.data = result.recordset;
            
            } catch (error) {
            response.message = 'Error en la conexión al servidor';
            response.type_of_response = TypeOfResponse.ERROR;
        }
    return response; 
    }


    static async GetTaskById(id, token) {
        try {
            console.log("tentra model task")
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user_id = decoded.id; 
            
            // Conectar a la base de datos
            const pool = await sql.connect(dbConfig);
            // Hacer la consulta usando el id
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('user_id', sql.Int, user_id)
                .query('SELECT * FROM TASKS WHERE id = @id AND user_id = @user_id');
            result.recordset[0].id = id;
            if (result.recordset.length > 0) {
                return new Response(TypeOfResponse.SUCCESS, result.recordset[0], 'Tarea obtenida correctamente.');
            } else {
                // Si no se encuentra, devolver un error
                return new Response(TypeOfResponse.ERROR, {}, 'Tarea no encontrada.');
            }
        } catch (error) {
            console.error("Error en la base de datos:", error);
            return new Response(TypeOfResponse.ERROR, {}, 'Error al obtener la tarea.');
        }

    }

    static async AddTask(token, title, description, status) {
        const response = new Response();
        try {   
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user_id = decoded.id;
            const pool = await sql.connect(dbConfig);
            const result = await pool.request()
                .input('user_id', sql.Int, user_id)
                .input('title', sql.NVarChar, title)
                .input('description', sql.NVarChar, description)
                .input('status', sql.NVarChar, status)
                .query(`
                    INSERT INTO TASKS (user_id, title, description, status) 
                    OUTPUT inserted.*
                    VALUES (@user_id, @title, @description, @status)
                `);
                console.log("result", result);
            if (result.rowsAffected[0] === 0) {
                response.type_of_response = TypeOfResponse.WARNING;
                response.message = 'No se agregó la tarea';
                response.data = {};
                return new Response(TypeOfResponse.WARNING, {}, 'No se agregó la tarea.');
            }
            else{
                console.log("agregada con exito")
                return new Response(TypeOfResponse.SUCCESS, result.recordset[0], 'Tarea agregada correctamente.');
            }
        } catch (error) {
            return new Response(TypeOfResponse.ERROR, {}, 'Error al conectar al servidor.');
        }
    }

    static async DeleteTask(token, id) {
        try {                
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user_id = decoded.id;
            const pool = await sql.connect(dbConfig);
            let result = await pool.request()
                .input('id', sql.Int, id)
                .input('user_id', sql.Int, user_id)
                .query('DELETE FROM TASKS WHERE id = @id AND user_id = @user_id');
            if (result.rowsAffected[0] === 0) {
                return new Response(TypeOfResponse.WARNING, {}, 'No se encontró la tarea.');
            }
            return new Response(TypeOfResponse.SUCCESS, {}, 'Tarea eliminada correctamente.');
        } catch (error) {
            return new Response(TypeOfResponse.ERROR, {}, 'Error al conectar al servidor.');
        }
    }

    static async UpdateTask(token, id, title, description, status) {
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            const user_id = decoded.id;
            const pool = await sql.connect(dbConfig);
            let result = await pool.request()
                .input('id', sql.Int, id)
                .input('user_id', sql.Int, user_id)
                .input('title', sql.NVarChar, title)
                .input('description', sql.NVarChar, description)
                .input('status', sql.NVarChar, status)
                .query(`
                    UPDATE TASKS SET title = @title, description = @description, status = @status
                    WHERE id = @id AND user_id = @user_id
                `);
                if (result.rowsAffected[0] !== 0) {
                console.log("actualizada con exito")
                return new Response(TypeOfResponse.SUCCESS, {}, 'Tarea actualizada correctamente.');
                }
        } catch (error) {
            return new Response(TypeOfResponse.ERROR, {}, 'Error al conectar al servidor.');
        }
    }
}
module.exports = TareasModel;