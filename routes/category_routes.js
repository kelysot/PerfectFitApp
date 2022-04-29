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
*       properties:
*        name:
*           type: String
*           description: The name of the category
*        gender:
*           type: String
*           description: The gender 
*        subCategory:
*           type: mongoose.Schema.Types.ObjectId
*           description: An array of subCategories 
*       example:
*         name: 'Shirt'
*         gender: 'Female'
*         subCategory: ['T-shirt','Polo']
*/

/**
* @swagger
* /Category:
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
 * /Category/{id}:
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
 * /Category:
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
 * /Category/{id}:
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
 * /Category/{id}:
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

router.get('/getByGenderAndName/:data', Category.getCategoryNameAndGender)

module.exports = router