const express = require('express')
const router = express.Router()

const Comment = require('../controllers/comment')
const authenticate = require('../common/auth_middleware')

router.get('/',authenticate,Comment.getComments)

router.get('/:id', authenticate, Comment.getCommentsListIdsByPostId)

router.get('/:id', authenticate, Comment.getCommentById)

router.post('/:id', authenticate,Comment.addComment)

router.patch('/:id', authenticate,Comment.editComment)

router.delete('/:id', authenticate,Comment.deleteComment)

module.exports = router