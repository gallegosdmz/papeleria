const { Router } = require('express');
const { body, param } = require('express-validator');
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { getCategories, getCategory, createCategory, updateCategory, deleteCategory } = require('../controllers/category');
const { existCategory } = require('../helpers/db-validators');

const router = Router();

router.get('/', [
    validarJWT,
    validarCampos
], getCategories);

router.get('/:id', [
    validarJWT,
    param('id', 'El ID no es válido').isMongoId(),
    param('id').custom(existCategory),
    validarCampos
], getCategory);

router.post('/', [
    validarJWT,
    body('name', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], createCategory);

router.put('/:id', [
    validarJWT,
    param('id', 'El ID no es válido').isMongoId(),
    param('id').custom(existCategory),
    body('name', 'El nombre es obligatorio').notEmpty(),
    validarCampos
], updateCategory);

router.delete('/:id', [
    validarJWT,
    param('id', 'El ID no es válido').isMongoId(),
    param('id').custom(existCategory),
    validarCampos
], deleteCategory);

module.exports = router;