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
*         - profileId
*         - productName
*         - sku
*         - size
*         - company
*         - price
*         - color
*         - categoryId
*         - subCategoryId
*         - description
*         - date
*         - link
*         - sizeAdjustment
*         - rating
*         - comments
*         - isDeleted
*       properties:
*        profileId:
*           type: String
*           description: The profile who wrote this post ID
*        productName:
*           type: String
*           description: The name of the product in the post
*        sku:
*           type: String
*           description: The serial number of the product
*        size:
*           type: String
*           description: The size of the product
*        company:
*           type: String
*           description: The company of the product
*        price:
*           type: String
*           description: The price of the product
*        color:
*           type: String
*           description: The color of the product
*        categoryId:
*           type: String
*           description: The main category ID of the product
*        subCategoryId:
*           type: String
*           description: The secondary category ID of the product
*        description:
*           type: String
*           description: The descriptor of the product
*        date:
*           type: String
*           description: The date the post posted
*        link:
*           type: String
*           description: Link for the product
*        sizeAdjustment:
*           type: String
*           description: How much the product fits the body structure of the customer
*        rating:
*           type: String
*           description: Product rating in general
*        picturesUrl:
*           type: String
*           description: An array of links to the images that displayed in the post
*        likes:
*           type: String
*           description: An array of profiles ID who liked the post
*        comments:
*           type: mongoose.Schema.Types.ObjectId
*           description: An array of profiles ID who comment on the post
*        isDeleted:
*           type: Boolean
*           description: The check if the post is deleted
*       example:
*         profileId: 'Haim'
*         productName: 'White shirt'
*         sku: 'KS123456'
*         size: 'L' 
*         company: 'Renuar'
*         price: '125.00'
*         color: 'blue'
*         categoryId: 'Shirt'
*         subCategoryId: 'T-shirt'
*         description: 'Nice shirt, very comfortable'
*         date: '22/03/2022'
*         link: 'https://www.renuar.co.il/he/men/sale/hvlcvt-ti-qcrvt-3-b-99-90-w-h/422895519.html'
*         sizeAdjustment: '3'
*         rating: '4.5'
*         picturesUrl: ["uploads/f86488dab7577b9c557670dc0f63d2d6.png"]
*         likes: ["Amit","Liem"]
*         comments: ["62971ec03c84c67d89299800","62971f513c84c67d892999ff"]
*         isDeleted: false
*/

/**
* @swagger
* /post:
*   get:
*     summary: Return the list of all the posts
*     tags: [Post Api]
*     responses:
*       200:
*         description: The list of all the categories
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
 *  get:
 *    summary: Return the post by id
 *    tags: [Post Api]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The post id
 *    responses:
 *      200:
 *          description: The post description by id
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Post'
 *      404:
 *         description: The post was not found 
 */

// router.get('/:id', authenticate, Post.getPostById)


/**
* @swagger
* /post:
*   post:
*     summary: Create a new post
*     tags: [Post Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Post'
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: The post was successfully create 
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Post'
*/

router.post('/', authenticate, Post.addNewPost)

/**
 * @swagger
 * /post/{id}:
 *  patch:
 *    summary: Update the post by id
 *    tags: [Post Api]
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
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Post'
 *    responses:
 *      200:
 *          description: The post was updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Post'
 *      400:
 *          description: Some error 
 */

router.patch('/', authenticate, Post.editPost)

/**
 * @swagger
 * /post/{id}:
 *  delete:
 *    summary: Remove the post by id
 *    tags: [Post Api]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string 
 *        required: true
 *        description: The post id
 *    responses:
 *      200:
 *          description: The post was deleted successfully
 *      400:
 *          description: Some error     
 */

router.delete('/:postId', authenticate, Post.deletePost)


// router.get('/getWishList/:wishListId',authenticate, Post.getWishList)

router.get('/getWishList/:userName', authenticate, Post.getWishList)

router.get('/getProfilePosts/:userName', authenticate, Post.getProfilePosts)

router.get('/getPostById/:postId', authenticate, Post.getPostById)

router.get('/getPostsBySubCategoryId/:subCategoryId', authenticate, Post.getPostsBySubCategoryId)

router.get('/getDates/:date', authenticate, Post.getDates)

router.get('/getSuitablePosts/:profileId', authenticate, Post.getSuitablePosts)

router.get('/timeSince/:date', authenticate, Post.timeSince)

router.post('/getSearchPosts', authenticate, Post.getSearchPosts)

router.post('/general', authenticate, Post.general)

router.get('/getGeneral', authenticate, Post.getGeneral)

router.get('/getPostsByIds/:postsId', authenticate, Post.getPostsByIds)



module.exports = router
