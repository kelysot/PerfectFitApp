const express = require('express')
const authenticate = require('../common/auth_middleware')
const router = express.Router()

const Auth = require('../controllers/auth')

router.post('/login', Auth.login)
// router.post('/logout', authenticate, Auth.logout)
// router.post('/refreshToken', Auth.refreshToken)

/**
* @swagger
* tags:
*   name: Auth Api
*   description: The Authentication API
*/

/**
* @swagger
* components:
*   securitySchemes:
*       bearerAuth:
*           type: http
*           scheme: bearer
*           bearerFormat: JWT
*/

/**
* @swagger
* components:
*   schemas:
*     User:
*       type: object
*       required:
*         -email
*         -password
*         -type
*         -profilesListId
*       properties:
*        email:
*           type: String
*           description: The user email
*        password:
*           type: String
*           description: The user password
*        type:
*           type: String
*           description: The type of the user
*        profilesListId:
*           type: String
*           description: An array of profiles ID that belong to the user 
*       example:
*         email: 'y@gmail.com'
*         password: '123456'
*         type: 'admin'
*         profilesListId: ["Yarin","Eden","Tal","Lilach","Kelly"]
*/


/**
* @swagger
* /auth/register:
*   post:
*       summary: registers a new user
*       tags: [Auth Api]
*       requestBody:
*           required: true
*           content:
*               application/json:
*                   schema:
*                        $ref: '#/components/schemas/User'
*       responses:
*           200:
*               description: The new user
*               content:
*                   application/json:
*                       schema:
*                           $ref: '#/components/schemas/User'
*/

router.post('/register', Auth.register)


module.exports = router