const Comment = require('../models/comment_model')
const Post = require('../models/post_model')
const Profile = require('../models/profile_model')

const getComments = async (req, res) => {
    try {
        const commentsList = await Comment.find()
        res.status(200).send(commentsList)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getCommentsListIdsByPostId = async (req, res) => {
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const post = await Post.findById(req.params.id)
        const commentList = await Comment.find({ '_id': { $in: post.comments } })

        //Check if the profile that wrote a comment deleted his profile.    
        var sentComment = []
        for (var i = 0; i < commentList.length; i++) {
            const profile = await Profile.findOne({ 'userName': commentList[i].profileId })
            if (profile.isDeleted == false) {
                sentComment.push(commentList[i])
            }
        }

        res.status(200).send(sentComment.reverse())
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getCommentById = async (req, res) => {
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const comment = await Comment.findById(req.params.id)
        res.status(200).send(comment)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const addComment = async (req, res) => {
    const post = await Post.findById(req.body.postId)
    const profileId = req.body.profileId

    const newComment = Comment({
        profileId: profileId,
        postId: req.body.postId,
        date: new Date(),
        text: req.body.text
    })

    const newPostList = post.comments
    newPostList.push(newComment._id)

    await post.save((error) => {
        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        } else {
            res.status(200)
        }
    })

    newComment.save((error, newComment) => {
        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        } else {
            res.status(200).send({
                'status': 'OK',
                'comment': newComment
            })
        }
    })
}

const editComment = async (req, res) => {
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const editComment = await Comment.findById(req.params.id)
        editComment.date = new Date()
        editComment.text = req.body.text
        editComment.postId = req.body.postId

        editComment.save((error, editComment) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            }
            else {
                res.status(200).send({
                    'status': 'OK',
                    'comment': editComment
                })
            }
        })
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const deleteComment = async (req, res) => {
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const commentToDelete = await Comment.findById(req.params.id);
        const profileId = commentToDelete.profileId // over first on who is have the same profile id to improve running time
        const postArray = await Post.find({ profileId: { $eq: profileId } })
        postArray.forEach(async (post) => {
            if (post.comments.includes(commentToDelete._id)) {
                post.comments.remove(commentToDelete._id)
                await post.save((error) => {
                    if (error) {
                        res.status(400).send({
                            'status': 'fail',
                            'error': error.message
                        })
                    } else {
                        res.status(200)
                        return
                    }
                })
            }
        })

        commentToDelete.remove((error) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            }
            else {
                res.status(200).send({
                    'status': 'OK',
                    'message': 'The commit was deleted successfully'
                })
            }
        })
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

module.exports = {
    getCommentsListIdsByPostId,
    getCommentById,
    addComment,
    editComment,
    deleteComment,
    getComments
}