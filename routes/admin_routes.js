const express = require('express')
const authenticate = require('../common/auth_middleware')
const router = express.Router()
const Admin = require('../controllers/admin')

router.post('/register', Admin.register)

router.post('/login', Admin.login)

router.post('/logout', authenticate, Admin.logout)

module.exports = router