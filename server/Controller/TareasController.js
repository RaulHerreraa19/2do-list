const {Response, TypeOfResponse} = require('../Common/Response');   
const TareasModel = require('../Models/TareasModel');


class TareasController{
    static async getAllTasks(req, res) {
        try {
            const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
            if (!token) {
                return res.status(403).json({ message: 'Token no proporcionado', type_of_response: TypeOfResponse.ERROR });
            }

            // Pasar el token al modelo
            console.log("enrta model")
            const response = await TareasModel.GetTasks(token);
            console.log("sale model")
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
        try{
        console.log("entra controller")
        const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
        if (!token) {
            return res.status(403).json({ message: 'Token no proporcionado', type_of_response: TypeOfResponse.ERROR });
        }
        const id = req.body.id; 
        
            console.log("antes de la tarea")
            response = await TareasModel.GetTaskById(id, token);
            
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
            console.log("entra addtask")
            const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
            if (!token) {
                return res.status(403).json({ message: 'Token no proporcionado', type_of_response: TypeOfResponse.ERROR });
            }
            const {title, description, status, created_date ,end_date} = req.body;
            console.log("antes de la tarea")
            response = await TareasModel.AddTask(token, title, description, status, created_date, end_date);
            
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
            const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
            if (!token) {
                return res.status(403).json({ message: 'Token no proporcionado', type_of_response: TypeOfResponse.ERROR });
            }
            const {id, title, description, status, end_date} = req.body;
            console.log("antes del update")
            response = await TareasModel.UpdateTask(token, id, title, description, status, end_date);
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
            console.log("entra gettasks")
            const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1];
            const id = req.body.id; 
            if (!token) {
                return res.status(403).json({ message: 'Token no proporcionado', type_of_response: TypeOfResponse.ERROR });
            }
            response = await TareasModel.DeleteTask(token, id);
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