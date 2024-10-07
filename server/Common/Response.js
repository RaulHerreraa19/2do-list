// Definición del Enum TypeOfResponse
const TypeOfResponse = Object.freeze({
    SUCCESS: 'success',
    ERROR: 'error',
    WARNING: 'warning',
    INFO: 'info',
});

// Clase Response
class Response {
    constructor(type_of_response = TypeOfResponse.INFO, data = {}, message = '') {
        this.type_of_response = type_of_response;
        this.data = data;
        this.message = message;
    }

    // Método para convertir el objeto a JSON si es necesario
    toJson() {
        return {
            type_of_response: this.type_of_response,
            data: this.data,
            message: this.message,
        };
    }
}

// Exportar la clase y el enum si lo necesitas en otros módulos
module.exports = { Response, TypeOfResponse };
