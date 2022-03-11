const express = require('express')
const router = express.Router()

const Comment = require('../controllers/comment')
const authenticate = require('../common/auth_middleware')

router.get('/:id', authenticate, Comment.getCommentsListIdsByPostId)

router.get('/:id', authenticate, Comment.getCommentById)

router.post('/:id', authenticate,Comment.addComment)

module.exports = router