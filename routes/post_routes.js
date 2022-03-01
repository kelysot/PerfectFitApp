const express = require('express')
const router = express.Router()

const Post = require('../controllers/posts')

router.get('/',  Post.getPosts)
router.post('/', Post.addNewPost)


module.exports = router
