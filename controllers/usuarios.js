const { response } = require('express');
const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');



const usuariosGet = async(req = request, res = response) => {

    const { limite = 5, desde = 0 } = req.query;
    const query = { estado: true };

    // ejecuta las promesas simultaneamente y solo retorna cuando ambas terminen
    const [ total, usuarios  ] = await Promise.all([
        Usuario.count(query),
        Usuario.find(query)
            .skip(desde)
            .limit(Number(limite))
    ]);


    res.json({
        total,
        usuarios
    });
}

const usuariosPost = async(req, res) => {

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    // verificar si el correo existe
    // Debe hacerse en en las validadiones de la base  ../db-validators.js

    // Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );
    // Guardar en base de datos
    await usuario.save();

    res.json({
        usuario       
    });
}

const usuariosPut = async(req, res = response) => {

    const { id } = req.params;
    const { _id, pasword, google, correo, ...resto } = req.body;

    // TODO: validar id exista en DB
    if ( pasword ) {
        // Encriptar contraseña
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync( password, salt );       
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto)

    res.json( usuario );
}

const usuariosPatch = (req, res) => {

    res.json({
        msg: 'patch API - usuariosPatch'
    });
}

const usuariosDelete = async(req, res=response) => {

    const { id } = req.params;

    // // Borrar fisicamente
    // const usuario = await Usuario.findByIdAndDelete( id );

    // Cambiando estado del usuario
    const usuario = await Usuario.findByIdAndUpdate( id, { estado: false } );


    res.json({
        usuario
    });
}

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}