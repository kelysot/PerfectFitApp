const express = require('express')
const router = express.Router()

const Profile = require('../controllers/profiles')
const authenticate = require('../common/auth_middleware')

/**
* @swagger
* tags:
*   name: Profile Api
*   description: The Profile API
*/

/**
* @swagger
* components:
*   schemas:
*     Profile:
*       type: object
*       required:
*         - userId
*         - firstName
*         - lastName
*         - gender
*         - userName
*         - birthday
*         - pictureUrl
*         - bigPictureUrl
*         - shoulder
*         - chest
*         - basin
*         - waist
*         - foot
*         - height
*         - weight
*         - bodyType
*         - status
*         - isDeleted
*       properties:
*        userId:
*           type: String
*           description: The user ID the profile is associated with
*        firstName:
*           type: String
*           description: The first name of the profile owner
*        lastName:
*           type: String
*           description: The last name of the profile owner
*        gender:
*           type: String
*           description: The gender of the profile owner
*        userName:
*           type: String
*           description: The user name(nickname) of the profile owner
*        birthday:
*           type: String
*           description: The birthday of the profile owner
*        pictureUrl:
*           type: String
*           description: The url to the picture of the profile owner
*        bigPictureUrl:
*           type: String
*           description: The url to the big picture of the profile owner
*        shoulder:
*           type: String
*           description: Profile owner's shoulder length
*        chest:
*           type: String
*           description: Profile owner's chest length
*        basin:
*           type: String
*           description: Profile owner's basin length
*        waist:
*           type: String
*           description: Profile owner's waist length
*        foot:
*           type: String
*           description: Profile owner's foot length
*        height:
*           type: String
*           description: Profile owner's height 
*        weight:
*           type: String
*           description: Profile owner's weight
*        bodyType:
*           type: String
*           description: Profile owner's bodyType
*        status:
*           type: String
*           description: Check if the profile owner is connected
*        similarProfileId:
*           type: mongoose.Schema.Types.ObjectId
*           description: Profiles with similar dimensions to the profile owner - for the matching algorithm
*        followers:
*           type: String
*           description: Profiles that follow the profile owner
*        trackers:
*           type: String
*           description: Profiles that the profile owner follow
*        notifications:
*           type: mongoose.Schema.Types.ObjectId
*           description: Notifications the profile owner has (for example, like or comment on his post)
*        wishlist:
*           type: mongoose.Schema.Types.ObjectId
*           description: The list of posts that the profile owner has saved because he is interested in the items posted in it
*        myPostsListId:
*           type: mongoose.Schema.Types.ObjectId
*           description: Profile owner's posts list
*        isDeleted:
*           type: Boolean
*           description: Check if the profile owner deleted his profile
*       example:
*         userId: 'yuval@gmail.com'
*         firstName: 'Yuval'
*         lastName: 'Levi'
*         gender: 'Female' 
*         userName: 'yuv92'
*         birthday: '07/11/1992'
*         pictureUrl: 'uploads/f86488dab7577b9c557670dc0f63d2d6.png'
*         bigPictureUrl: 'uploads/26299beb5c6407d91360a354245300b9.png'
*         shoulder: '80'
*         chest: '90'
*         basin: '80'
*         waist: '80'
*         foot: '80'
*         height: '80'
*         weight: '70'
*         bodyType: 'Hourglass'
*         status: 'false'
*         similarProfileId: ["Amit", "Dana", "Sapir"]
*         followers: ["Noa", "Roi"]
*         trackers: ["Noa", "Lena", "Anna"]
*         notifications: ["62971f513c84c67d892999ff", "62971ecc3c84c67d8929986d"]
*         wishlist: ["62971ec73c84c67d89299859", "62971ec93c84c67d89299860"]
*         myPostsListId: ["62971ec03c84c67d89299800", "62971edc3c84c67d89299992"]
*         isDeleted: false
*/

/**
* @swagger
* /profile:
*   post:
*     summary: Add new profile
*     tags: [Profile Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Profile'
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: Add new profile
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Profile'
*/

router.post('/', authenticate, Profile.addNewProfile)

/**
* @swagger
* /profile/{id}:
*   get:
*     summary: Get profile by id
*     tags: [Profile Api]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The profile id
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: the profile
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Profile'
*/

router.get('/:id', Profile.getProfileById)

/**
 * @swagger
 * /profile/{userName}:
 *  delete:
 *    summary: Change profile isDeleted to true
 *    tags: [Profile Api]
 *    parameters:
 *      - in: path
 *        name: userName
 *        schema:
 *         type: string 
 *        required: true
 *        description: The profile userName
 *    security:
 *       - bearerAuth: []
 *    responses:
 *      200:
 *          description: The profile isDeleted changed to true successfully
 *      400:
 *          description: Some error     
 */

router.delete('/:userName', authenticate, Profile.deleteProfile)

/**
* @swagger
* /profile/:
*   get:
*     summary: Get profile by user-email and profile-userName
*     tags: [Profile Api]
*     parameters:
*       - in: path
*         name: email
*         schema:
*           type: string
*         required: true
*         description: user email
*       - in: path
*         name: userName
*         schema:
*           type: string
*           required: true
*           description: profile userName
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: the profile
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Profile'
*/

router.patch('/', authenticate, Profile.editProfile)

/**
* @swagger
* /profile/getProfile/{email}/{userName}:
*   get:
*     summary: Get profile by email and username
*     tags: [Profile Api]
*     parameters:
*       - in: path
*         name: email
*         schema:
*           type: string
*         required: true
*         description: The profile id
*       - in: path
*         name: userName
*         schema:
*           type: string
*         required: true
*         description: The profile userName
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: the profile
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Profile'
*/

router.get('/getProfile/:email/:userName', authenticate, Profile.getProfile)

/**
* @swagger
* /profile/getProfile/{userName}:
*   get:
*     summary: Get profile by username
*     tags: [Profile Api]
*     parameters:
*       - in: path
*         name: userName
*         schema:
*           type: string
*         required: true
*         description: The profile userName
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: the profile
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Profile'
*/

router.get('/getProfile/:userName', authenticate, Profile.getProfileByUserName)

/**
* @swagger
* /profile/checkIfUserNameExist/{userName}:
*   get:
*     summary: Check if the userName exists
*     tags: [Profile Api]
*     parameters:
*       - in: path
*         name: userName
*         schema:
*           type: string
*         required: true
*         description: The profile userName
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: the userName doesn't exists
*         content:
*           text/plain:
*             schema:
*               type: string
*/

router.get('/checkIfUserNameExist/:userName', authenticate, Profile.checkIfUserNameExist)

/**
* @swagger
* /profile:
*   get:
*     summary: Return the list of all the profiles
*     tags: [Profile Api]
*     responses:
*       200:
*         description: The list of all the profiles
*     security:
*       - bearerAuth: []
*         content:
*           application/json:
*             schema:
*               type: array
*               items:
*                 $ref: '#/components/schemas/Profile'
*/

router.get('/', authenticate, Profile.getAllProfiles)

/**
* @swagger
* /profile/getProfilesByUserNames/{userName}:
*   get:
*     summary: Get all profiles by userNames
*     tags: [Profile Api]
*     parameters:
*       - in: path
*         name: userName
*         schema:
*           type: string
*         required: true
*         description: The profile userName
*     security:
*       - bearerAuth: []
*     responses:
*       200:
*         description: The list of all the profiles
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Profile'
*/

router.get('/getProfilesByUserNames/:userNames', authenticate, Profile.getProfilesByUserNames)

module.exports = router

