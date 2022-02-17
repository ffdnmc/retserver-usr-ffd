const mongoose = require('mongoose');


const dbConnection = async() => {

    try {

        await mongoose.connect(process.env.MONGODB_CNN, {
            useNewUrlParser: true,
            useUnifiedTopology: true
            // useCreateIndex: true,
            // useFindAndModify: false
        });

        console.log('Base de Datos online');
        
    } catch (error) {
        console.log(error);
        throw new error('Error al iniciar la base de datos');
    }


}



module.exports =  {
    dbConnection
}