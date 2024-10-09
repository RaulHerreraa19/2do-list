const {Response, TypeOfResponse} = require('../Common/Response');   
const TareasModel = require('../Models/TareasModel')


class TareasController{
    static async getAllTasks(req, res) {
        try {
            const response = await TareasModel.GetTasks(); // Usar una instancia de Response
            
            if (response.type_of_response === TypeOfResponse.SUCCESS) {
                res.status(200).json(response);  // Enviar respuesta con el código HTTP adecuado
            } else {
                res.status(400).json({
                    message: response.message,
                    type_of_response: response.type_of_response
                });
            }
        } catch (error) {
            const errorResponse = {
                message: 'Error en la conexión al servidor',
                type_of_response: TypeOfResponse.ERROR
            };
            res.status(500).json(errorResponse);  // Enviar error con el código HTTP adecuado
        }
    }
    

    static async GetTaskById(req, res){
        let response = new Response();
        const id = req.body.id; 
        try{
            console.log("antes de la tarea")
            response = await TareasModel.GetTaskById(id);
            console.log("despues de la tarea");
            
            // Si el tipo de respuesta es éxito, devolver el resultado
            if (response.type_of_response === TypeOfResponse.SUCCESS) {
                return res.status(200).json(response);
            } else {
                // Si no se encuentra o hay algún error, devolver la respuesta con el mensaje de error
                return res.status(404).json({
                    message: response.message,
                    type_of_response: response.type_of_response
                });
            }
        } catch (error) {
            // En caso de un error inesperado, devolver una respuesta con código 500
            return res.status(500).json({
                message: 'Error en la conexión al servidor',
                type_of_response: TypeOfResponse.ERROR
            });
        }
    }

    static async addTask(req, res){
        let response = new Response();
        try{
            const {user_id, title, description, status} = req.body;
            response = await TareasModel.AddTask(user_id, title, description, status);
            return res.status(200).json(response);
        }
        catch(error){
            response.message = 'Error en la conexión al servidor';
            response.type_of_response = TypeOfResponse.ERROR;
            return res.status(500).json(response);
        }
    }

    static async updateTask(req, res){
        let response = new Response();
        try{
            const {id, title, description, status} = req.body;
            console.log("antes del update")
            response = await TareasModel.UpdateTask(id, title, description, status);
            console.log("response", response)
            return res.status(200).json(response);
        }
        catch(error){
            response.message = 'Error en la conexión al servidor';
            response.type_of_response = TypeOfResponse.ERROR;
            return res.status(500).json(response);
        }
    }

    static async deleteTask(req, res){
        let response = new Response();
        try{
            const id = req.body.id;
            response = await TareasModel.DeleteTask(id);
            return res.status(200).json(response);
        }
        catch(error){
            response.message = 'Error en la conexión al servidor';
            response.type_of_response = TypeOfResponse.ERROR;
            return res.status(500).json(response);
        }
    }
}

module.exports = TareasController;