const express = require('express')
const router = express.Router()

const Dashboard = require('../controllers/dashboard')

router.get('/',Dashboard.getHello)

router.get('/amounts',Dashboard.getAmounts)

router.get('/topProfiles',Dashboard.getTopProfiles)

module.exports = router