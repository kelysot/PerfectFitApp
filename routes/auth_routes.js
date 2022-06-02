const express = require('express')
const authenticate = require('../common/auth_middleware')
const router = express.Router()
const Auth = require('../controllers/auth')


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
*         - isConnected
*         - profilesListId
*         - tokens
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
*        isConnected:
*           type: String
*           description: The check if the user is connected
*        profilesListId:
*           type: String
*           description: An array of profiles ID that belong to the user
*        tokens:
*           type: String
*           description: An array of the tokens of the user 
*       example:
*         email: 'yuval@gmail.com'
*         password: 'yuv123456'
*         type: 'client'
*         isConnected: 'true'
*         profilesListId: ["Yarin","Eden","Tal","Lilach","Kely"]
*         tokens: ["eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTcxZTM0M2M4NGM2N2Q4OTI5OTdiMCIsImlhdCI6MTY1NDE3NjUzNiwiZXhwIjoxNjU0MjYyOTM2fQ.9t8Ccu1rUqnwZDI7Uyr0WsuQaWZJRIzI9AROn9gyixY", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOTcxZTM0M2M4NGM2N2Q4OTI5OTdiMCIsImlhdCI6MTY1NDE3NjUzNiwiZXhwIjoxNjU0MjYyOTM2fQ.9t8Ccu1rUqnwZDI7Uyr0WsuQaWZJRIzI9AROn9gyixY"]
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

/**
* @swagger
* /auth/checkIfEmailExist/{email}:
*   get:
*     summary: check if email exist in databse
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
*               $ref: 
*/

router.get('/checkIfEmailExist/:email', Auth.checkIfEmailExist)

/**
 * @swagger
 * /auth/logout:
 *  post:
 *    summary: logout 
 *    tags: [Auth Api]
 *    requestBody:
 *      required: true
 *      content:
 *         application/json:
 *          schema:
 *              $ref: '#/components/schemas/User'
 *      security:
 *       - bearerAuth: []
 *    responses:
 *       200:
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: 
 */

router.post('/logout', authenticate, Auth.logout)

router.patch('/', authenticate, Auth.editUser)

/**
* @swagger
* /auth/resetPassword/{email}:
*   get:
*     summary: resetPassword
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
*               $ref: 
*/

router.get('/resetPassword/:email', Auth.resetPassword)

router.post('/changePassword', Auth.changePassword)

router.get('/refreshToken', Auth.refreshToken)


module.exports = router