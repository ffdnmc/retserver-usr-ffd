const express = require('express');
const cors = require('cors');

const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPatch = '/api/usuarios';

        // Conectar a Base de datos
        this.conectarDB();

        // Middlewares Funciones que añaden funcionalidad a mi webserver
        this.middlewares();

        // RUTAS DE MI APLICACION
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    middlewares() {

        // CORS
        this.app.use( cors() ); 

        // Lectura y parseo del body
        this.app.use( express.json() );

        // Directorio publico
        this.app.use( express.static('public') );

    }

    //esto ya no funciona, si queremos que funcione debemos colocar /algo
    routes() {

      this.app.use(this.usuariosPatch, require('../routes/usuarios'));  
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en', this.port);
        } );
    }

}




module.exports = Server;