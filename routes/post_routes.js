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

// /**
// * @swagger
// * components:
// *   securitySchemes:
// *       bearerAuth:
// *           type: http
// *           scheme: bearer
// *           bearerFormat: JWT
// */

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
*         - picturesUrl
*         - likes
*         - comments
*       properties:
*        profileId:
*           type: String
*           description: The profile ID
*        productName:
*           type: String
*           description: The name of the product
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
*           type: mongoose.Schema.Types.ObjectId
*           description: An array of profiles ID who liked the post
*        comments:
*           type: mongoose.Schema.Types.ObjectId
*           description: An array of profiles ID who comment on the post
*       example:
*         profileId: 'Yarin'
*         productName: 'shirt'
*         sku: 'KS123456'
*         size: 'Large' 
*         company: 'Renuar'
*         price: '125.00'
*         color: 'blue'
*         categoryId: 'Shirt'
*         subCategoryId: 'T-shirt'
*         description: 'Nice shirt, very comfortable'
*         date: '22/03/2022'
*         link: 'https://www.renuar.co.il/he/men/sale/hvlcvt-ti-qcrvt-3-b-99-90-w-h/422895519.html'
*         sizeAdjustment: 'The shirt rests well on the body'
*         rating: 'The fabric of the shirt is very comfortable and the color is beautiful'
*         picturesUrl: ["https://www.renuar.co.il/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/4/2/422895519-1.jpg",
*                       "https://www.renuar.co.il/media/catalog/product/cache/2/image/9df78eab33525d08d6e5fb8d27136e95/4/2/422895519-2.jpg"]
*         likes: ["E215616547418","YE4564651236"]
*         comments: ["E215616547418","AE45646546"]
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

router.get('/',authenticate, Post.getPosts)


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

router.get('/:id', authenticate, Post.getPostById)


/**
 * @swagger
 * /post:
 *  post:
 *    summary: Create a new post
 *    tags: [Post Api]
 *    requestBody:
 *      required: true
 *      content:
 *         application/json:
 *          schema:
 *             $ref: '#/components/schemas/Post'
 *    responses:
 *      200:
 *          description: The post was successfully create
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Post'
 *      400:
 *         description: Some server error 
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

router.patch('/:id', authenticate, Post.editPost)

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

router.get('/getWishList/:userName',authenticate, Post.getWishList)


module.exports = router
