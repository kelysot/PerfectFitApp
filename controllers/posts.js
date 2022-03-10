const Post = require('../models/post_model')

const getPosts = async (req, res) => {
    console.log("1111111111111111")
    try {
        console.log("22222222222222")
        posts = await Post.find()

        // var result = [];
        // for (var i in posts) {
        //     result.push(posts[i]);
        // }

        //    console.log(posts[0]);

        //    var myJsonString = JSON.stringify(posts);
        //    console.log(myJsonString)


        // console.log(posts[0])
        // res.json({posts})
        // res.status(200).send("helloooo")
        //console.log({ posts })

        res.status(200).send(posts)

    } catch (err) {
        console.log("33333333333")
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getPostById = async (req, res) => {

    if (req.params.id == null | req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        posts = await Post.findById(req.params.id)
        res.status(200).send(posts)

    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const addNewPost = (req, res) => {

    console.log('addNewPost ' + req.body.description)
    profileId = req.user.id

    const post = Post({
        profileId: profileId,
        description: req.body.description,
        productName: req.body.productName,
        sku: req.body.sku,
        size: req.body.size,
        company: req.body.company,
        price: req.body.price,
        color: req.body.color,
        categoryId: req.body.categoryId,
        subCategoryId: req.body.subCategoryId,
        date: req.body.date,
        link: req.body.link,
        sizeAdjustment: req.body.sizeAdjustment,
        rating: req.body.rating,
        picturesUrl: req.body.picturesUrl,
        likes: [],
        comments: []
    })

    post.save((error, newPost) => {

        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        }
        else {
            res.status(200).send({
                'status': 'OK',
                'post': newPost
            })

        }
    })
    // res.send("adding new post");
    // sender = req.user.id

    // const post = Post({
    //     message: req.body.message,
    //     sender: sender
    // })

    // post.save((error, newPost) => {
    //     if (error) {
    //         res.status(400).send({
    //             'status': 'fail',
    //             'error': error.message
    //         })
    //     } else {
    //         res.status(200).send(newPost)
    //     }
    // })
}

const editPost = async (req, res) => {
    if (req.params.id == null | req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const editPost = await Post.findById(req.params.id)
        editPost.profileId = req.body.profileId
        editPost.description = req.body.description
        editPost.productName = req.body.productName
        editPost.sku = req.body.sku
        editPost.size = req.body.size,
            editPost.company = req.body.company,
            editPost.price = req.body.price,
            editPost.color = req.body.color,
            editPost.categoryId = req.body.categoryId,
            editPost.subCategoryId = req.body.subCategoryId,
            editPost.date = req.body.date,
            editPost.link = req.body.link,
            editPost.sizeAdjustment = req.body.sizeAdjustment,
            editPost.rating = req.body.rating,
            editPost.picturesUrl = req.body.picturesUrl,
            editPost.likes = req.body.likes,
            editPost.comments = req.body.comments

        editPost.save((error, editPost) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            }
            else {
                res.status(200).send({
                    'status': 'OK',
                    'post': editPost
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

const deletePost = async (req, res) => {
    if (req.params.id == null | req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const PostToDelete = await Post.findById(req.params.id)
        PostToDelete.remove((error) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            }
            else {
                res.status(200).send({
                    'status': 'OK',
                    'message': 'The post was deleted successfully'
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
    getPosts,
    getPostById,
    addNewPost,
    editPost,
    deletePost
}

