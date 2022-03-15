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
*         - shoulder
*         - chest
*         - basin
*         - waist
*         - foot
*         - height
*         - weight
*         - bodyType
*         - status
*         - similarProfileId
*         - followers
*         - trackers
*         - notifications
*         - wishlist
*         - myPostsListId
*       properties:
*        userId:
*           type: String
*           description: The user ID
*        firstName:
*           type: String
*           description: The first name of the profile owner
*        slastNameku:
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
*           type: Boolean
*           description: Check if the profile owner is connected
*        similarProfileId:
*           type: mongoose.Schema.Types.ObjectId
*           description: Profiles with similar dimensions to the profile owner - for the matching algorithm
*        followers:
*           type: mongoose.Schema.Types.ObjectId
*           description: Profiles that follow the profile owner
*        trackers:
*           type: mongoose.Schema.Types.ObjectId
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
*       example:
*         userId: '1234'
*         firstName: 'Yuval'
*         lastName: 'Levi'
*         gender: 'female' 
*         userName: 'yuv92'
*         birthday: '07.11.92'
*         pictureUrl: 'pic1'
*         shoulder: '80'
*         chest: '90'
*         basin: '80'
*         waist: '80'
*         foot: '80'
*         height: '80'
*         weight: '70'
*         bodyType: '1'
*         status: 'false'
*         similarProfileId: ["33dsc", "4dsc5", "75dsds"]
*         followers: ["33dsc", "4dsc5", "75dsds"]
*         trackers: ["33dsc", "4dsc5", "75dsds"]
*         notifications: ["fvds3", "sdvds23", "cds23"]
*         wishlist: ["dsdv34", "dsvv33", "vsd23"]
*         myPostsListId: ["dscg75", "bdfm65f", "dfvfs2d"]
*/

/**
* @swagger
* /profile:
*   post:
*     summary: add new profile
*     tags: [Profile Api]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Profile'
*     responses:
*       200:
*         description: Add new profile
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Profile'
*/

router.post('/', Profile.addNewProfile)
// router.post('/', authenticate, Profile.addNewProfile)

/**
* @swagger
* /profile/{id}:
*   get:
*     summary: get profile by id
*     tags: [Profile Api]
*     parameters:
*       - in: path
*         name: id
*         schema:
*           type: string
*         required: true
*         description: The profile id
*     responses:
*       200:
*         description: the profile
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Profile'
*/

router.get('/:id', Profile.getProfileById)

router.patch('/:id', authenticate, Profile.editProfile)

router.delete('/:id', authenticate, Profile.deleteProfile)


/**
* @swagger
* /profile/{email}/{userName}:
*   get:
*     summary: get profile by user-email and profile-userName
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
*     responses:
*       200:
*         description: the profile
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Profile'
*/

router.get('/getProfile/:email/:userName', authenticate, Profile.getProfile)



module.exports = router

