const express = require('express')
const authenticate = require('../common/auth_middleware')
const router = express.Router()

const Auth = require('../controllers/auth')

// router.post('/login', Auth.login)
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
*         - email
*         - password
*         - type
*         - profilesListId
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
*         profilesListId: ["Yarin","Eden","Tal","Lilach","Kely"]
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

/**
 * @swagger
 * /auth/login:
 *  post:
 *    summary: registers a new user
 *    tags: [Auth Api]
 *    requestBody:
 *      required: true
 *      content:
 *         application/json:
 *          schema:
 *              $ref: '#/components/schemas/User'
 *    responses:
 *       200:
 *          description: The access & refresh tokens
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Tokens'
 */

router.post('/login', Auth.login)

/**
* @swagger
* /auth/getUser/{email}:
*   get:
*     summary: get user by email
*     tags: [Auth Api]
*     parameters:
*       - in: path
*         name: email
*         schema:
*           type: string
*         required: true
*         description: The user email
*     responses:
*       200:
*         description: the user
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/User'
*/

router.get('/getUser/:email', Auth.getUser)

router.get('/checkIfEmailExist/:email', Auth.checkIfEmailExist)

router.post('/logout', authenticate, Auth.logout)

router.patch('/', authenticate, Auth.editUser)

router.get('/resetPassword/:email', Auth.resetPassword)

router.post('/changePassword', Auth.changePassword)

router.get('/refreshToken', Auth.refreshToken)

//add authenticate wehre needed


module.exports = router