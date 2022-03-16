const express = require('express')
const router = express.Router()

const Notifications = require('../controllers/notification')
const authenticate = require('../common/auth_middleware')

/**
* @swagger
* tags:
*   name: Notification Api
*   description: The notification API
*/

/**
* @swagger
* components:
*   schemas:
*     Notification:
*       type: object
*       required:
*         - profileId
*         - notificationType
*         - date
*       properties:
*        profileId:
*           type: String
*           description: The profile id
*        notificationType:
*           type: String
*           description: The type of the notification
*        date:
*           type: String
*           description: The date of the notification
*       example:
*         profileId: '123456'
*         notificationType: 'Like'
*         date: '16/03/2022'
*/

/**
* @swagger
* /Notification:
*   get:
*     summary: Return the list of all the notifications
*     tags: [Notification Api]
*     responses:
*       200:
*         description: The list of all the notifications
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Notification'
*/

router.get('/',authenticate,Notifications.getNotifications)

/**
 * @swagger
 * /Notification/{id}:
 *  get:
 *    summary: Return the notification List by profile id
 *    tags: [Notification Api]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The profile id
 *    responses:
 *      200:
 *          description: The list of notifications by profile id
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Notification'
 *      404:
 *         description: The profile id was not found 
 */

router.get('/:id',authenticate,Notifications.getNotificationsListByProfileId)

/**
 * @swagger
 * /Notification/byId/{id}:
 *  get:
 *    summary: Return the notification by id
 *    tags: [Notification Api]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *          type: string
 *        required: true
 *        description: The notification id
 *    responses:
 *      200:
 *          description: The notification by notification id
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Notification'
 *      404:
 *         description: The notification id was not found 
 */

router.get('/byId/:id',authenticate,Notifications.getNotificationById)

/**
 * @swagger
 * /Notification/{id}:
 *  post:
 *    summary: Create a new notification
 *    tags: [Notification Api]
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
 *             $ref: '#/components/schemas/Notification'
 *    responses:
 *      200:
 *          description: The notification was successfully create
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Notification'
 *      400:
 *         description: Some server error 
 */

router.post('/:id',authenticate,Notifications.addNotification)

/**
 * @swagger
 * /Notification/{id}:
 *  patch:
 *    summary: Update the notification by id
 *    tags: [Notification Api]
 *    parameters:
 *      - in: path
 *        name: id   
 *        schema:
 *          type: string
 *        required: true
 *        description: The notification id
 *    requestBody:
 *      required: true
 *      content:
 *          application/json:
 *              schema:
 *                  $ref: '#/components/schemas/Notification'
 *    responses:
 *      200:
 *          description: The notification was updated successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/Notification'
 *      400:
 *          description: Some error 
 */


router.patch('/:id',authenticate,Notifications.editNotification)

/**
 * @swagger
 * /Notification/{id}:
 *  delete:
 *    summary: Remove the notification by id
 *    tags: [Notification Api]
 *    parameters:
 *      - in: path
 *        name: id
 *        schema:
 *         type: string 
 *        required: true
 *        description: The notification id
 *    responses:
 *      200:
 *          description: The notification was deleted successfully
 *      400:
 *          description: Some error     
 */

router.delete('/:id',authenticate,Notifications.deleteNotification)

module.exports = router