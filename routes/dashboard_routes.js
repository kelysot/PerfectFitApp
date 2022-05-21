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

router.get('/categories/getId/:categoryData',Dashboard.getCategoryId)

router.get('/categories/:categoryData/subCategoryData',Dashboard.getSubCategoriesData)

router.get('/users/:userName',Dashboard.getProfileChartData)

router.get('/search/:inputToSearch/:typeSearch/:gender',Dashboard.search)

module.exports = router