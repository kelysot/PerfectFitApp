const express = require('express')
const authenticate = require('../common/auth_middleware')
const router = express.Router()

const Auth = require('../controllers/auth')

router.post('/login', Auth.login)
router.post('/register', Auth.register)
// router.post('/logout', authenticate, Auth.logout)
// router.post('/refreshToken', Auth.refreshToken)

module.exports = router