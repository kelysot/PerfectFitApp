const express = require('express')
const router = express.Router()

const SubCategory = require('../controllers/subCategory')
const authenticate = require('../common/auth_middleware')

/**
* @swagger
* tags:
*   name: SubCategory Api
*   description: The subcategories API
*/

/**
* @swagger
* components:
*   schemas:
*     SubCategory:
*       type: object
*       required:
*         - name
*         - categoryId
*       properties:
*        name:
*           type: String
*           description: The name of the subCategory
*        categoryId:
*           type: String
*           description: The category id
*       example:
*         name: 'T-shirt'
*         categoryId: 'Shirt'
*/

/**
* @swagger
* /SubCategory:
*   get:
*     summary: Return the list of all the subCategories
*     tags: [SubCategory Api]
*     responses:
*       200:
*         description: The list of all the subCategories
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/SubCategory'
*/

router.get('/', authenticate, SubCategory.getSubCategories)

/**
 * @swagger
 * /SubCategory/{id}:
 *  get:
 *    summary: Return the subCategory by id
 *    tags: [SubCategory Api]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The subCategory id
 *    responses:
 *      200:
 *          description: The subCategory description by id
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SubCategory'
 *      404:
 *         description: The subCategory was not found 
 */

router.get('/getSubCategoryById/:id', authenticate, SubCategory.getSubCategoryById)

/**
 * @swagger
 * /SubCategory/{id}:
 *  post:
 *    summary: Create a new subCategory
 *    tags: [SubCategory Api]
 *    parameters:
 *      - in: path
 *        name: id   
 *        schema:
 *          type: string
 *        required: true
 *        description: The Category id
 *    requestBody:
 *      required: true
 *      content:
 *         application/json:
 *          schema:
 *             $ref: '#/components/schemas/SubCategory'
 *    responses:
 *      200:
 *          description: The subCategory was successfully create
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SubCategory'
 *      400:
 *         description: Some server error 
 */

router.post('/:id', authenticate, SubCategory.addSubCategory)

/**
 * @swagger
 * /SubCategory/{id}:
 *  patch:
 *    summary: Update the subCategory by id
 *    tags: [SubCategory Api]
 *    parameters:
 *      - in: path
 *        name: id   
 *        schema:
 *          type: string
 *        required: true
 *        description: The subCategory id
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/SubCategory'
 *    responses:
 *      200:
 *          description: The subCategory was updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/SubCategory'
 *      400:
 *          description: Some error 
 */

router.patch('/:id', authenticate, SubCategory.editSubCategory)

/**
 * @swagger
 * /SubCategory/{id}:
 *  delete:
 *    summary: Remove the subCategory by id
 *    tags: [SubCategory Api]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string 
 *        required: true
 *        description: The subCategory id
 *    responses:
 *      200:
 *          description: The subCategory was deleted successfully
 *      400:
 *          description: Some error     
 */

router.delete('/:id', authenticate, SubCategory.deleteSubCategory)

//TODO: add to Swagger API
router.get('/:categoryId/:gender', authenticate, SubCategory.getSubCategoriesByCategoryId)

router.get('/edit/getSubCategoriesByNameAndGender/:data',authenticate,SubCategory.getSubCategoriesByNameAndGender)
module.exports = router