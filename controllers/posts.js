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
        editPost.profileId = req.body.profileId
        editPost.description = req.body.description
        editPost.productName = req.body.productName
        editPost.sku = req.body.sku
        editPost.size = req.body.size
        editPost.company = req.body.company
        editPost.price = req.body.price
        editPost.color = req.body.color
        editPost.categoryId = req.body.categoryId
        editPost.subCategoryId = req.body.subCategoryId
        editPost.date = req.body.date
        editPost.link = req.body.link
        editPost.sizeAdjustment = req.body.sizeAdjustment
        editPost.rating = req.body.rating
        editPost.picturesUrl = req.body.picturesUrl
        editPost.likes = req.body.likes
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

const getSuitablePosts = async (req, res) => { 

    const userName = req.params.profileId

    if(userName == null || userName == undefined){
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {

        // first we find the profile
        const profile = await Profile.findOne({ userName: { $eq: userName } })

        // second we find the bodyType and gender
        const bodyType = profile.bodyType
        const gender = profile.gender

        // find all the profiles with the same bodyType and gender
        const profiles = await Profile.find({ bodyType: { $eq: bodyType }, gender: {$eq: gender}  })
        let profilesNamesArr = [];
        for(let j=0; j< profiles.length; j++){
            profilesNamesArr.push(profiles[j].userName)
        }

        // now we find all the posts that suitable to the bodyType and gender

        let posts = await Post.find( {'profileId': {$in: profilesNamesArr} })
        posts = posts.reverse()

        // now we got the posts include the profile posts: 
        // now we need to send every post and check the correlation between the two profiles.
        // if there is a correlation (more then the threshhold we choose), the post will be nent to the app.
        
        // in order to do that, we create a map of profile/correlation that in every new profile we check
        // we save it inside the map (so in every post we need to check we first check in the map if we 
        // allready cheked this profile) and then add the posts to the list we send if is ok. 

        let similarProfileId = profile.similarProfileId

        if(similarProfileId == null || similarProfileId == undefined){ // check if needed
            similarProfileId = []
        }

        let postsForSend = []

        let vector1 = createVector(profile);

        for(let t = 0; t < posts.length; t++){

            let userNameofPost = posts[t].profileId
            let profile2 = await Profile.findOne({ userName: { $eq: userNameofPost } })
            let id2 = profile2._id 

            // if the publisher of the post is in the list of "similarProfileId" we can add it immediately to the postsList. 
            if(similarProfileId.includes(id2) || (userNameofPost == profile.userName )){
        
                postsForSend.push(posts[t])
            }
            // if not, we need to check the correlation between the two profiles:
            else{
            
                let vector2 = createVector(profile2)
                let thePearson = pearson(vector1, vector2)

                if(thePearson > 0.965){ //TODO: check the threshold
                    postsForSend.push(posts[t])
                    if(similarProfileId.length == 100){
                        similarProfileId.slice(1,100)
                    }
                    similarProfileId.push(profile2._id)
                }
            }

            if(postsForSend.length == 300){
                break;
            }
        }

        // need to update the similarProfileId
        // we can decide that every week or month we delete this list so we could check the people again if 
        // somthing has changed. 

        profile.similarProfileId = similarProfileId

        profile.save((error) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            } else {
                res.status(200).send(postsForSend)
            }
        })

    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

/************************************* functions for algorithm *************************************/


function createVector(profile){

    let vector = []
    vector.push(parseInt(profile.shoulder));
    vector.push(parseInt(profile.chest));
    vector.push(parseInt(profile.basin));
    vector.push(parseInt(profile.waist));
    vector.push(parseInt(profile.height));
    vector.push(parseInt(profile.weight));

    return vector;
}

function avg(x){

    if(x == null || x == undefined){
        return -1; 
    }

    var count = 0 
    for(let i = 0; i < x.length; i++){
        count+= x[i]
    }
    count  = (count / x.length);
    return count; 
}
function variance(x){

    if(x == null || x == undefined){
        return -1; 
    }
    let count = 0; 
    for (let i=0; i<x.length; i++){
        count += (x[i] * x[i]);
    }
    count = (count/ x.length);
    let u = (avg(x) * avg(x));
    let V = (count - u);
    return V;
}

function cov(x, y){

    if(x == null || y == null || x == undefined || y == undefined){
        return -1; 
    }
    let ax = avg(x);
    let ay = avg(y);

    let count = 0; 
    for(let i=0; i<x.length; i++){
        count += (x[i] * y[i]);
    }
    count = (count / x.length);

    return (count - (ax*ay));
}

function pearson(x, y){ // x = [] sizes of profile 1, y = [] sizes of profile 2

    let V1 = Math.sqrt(variance(x));
    let V2 = Math.sqrt(variance(y));
    let C =  cov(x,y);
    return (C/ (V1 * V2));
}


/*****************************************************************************************/


module.exports = {
    getPosts,
    getPostsBySubCategoryId,
    getPostById,
    addNewPost,
    editPost,
    deletePost,
    getWishList,
    getProfilePosts,
    getDates,
    getSuitablePosts
}

