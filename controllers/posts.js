const Post = require('../models/post_model')

const getPosts = async (req, res) => {
    try {
        posts = await Post.find()
        res.status(200).send(posts)

    } catch (err) {
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
        likes: null,
        comments: null
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


module.exports = {
    getPosts,
    getPostById,
    addNewPost
}

