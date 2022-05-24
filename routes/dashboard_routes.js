const express = require('express')
const router = express.Router()

const Dashboard = require('../controllers/dashboard')
const authenticate = require('../common/auth_middleware')

router.get('/',authenticate,Dashboard.getHello)

router.get('/amounts',authenticate,Dashboard.getAmounts)

router.get('/topProfiles',authenticate,Dashboard.getTopProfiles)

router.get('/percentage',authenticate,Dashboard.getPercentage)

router.get('/topCategories',authenticate,Dashboard.getCategoriesData)

router.get('/categories',authenticate,Dashboard.categoriesTableData)

router.get('/categories/:categoryData',authenticate,Dashboard.getSingleCategory)

router.get('/categories/getId/:categoryData',authenticate,Dashboard.getCategoryId)

router.get('/categories/:categoryData/subCategoryData',authenticate,Dashboard.getSubCategoriesData)

router.get('/users/:userName',authenticate,Dashboard.getProfileChartData)

router.get('/search/:inputToSearch/:typeSearch/:gender',authenticate,Dashboard.search)

router.get('/search/:inputToSearch/:typeSearch',authenticate,Dashboard.search)

module.exports = router