
const { Router }  =  require('express');
const { check }  =  require('express-validator');


const { validarCampos } = require('../middlewares/validar-campos');
const { esRoleValido, emailExiste, existeUsuarioPorId } = require('../helpers/db-validators');

const { usuariosGet,
        usuariosPost,
        usuariosPut,
        usuariosPatch,
        usuariosDelete } = require('../controllers/usuarios');

const router = Router();


router.get('/', usuariosGet );

router.put('/:id',[
    check('id', "No es un ID válido").isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    check('rol').custom( esRoleValido ),
    validarCampos
],usuariosPut );

router.post('/',[
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password es obligatorio y mayor a 6 caracteres').isLength({ min: 6 }),
    check('correo', 'El correo no es valido').isEmail(),
    check('correo').custom( emailExiste ),
    //check('rol', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // check('rol').custom( (rol) => esRoleValido(rol) ),
    // cundo una funcion o un callback  cuyo primer argumento sea
    // el mismo que estamos recibiendo por respuesta, podemos
    // obvialo y hacer solo la referencia
    check('rol').custom( esRoleValido ),
    validarCampos
], usuariosPost ); 

router.delete('/:id',[
    check('id', "No es un ID válido").isMongoId(),
    check('id').custom( existeUsuarioPorId ),
    validarCampos
], usuariosDelete );

router.patch('/', usuariosPatch );



module.exports = router;
