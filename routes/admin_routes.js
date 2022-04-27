const express = require('express')
const authenticate = require('../common/auth_middleware')
const router = express.Router()

const Admin = require('../controllers/admin')

router.post('/register', Admin.register)

router.post('/login', Admin.login)

router.get('/getAdmin/:email', Admin.getUser)

router.get('/checkIfEmailExist/:email', Admin.checkIfEmailExist)

router.post('/logout', authenticate, Admin.logout)

module.exports = router