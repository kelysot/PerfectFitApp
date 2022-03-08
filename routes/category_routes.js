const express = require('express')
const router = express.Router()

const Category = require('../controllers/category')
const authenticate = require('../common/auth_middleware')

router.get('/',authenticate,Category.getCategories)

router.post('/', authenticate,Category.addCategory)

router.patch('/:id', authenticate,Category.editCategory)

router.delete('/:id', authenticate,Category.deleteCategory)

module.exports = router