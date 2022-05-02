const Post = require('../models/post_model')
const Profile = require('../models/profile_model')
const Category = require('../models/category_model')
const SubCategory = require('../models/sub_category_model')


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

const getPostsBySubCategoryId = async (req, res) => {
    if (req.params.subCategoryId == null) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }

    const category = await SubCategory.findById(req.params.subCategoryId)
    const subCategoryPosts = await Post.find({ '_id': category.posts })
    try {

        res.status(200).send(subCategoryPosts)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getPostById = async (req, res) => {

    if (req.params.postId == null || req.params.postId == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const post = await Post.findById(req.params.postId)
        res.status(200).send(post)

    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const addNewPost = async (req, res) => {

    const profileUserName = req.body.profileId
    const profile = await Profile.findOne({ userName: { $eq: profileUserName } })

    //TODO: After we will send sizeAdjustment and rating change them to get the info from client.
    const post = Post({
        // profileId: profile._id,
        profileId: req.body.profileId, // the profileId here it's the userName of the ptofile!
        description: req.body.description,
        productName: req.body.productName,
        sku: req.body.sku,
        size: req.body.size,
        company: req.body.company,
        price: req.body.price,
        color: req.body.color,
        categoryId: req.body.categoryId,
        subCategoryId: req.body.subCategoryId,
        // date: req.body.date,
        date: new Date(),
        link: req.body.link,
        sizeAdjustment: '4',
        rating: '6',
        picturesUrl: req.body.picturesUrl,
        likes: [],
        comments: [],
    })

    //TODO: findOne instead of find:
    const subCategories = await SubCategory.find({ 'name': post.subCategoryId, 'gender': profile.gender })
    if (subCategories[0].posts == undefined && subCategories[0].posts == null) {
        subCategories[0].posts = []
    }

    subCategories[0].posts.push(post._id)
    subCategories[0].save((error) => {
        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        }
        else {
            res.status(200)
        }
    })

    var array = profile._doc.myPostsListId
    array.push(post._id)

    profile.myPostsListId = array

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

    profile.save((error) => {
        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        } else {
            res.status(200)
        }
    })

}

const editPost = async (req, res) => {

    const post = req.body
    const id = post.postId

    if (post == null || post == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const editPost = await Post.findById(id)
        editPost.profileId = post.profileId
        editPost.description = post.description
        editPost.productName = post.productName
        editPost.sku = post.sku
        editPost.size = post.size,
            editPost.company = post.company,
            editPost.price = post.price,
            editPost.color = post.color,
            editPost.categoryId = post.categoryId,
            editPost.subCategoryId = post.subCategoryId,
            editPost.date = post.date,
            editPost.link = post.link,
            editPost.sizeAdjustment = post.sizeAdjustment,
            editPost.rating = post.rating,
            editPost.picturesUrl = post.picturesUrl,
            editPost.likes = post.likes,
            editPost.comments = post.comments

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

    const thePostId = req.params.postId
    if (thePostId == null || thePostId == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    const PostToDelete = await Post.findById(thePostId)
    const profileId = PostToDelete.profileId // userName
    try {
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

    // const profile = await Profile.findOne({ userName: PostToDelete.profileId })
    const profile = await Profile.findOne({ userName: profileId })
    var array = profile.myPostsListId
    let index = array.indexOf(thePostId)
    if (index > -1) {
        array.splice(index, 1);
    }

    // array.remove(PostToDelete._id)
    profile.myPostsListId = array

    profile.save((error) => {
        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        } else {
            res.status(200)
        }
    })
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

    if (userName == null || userName == undefined) {
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

        var theReturnList = await Post.find({ '_id': { $in: theList } })
        res.status(200).send(theReturnList)

    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}


const getProfilePosts = async (req, res) => {

    const userName = req.params.userName
    if (userName == null || userName == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {

        const profile = await Profile.findOne({ userName: { $eq: userName } })
        const theList = profile.myPostsListId
        var theProfilePostsList = await Post.find({ '_id': { $in: theList } })
        res.status(200).send(theProfilePostsList)

    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}


const getDates = async (req, res) => {

    const lastDate = req.params.date

    const posts = await Post.find({
        date: {
            $gte: lastDate,
            $lt: new Date()
        }
    })
}

module.exports = {
    getPosts,
    getPostsBySubCategoryId,
    getPostById,
    addNewPost,
    editPost,
    deletePost,
    getWishList,
    getProfilePosts,
    getDates
}

