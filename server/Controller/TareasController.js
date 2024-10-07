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
    

    static async getTaskById(req, res, {id}){
        const response = new Response()
        try{
            response = TareasModel.GetTaskById({id})
            if(response.type_of_response === TypeOfResponse.SUCCESS){
                res.status(200).json(response);
            }
            else{
                res.status(400).json({
                    message: response.message,
                    type_of_response: response.type_of_response
                });
            }

        }
        catch(e){
            const errorResponse = {
                message: 'Error en la conexión al servidor',
                type_of_response: TypeOfResponse.ERROR
            };
            res.status(500).json(errorResponse);
        }
    }

    static async addTask(req, res){
        const response = new Response();
        try{
            const {user_id, title, description, status} = req.body;
            response = await TareasModel.AddTask({user_id, title, description, status});
            response.json(res);
        }
        catch(error){
            response.message = 'Error en la conexión al servidor';
            response.type_of_response = TypeOfResponse.ERROR;
            response.json(res);
        }
    }

    static async updateTask(req, res){
        try{
            const {id} = req.params;
            const {user_id, title, description, status} = req.body;
            Response = await TareasModel.UpdateTask({id, user_id, title, description, status});
            res.json(Response);
        }
        catch(error){
            Response.message = 'Error en la conexión al servidor';
            Response.type_of_response = TypeOfResponse.ERROR;
            res.json(Response);
        }
    }

    static async deleteTask(req, res){
        try{
            const {id} = req.params;
            Response = await TareasModel.DeleteTask({id});
            res.json(Response);
        }
        catch(error){
            Response.message = 'Error en la conexión al servidor';
            Response.type_of_response = TypeOfResponse.ERROR;
            res.json(Response);
        }
    }
}

module.exports = TareasController;