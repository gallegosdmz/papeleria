const { Router } = require('express');
const { body, param } = require('express-validator');
const { getUsers, getUser, createUser, deletedUser, updateUser } = require('../controllers/user');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { existUser, existUserEmail } = require('../helpers/db-validators');

const router = Router();

router.get('/', [
    validarJWT,
    validarCampos
], getUsers);

router.get('/:id', [
    validarJWT,
    param('id', 'El ID no es válido').isMongoId(),
    param('id').custom(existUser),
    validarCampos
], getUser);

router.post('/', [
    validarJWT,
    body('name', 'El nombre es obligatorio').notEmpty(),
    body('surname', 'Los apellidos son obligatorio').notEmpty(),
    body('email', 'El email no es válido').isEmail(),
    body('email').custom(existUserEmail),
    body('password', 'La contraseña debe ser de minimo 6 caracteres').isLength({min: 6}),
    validarCampos
], createUser);

router.put('/:id', [
    validarJWT,
    param('id', 'El ID no es válido').isMongoId(),
    param('id').custom(existUser),
    body('name', 'El nombre es obligatorio').notEmpty(),
    body('surname', 'Los apellidos son obligatorio').notEmpty(),
    body('email', 'El email no es válido').isEmail(),
    body('password', 'La contraseña debe ser de minimo 6 caracteres').isLength({min: 6}),
    validarCampos
], updateUser);

router.delete('/:id', [
    validarJWT,
    param('id', 'No es un ID válido').isMongoId(),
    param('id').custom(existUser),
    validarCampos
], deletedUser);

module.exports = router;