const express = require('express')
const router = express.Router()

const SubCategory = require('../controllers/subCategory')
const authenticate = require('../common/auth_middleware')

router.get('/',authenticate,SubCategory.getSubCategories)

router.post('/:id', authenticate,SubCategory.addSubCategory)

router.patch('/:id', authenticate,SubCategory.editSubCategory)

router.delete('/:id', authenticate,SubCategory.deleteSubCategory)

module.exports = router