const express = require('express')
const router = express.Router()

const Category = require('../controllers/category')
const authenticate = require('../common/auth_middleware')

/**
* @swagger
* tags:
*   name: Category Api
*   description: The categories API
*/

/**
* @swagger
* components:
*   schemas:
*     Category:
*       type: object
*       required:
*         - name
*         - pictureUrl
*         - gender
*         - isDeleted
*       properties:
*        name:
*           type: String
*           description: The name of the category
*        pictureUrl:
*           type: String
*           description: The url of the picture of the category
*        gender:
*           type: String
*           description: The gender to whom the category belongs
*        subCategory:
*           type: mongoose.Schema.Types.ObjectId
*           description: An array of subCategories 
*        isDeleted:
*           type: Boolean
*           description: The check if the category is deleted
*       example:
*         name: 'Shirt'
*         pictureUrl: 'https://cdn.shopify.com/s/files/1/0970/4540/products/Lynn-Button-Back-Cotton-Dress-2_256x.jpg?v=1647997123'
*         gender: 'Female'
*         subCategory: ['T-shirt','Polo']
*         isDeleted: false
*/

/**
* @swagger
* /category:
*   get:
*     summary: Return the list of all the categories
*     tags: [Category Api]
*     responses:
*       200:
*         description: The list of all the categories
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Category'
*/

router.get('/:gender', authenticate, Category.getCategories)

/**
 * @swagger
 * /category/{id}:
 *  get:
 *    summary: Return the category by id
 *    tags: [Category Api]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The category id
 *    responses:
 *      200:
 *          description: The category description by id
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Category'
 *      404:
 *         description: The category was not found 
 */

router.get('/:id', authenticate, Category.getCategoryById)

/**
 * @swagger
 * /category:
 *  post:
 *    summary: Create a new category
 *    tags: [Category Api]
 *    requestBody:
 *      required: true
 *      content:
 *         application/json:
 *          schema:
 *             $ref: '#/components/schemas/Category'
 *    responses:
 *      200:
 *          description: The category was successfully create
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Category'
 *      400:
 *         description: Some server error 
 */

router.post('/', authenticate, Category.addCategory)

/**
 * @swagger
 * /category/{id}:
 *  patch:
 *    summary: Update the category by id
 *    tags: [Category Api]
 *    parameters:
 *      - in: path
 *        name: id   
 *        schema:
 *          type: string
 *        required: true
 *        description: The category id
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Category'
 *    responses:
 *      200:
 *          description: The category was updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Category'
 *      400:
 *          description: Some error 
 */

router.patch('/:id', authenticate, Category.editCategory)

/**
 * @swagger
 * /category/{id}:
 *  delete:
 *    summary: Remove the category by id
 *    tags: [Category Api]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string 
 *        required: true
 *        description: The category id
 *    responses:
 *      200:
 *          description: The category was deleted successfully
 *      400:
 *          description: Some error     
 */

router.delete('/:id', authenticate, Category.deleteCategory)

/**
 * @swagger
 * /category/getByGenderAndName/{data}:
 *  get:
 *    summary: Return the category by gender and name
 *    tags: [Category Api]
 *    parameters:
 *      - in: path
 *        name: data
 *        schema:
 *          type: string
 *        required: true
 *        description: The category data
 *    responses:
 *      200:
 *          description: The category by gender and name
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Category'
 *      404:
 *         description: The category was not found 
 */

router.get('/getByGenderAndName/:data', authenticate, Category.getCategoryNameAndGender)

module.exports = router