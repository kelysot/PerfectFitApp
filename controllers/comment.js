const Comment = require('../models/comment_model')
const Post = require('../models/post_model')

const getComments = async(req, res) => {
    try {
        const commentsList = await Comment.find()
        res.status(200).send(commentsList)
    }catch(err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getCommentsListIdsByPostId = async (req, res) => {
    if (req.params.id == null | req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try{
        const post = await Post.findById(req.params.id)
        const commentList = post.comments
        res.status(200).send(commentList) 
    }catch(err){
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getCommentById = async (req, res) => {
    if (req.params.id == null | req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const comment = await Comment.findOne(req.params.id)
        res.status(200).send(comment)
    }catch(err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const addComment = async (req, res) => {
    const post = await Post.findById(req.params.id)
    const profileId = post.profileId

    const newComment = Comment({
        profileId: profileId,
        date: req.body.date,
        text: req.body.text
    })

    const newPostList = post.comments;
    newPostList.push(newComment._id);

    await post.save((error)=>{
        if(error){
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        }else{
            res.status(200)
        }
    })

    newComment.save((error,newComment)=>{
        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        }else{
            res.status(200).send({
                'status': 'OK',
                'commit': newComment
            })
        }
    })
}

const editComment = async (req, res) => {
    if (req.params.id == null | req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try{
        const editComment = await Comment.findById(req.params.id)
        editComment.date = req.body.date
        editComment.text = req.body.text

        editComment.save((error,editComment)=>{
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
    }catch(err){
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const deleteComment = async (req, res) => {
    if (req.params.id == null | req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const commentToDelete = await Comment.findById(req.params.id);
        const profileId = commentToDelete.profileId
        const postArray = await Post.find({profileId:{$eq: profileId}}) // over first on who is have the same profile id to improve running time
        postArray.forEach(async (post) => {
            if(post.comments.includes(commentToDelete._id)){
                post.comments.remove(commentToDelete._id)
                await post.save((error)=>{
                    if(error){
                        res.status(400).send({
                            'status': 'fail',
                            'error': error.message
                        })
                    }else{
                        res.status(200)
                        return
                    }
                })
            }
        })
        
        commentToDelete.remove((error)=>{
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
    }catch(err) {
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