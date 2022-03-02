const express = require('express')
const router = express.Router()

const Post = require('../controllers/posts')
const authenticate = require('../common/auth_middleware')


/**
* @swagger
* tags:
*   name: Post Api
*   description: The Post API
*/

/**
* @swagger
* components:
*   schemas:
*     Post:
*       type: object
*       required:
*         - message
*         - sender
*       properties:
*         message:
*           type: string
*           description: The post text 
*         sender:
*           type: string
*           description: The user who send the post id
*       example:
*         message: 'this is swagger test message'
*         sender: '123456'
*/

/**
* @swagger
* /post:
*   get:
*     summary: get all posts
*     tags: [Post Api]
*     responses:
*       200:
*         description: The posts list
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Post'
*/

router.get('/', authenticate, Post.getPosts)


/**
* @swagger
* /post/{id}:
*   get:
*     summary: get post by id
*     tags: [Post Api]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The post id
*     responses:
*       200:
*         description: the post
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Post'
*/

router.get('/:id', authenticate,  Post.getPostById)

/**
* @swagger
* /post:
*   post:
*     summary: add new post
*     tags: [Post Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Post'
*     responses:
*       200:
*         description: The posts list
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Post'
*/

router.post('/', authenticate, Post.addNewPost)


module.exports = router
