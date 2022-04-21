const express = require('express')
const router = express.Router()

const Dashboard = require('../controllers/dashboard')

router.get('/',Dashboard.getHello)

router.get('/amounts',Dashboard.getAmounts)

router.get('/topProfiles',Dashboard.getTopProfiles)

router.get('/percentage',Dashboard.getPercentage)

router.get('/topCategories',Dashboard.getCategoriesData)

router.get('/categories',Dashboard.categoriesTableData)

router.get('/categories/:categoryData',Dashboard.getSingleCategory)

module.exports = router