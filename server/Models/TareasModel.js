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
        // Llenar el objeto response
        response.type_of_response = TypeOfResponse.SUCCESS;
        response.message = 'Tareas obtenidas correctamente';
        response.data = result.recordset;
        
    } catch (error) {
        response.message = 'Error en la conexión al servidor';
        response.type_of_response = TypeOfResponse.ERROR;
    }
    return response; // Devolver la instancia de Response
}

static async GetTaskById({ id }) {
    const response = new Response();
    try {
        const pool = await sql.connect(dbConfig);
        const result = await pool.request()
            .input('id', sql.Int, id) // Asigna el valor del id al parámetro
            .query('SELECT * FROM TASKS WHERE id = @id');

        if (result.recordset.length > 0) {
            // Llenar el objeto response si se encuentra la tarea
            response.type_of_response = TypeOfResponse.SUCCESS;
            response.message = 'Tarea obtenida correctamente';
            response.data = result.recordset[0]; // Obtener solo la tarea
        } else {
            response.type_of_response = TypeOfResponse.WARNING; // Puede ser una advertencia si no se encuentra
            response.message = 'No se encontró la tarea con ese ID';
            response.data = {};
        }
    } catch (error) {
        response.message = 'Error en la conexión al servidor';
        response.type_of_response = TypeOfResponse.ERROR;
        response.data = {}; // Asegúrate de que siempre haya un objeto de datos
    }
    return response; // Devolver la instancia de Response
}

}
module.exports = TareasModel;