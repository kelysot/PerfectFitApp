const Post = require('../models/post_model')
const Profile = require('../models/profile_model')


const getPosts = async (req, res) => {
    console.log("1111111111111111")
    try {
        console.log("22222222222222")
        posts = await Post.find()

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

    if (req.params.id == null || req.params.id == undefined) {
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

const addNewPost = async (req, res) => {

    profileId = req.body.profileId
    const profile = await Profile.findOne({ profileId: { $eq: profileId } })

    //TODO: After we will send sizeAdjustment and rating change them to get the info from client.
    const post = Post({
        profileId: profile._id,
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
        sizeAdjustment: '4',
        rating: '6',
        picturesUrl: req.body.picturesUrl,
        likes: [],
        comments: []
    })

    post.save((error, post) => {
        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        }
        else {
            res.status(200).send({
                'status': 'OK',
                'post': post
            })
        }
    })
}

const editPost = async (req, res) => {
    if (req.params.id == null || req.params.id == undefined) {
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
    if (req.params.id == null || req.params.id == undefined) {
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

// const getWishList = async (req, res) => {

//     const wishListId = req.params.wishListId
//     console.log("we are hereeeeeee")
//     var list = await Post.find()

//     const array = await list.find({_id: {$in:wishListId}});// can't reach the postId
//     //TODO: return all the relevant posts
    
//     console.log("we are hereeeeeee")

// }

const getWishList = async (req, res) => {

    const userName = req.params.userName

    if(userName == null || userName == undefined){
        res.status(400).send({
        'status': 'fail',
        'error': err.message
        })
    }
    try {

        const profile = await Profile.findOne({ userName: { $eq: userName } })
        const theList = profile.wishlist

        // let i = 0
        // var theArr = []
        // let size = theList.length
        // for(i=0; i<size; i++){
        //     theArr.push(mongoose.Types.ObjectId(theList[i]))
        // }

        var theReturnList = await Post.find({'_id': {$in: theList}})
        res.status(200).send(theReturnList)

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
    deletePost,
    getWishList
}

