const express = require('express')
const router = express.Router()

const Comment = require('../controllers/comment')
const authenticate = require('../common/auth_middleware')

/**
* @swagger
* tags:
*   name: Comment Api
*   description: The comments API
*/

/**
* @swagger
* components:
*   schemas:
*     Comment:
*       type: object
*       required:
*         - profileId
*         - date
*         - text  
*       properties:
*        profileId:
*           type: String
*           description: The id of the profile
*        date:
*           type: String
*           description: The date of the comment
*        text:
*           type: String
*           description: The comment text
*       example:
*         profileId: '123456    '
*         date: '16/03/2022'
*         text: 'This is my first comment'
*/

/**
* @swagger
* /Comment:
*   get:
*     summary: Return the list of all the comments
*     tags: [Comment Api]
*     responses:
*       200:
*         description: The list of all the comments
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Comment'
*/

router.get('/',authenticate,Comment.getComments)

/**
 * @swagger
 * /Comment/{id}:
 *  get:
 *    summary: Return the list of comments by post id
 *    tags: [Comment Api]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    responses:
 *      200:
 *          description: The list of comments by post id
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Comment'
 *      404:
 *         description: The post id was not found 
 */

router.get('/:id', authenticate, Comment.getCommentsListIdsByPostId)

/**
 * @swagger
 * /Comment/byId/{id}:
 *  get:
 *    summary: Return the comment by id
 *    tags: [Comment Api]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The comment id
 *    responses:
 *      200:
 *          description: The comment by id
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Comment'
 *      404:
 *         description: The comment id was not found 
 */

router.get('/byId/:id', authenticate, Comment.getCommentById)

/**
 * @swagger
 * /Comment/{id}:
 *  post:
 *    summary: Create a new comment
 *    tags: [Comment Api]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    requestBody:
 *      required: true
 *      content:
 *         application/json:
 *          schema:
 *             $ref: '#/components/schemas/Comment'
 *    responses:
 *      200:
 *          description: The comment was successfully create
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Comment'
 *      400:
 *         description: Some server error 
 */

router.post('/:id', authenticate,Comment.addComment)

/**
 * @swagger
 * /Comment/{id}:
 *  patch:
 *    summary: Update the comment by id
 *    tags: [Comment Api]
 *    parameters:
 *      - in: path
 *        name: id   
 *        schema:
 *          type: string
 *        required: true
 *        description: The comment id
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Comment'
 *    responses:
 *      200:
 *          description: The comment was updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Comment'
 *      400:
 *          description: Some error 
 */

router.patch('/:id', authenticate,Comment.editComment)

/**
 * @swagger
 * /Comment/{id}:
 *  delete:
 *    summary: Remove the comment by id
 *    tags: [Comment Api]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string 
 *        required: true
 *        description: The comment id
 *    responses:
 *      200:
 *          description: The comment was deleted successfully
 *      400:
 *          description: Some error     
 */

router.delete('/:id', authenticate,Comment.deleteComment)

module.exports = router