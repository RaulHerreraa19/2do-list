const sql = require('mssql');
const dbConfig = require('../Config/dbConfig'); // Configuración de la base de datos
const { Response, TypeOfResponse } = require('../Common/Response');
let result = {};

class TareasModel{
    constructor(id, user_id, title, description, status){
        this.id = id;
        this.user_id = user_id;
        this.title = title;
        this.description = description;
        this.status = status;
    }

    static async GetTasks(){
        const response = new Response(); // Crear una instancia de Response
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool.request().query('SELECT * FROM TASKS');
            
            response.type_of_response = TypeOfResponse.SUCCESS;
            response.message = 'Tareas obtenidas correctamente';
            response.data = result.recordset;
            
            } catch (error) {
            response.message = 'Error en la conexión al servidor';
            response.type_of_response = TypeOfResponse.ERROR;
        }
    return response; 
}

    static async GetTaskById(id) {
        const response = new Response();
        try {
            // Conectar a la base de datos
            const pool = await sql.connect(dbConfig);
            // Hacer la consulta usando el id
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM TASKS WHERE id = @id');
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

    static async AddTask(user_id, title, description, status) {
        const response = new Response();
        try {   
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

    static async DeleteTask(id) {
        const response = new Response();
        try {
            const pool = await sql.connect(dbConfig);
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM TASKS WHERE id = @id');
            if (result.rowsAffected[0] === 0) {
                response.type_of_response = TypeOfResponse.WARNING;
                response.message = 'No se eliminó la tarea';
                response.data = {};
                return new Response(TypeOfResponse.WARNING, {}, 'No se eliminó la tarea.');
            }
            return new Response(TypeOfResponse.SUCCESS, {}, 'Tarea eliminada correctamente.');
        } catch (error) {
            return new Response(TypeOfResponse.ERROR, {}, 'Error al conectar al servidor.');
        }
    }

    static async UpdateTask(id, title, description, status) {
        let response = new Response();
        try {
            console.log("id", id, "title", title, "description", description, "status", status)
            let token = sessionStorage.getItem('token')
            console.log("token", token) 
            const pool = await sql.connect(dbConfig);
            console.log("pool", pool)
            const updateResponse = await pool.request()
            .input('id', sql.Int, id)
            .input('title', sql.NVarChar(255), title)
            .input('description', sql.NVarChar(sql.MAX), description)
            .input('status', sql.NVarChar(50), status)
            .query(`
                UPDATE TASKS
                SET title = @title, description = @description, status = @status
                WHERE id = @id 
                OUTPUT inserted.*
                SELECT * FROM TASKS WHERE id = @id;
            `);
    
        console.log("Updated Task:", updateResponse.recordset); 
                console.log(response)
            if (response.rowsAffected[0] !== 0) {
                return new Response(TypeOfResponse.SUCCESS, result.recordset[0], 'Tarea actualizada correctamente.');
            } else {
                return new Response(TypeOfResponse.ERROR, {}, 'Error al actualizar la tarea.');
            }
        } catch (error) {
            return new Response(TypeOfResponse.ERROR, {}, 'Error al conectar al servidor.');
        }
    }
}
module.exports = TareasModel;