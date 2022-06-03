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
*         - pictureUrl
*         - gender
*         - isDeleted
*       properties:
*        name:
*           type: String
*           description: The name of the subCategory
*        pictureUrl:
*           type: String
*           description: The url of the picture of the subcategory
*        gender:
*           type: String
*           description: The gender of the subCategory
*        categoryId:
*           type: String
*           description: The category id that the subCategory belongs to
*        posts:
*           type: String
*           description: An array of posts of the subCategory
*        isDeleted:
*           type: Boolean
*           description: The check if the subCategory is deleted 
*       example:
*         name: 'T-shirt'
*         pictureUrl: 'https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSmNq21_AFczzpbSxSW5K7gR9OtCK3XfPByH69nY5zTRmw0ilkEQ-VlrFOh9tSsyUF7JIM7GV7Cilc&usqp=CAc'
*         gender: 'Female'
*         categoryId: '6295e5cd0701947bc06be7fc'
*         posts: ["62971ec03c84c67d89299800","62971f513c84c67d892999ff"]
*         isDeleted: false
*/

/**
* @swagger
* /subCategory:
*   get:
*     summary: Return the list of all the subCategories
*     tags: [SubCategory Api]
*     responses:
*       200:
*         description: The list of all the subCategories
*     security:
*       - bearerAuth: []
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
 * /subCategory/{id}:
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
 *    security:
 *       - bearerAuth: []
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
 * /subCategory/{id}:
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
 *    security:
 *       - bearerAuth: []
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
 * /subCategory/{id}:
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
 *    security:
 *       - bearerAuth: []
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
 * /subCategory/{id}:
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
 *    security:
 *       - bearerAuth: []
 *    responses:
 *      200:
 *          description: The subCategory was deleted successfully
 *      400:
 *          description: Some error     
 */

router.delete('/:id', authenticate, SubCategory.deleteSubCategory)

/**
 * @swagger
 * /subCategory/categoryId/{gender}:
 *  get:
 *    summary: Return the subCategory by category id and profile gender
 *    tags: [SubCategory Api]
 *    parameters:
 *      - in: path
 *        name: categoryId
 *        schema:
 *          type: string
 *        required: true
 *        description: The category id
 *      - in: path
 *        name: gender
 *        schema:
 *          type: string
 *        required: true
 *        description: The profile gender
 *    security:
 *       - bearerAuth: []
 *    responses:
 *      200:
 *          description: The subCategory list by categoryId and gender sent
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SubCategory'
 *      404:
 *         description: The subCategory was not found 
 */

router.get('/:categoryId/:gender', authenticate, SubCategory.getSubCategoriesByCategoryId)

/**
 * @swagger
 * /subCategory/edit/getSubCategoriesByNameAndGender/{data}:
 *  get:
 *    summary: Return the subCategory by subcategory name and profile gender
 *    tags: [SubCategory Api]
 *    parameters:
 *      - in: path
 *        name: data
 *        schema:
 *          type: string
 *        required: true
 *        description: The subcategory data
 *    security:
 *       - bearerAuth: []
 *    responses:
 *      200:
 *          description: The subCategory list by subcategory name and gender sent
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/SubCategory'
 *      404:
 *         description: The subCategory was not found 
 */

router.get('/edit/getSubCategoriesByNameAndGender/:data', authenticate, SubCategory.getSubCategoriesByNameAndGender)

module.exports = router