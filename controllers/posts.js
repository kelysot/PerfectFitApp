const Post = require('../models/post_model')
const Profile = require('../models/profile_model')
const Category = require('../models/category_model')
const SubCategory = require('../models/sub_category_model')
const General = require('../models/general_model')


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
    const subCategoryPosts = await Post.find({ '_id': category.posts, "isDeleted": false })
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

    const post = Post({
        profileId: req.body.profileId, // the profileId here it's the userName of the profile!
        description: req.body.description,
        productName: req.body.productName,
        sku: req.body.sku,
        size: req.body.size,
        company: req.body.company,
        price: req.body.price,
        color: req.body.color,
        categoryId: req.body.categoryId,
        subCategoryId: req.body.subCategoryId,
        date: new Date(),
        link: req.body.link,
        sizeAdjustment: req.body.sizeAdjustment,
        rating: req.body.rating,
        picturesUrl: req.body.picturesUrl,
        likes: [],
        comments: [],
        isDeleted: req.body.isDeleted,
    })

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
        editPost.date = new Date()
        editPost.link = req.body.link
        editPost.sizeAdjustment = req.body.sizeAdjustment
        editPost.rating = req.body.rating
        editPost.picturesUrl = req.body.picturesUrl
        editPost.likes = req.body.likes
        editPost.comments = req.body.comments
        editPost.isDeleted = req.body.isDeleted

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
        PostToDelete.isDeleted = true
        PostToDelete.save((error) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            } else {
                res.status(200).send()
            }
        })

    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }

}

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

        var theReturnList = await Post.find({ '_id': { $in: theList }, "isDeleted": false })
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
        var theProfilePostsList = await Post.find({ '_id': { $in: theList }, 'isDeleted': false })

        res.status(200).send(theProfilePostsList.reverse())

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

const getPostsByIds = async (req, res) => {

    const postsIds = req.params.postsId // We get list as a string.
    arrayPostsIds = postsIds.substring(1)
    arrayPostsIds = arrayPostsIds.slice(0, -1)
    arrayPostsIds = arrayPostsIds.split(", ")

    if (postsIds == null || postsIds == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        var postArr = []

        var i = 0
        for (i = 0; i < arrayPostsIds.length; i++) {
            var postId = arrayPostsIds[i]
            var post = await Post.findById(postId)
            postArr.push(post)
        }

        res.status(200).send(postArr)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

//Algorithm 
const getSuitablePosts = async (req, res) => {

    const userName = req.params.profileId

    if (userName == null || userName == undefined) {
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

        var profiles = null
        // find all the profiles with the same bodyType and gender
        if (gender != "None") {
            profiles = await Profile.find({ bodyType: { $eq: bodyType }, gender: { $eq: gender }, isDeleted: { $ne: true } })
        } else {
            profiles = await Profile.find({ bodyType: { $eq: bodyType }, isDeleted: { $ne: true } })
        }

        let profilesNamesArr = [];
        for (let j = 0; j < profiles.length; j++) {
            profilesNamesArr.push(profiles[j].userName)
        }

        // now we find all the posts that suitable to the bodyType and gender

        let posts = await Post.find({ 'profileId': { $in: profilesNamesArr }, 'isDeleted': false })
        posts = posts.reverse()

        // now we got the posts include the profile posts: 
        // now we need to send every post and check the correlation between the two profiles.
        // if there is a correlation (more then the threshhold we choose), the post will be nent to the app.

        // in order to do that, we create a map of profile/correlation that in every new profile we check
        // we save it inside the map (so in every post we need to check we first check in the map if we 
        // allready cheked this profile) and then add the posts to the list we send if is ok. 

        let similarProfileId = profile.similarProfileId

        if (similarProfileId == null || similarProfileId == undefined) { // check if needed
            similarProfileId = []
        }

        let postsForSend = []
        let vector1 = createVector(profile);

        for (let t = 0; t < posts.length; t++) {

            let userNameofPost = posts[t].profileId
            let profile2 = await Profile.findOne({ userName: { $eq: userNameofPost } })
            let id2 = profile2._id

            // if the publisher of the post is in the list of "similarProfileId" we can add it immediately to the postsList. 
            if (similarProfileId.includes(id2) || (userNameofPost == profile.userName)) {
                postsForSend.push(posts[t])
            }
            // if not, we need to check the correlation between the two profiles:
            else {
                let vector2 = createVector(profile2)

                let thePearson = pearson(vector1, vector2)

                if (thePearson > 0.981) {
                    postsForSend.push(posts[t])
                    if (similarProfileId.length == 100) {
                        similarProfileId.slice(1, 100)
                    }
                    similarProfileId.push(profile2._id)
                }
            }

            if (postsForSend.length == 300) {
                break;
            }
        }

        // need to update the similarProfileId
        // we can decide that every week or month we delete this list so we could check the people again if 
        // something has changed. 

        profile.similarProfileId = similarProfileId

        // we take the average size the profile wrote to the system, and choose size-1 and size+1 posts.

        let finalList = []
        let shoeSize = parseInt(profile.foot)
        let minus = parseInt(shoeSize) - 1
        let plus = parseInt(shoeSize) + 1

        for (let i = 0; i < postsForSend.length; i++) {
            if (postsForSend[i].categoryId == "Shoes") {
                if (shoeSize >= minus && shoeSize <= plus) {
                    finalList.push(postsForSend[i])
                }
            }
            else {
                finalList.push(postsForSend[i])
            }
        }

        profile.save((error) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            } else {
                res.status(200).send(finalList)
            }
        })

    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const timeSince = async (req, res) => {

    var date = new Date(req.params.date)

    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;


    try {
        var flag = false
        var ans

        if (interval > 1 && !flag) {
            flag = true
            ans = Math.floor(interval) + " years";
            res.status(200).send({
                'status': 'OK',
                'timeAgo': ans
            })
        }
        else if ((seconds / 2592000) > 1 && !flag) {
            flag = true
            ans = Math.floor(seconds / 2592000) + " months";
            res.status(200).send({
                'status': 'OK',
                'timeAgo': ans
            })
        }
        else if ((seconds / 86400) > 1 && !flag) {
            flag = true
            ans = Math.floor(seconds / 86400) + " days";
            res.status(200).send({
                'status': 'OK',
                'timeAgo': ans
            })
        }
        else if ((seconds / 3600) > 1 && !flag) {
            flag = true
            ans = Math.floor(seconds / 3600) + " hours";
            res.status(200).send({
                'status': 'OK',
                'timeAgo': ans
            })
        }
        else if ((seconds / 60) > 1 && !flag) {
            flag = true
            ans = Math.floor(seconds / 60) + " minutes";
            res.status(200).send({
                'status': 'OK',
                'timeAgo': ans
            })
        }
        else {
            ans = Math.floor(seconds) + " seconds";
            res.status(200).send({
                'status': 'OK',
                'timeAgo': ans
            })
        }
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}


///////////////////

const getSearchPosts = async (req, res) => {

    const map = req.body

    const sizes = map.Sizes
    const categories = map.Categories
    const colors = map.Colors
    const companies = map.Companies
    const bodyTypes = map.BodyTypes
    const gender = map.Gender
    const count = map.Count
    const price = map.Price
    let priceFrom, priceTo

    if (price[0] != "false") {
        priceFrom = parseInt(price[0])
    }
    else {
        priceFrom = price[0] // = false
    }
    if (price[1] != "false") {
        priceTo = parseInt(price[1])
    }
    else {
        priceTo = price[1] // = false
    }


    let genderList = []

    if (gender.length > 0) {
        genderList.push(gender[0])
        if (gender.length == 2) {
            genderList.push(gender[1])
        }
    }
    else {
        genderList.push("Female")
        genderList.push("Male")
    }

    // BodyType and Gender

    // first we find all the relevant profiles:


    // Then we check for the posts considered with sizes, categories, companies and colors:

    let posts

    if (count == "true") { // it means that no category was chosen - we need to send all the posts. 
        posts = await Post.find({ 'isDeleted': false })
    }
    else {

        const profiles = await Profile.find({ 'bodyType': { $in: bodyTypes }, 'gender': { $in: genderList }, isDeleted: { $ne: true } })
        let profilesId = []

        // save the userNames of the relevant profiles: 
        for (let j = 0; j < profiles.length; j++) {
            profilesId.push(profiles[j].userName)
        }
        posts = await Post.find({ 'size': { $in: sizes }, 'categoryId': { $in: categories }, 'color': { $in: colors }, 'company': { $in: companies }, 'profileId': { $in: profilesId }, 'isDeleted': false })

    }

    //check the price 

    let postsToSend = []

    if (priceFrom != "false" && priceTo != "false") {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].price >= priceFrom && posts[i].price <= priceTo) {
                postsToSend.push(posts[i])
            }
        }
    }
    else if (priceFrom == "false" && priceTo != "false") {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].price <= priceTo) {
                postsToSend.push(posts[i])
            }
        }
    }
    else if (priceFrom != "false" && priceTo == "false") {
        for (let i = 0; i < posts.length; i++) {
            if (posts[i].price >= priceFrom) {
                postsToSend.push(posts[i])
            }
        }
    }
    else if (priceFrom == "false" && priceTo == "false") {
        postsToSend = posts
    }

    postsToSend = postsToSend.reverse()

    try {
        res.status(200).send(postsToSend)
    } catch (err) {
        res.status(400).send({
            'status': 'failure',
            'error': err.message
        })
    }
}


const general = async (req, res) => {

    const general = General({
        sizes: ["XS", "S", "M", "L", "XL", "XXL", "XXXL", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51"],
        companies: ["ZARA", "Studio Pasha", "Mango", "Pull&Bear", "Castro", "Renuar", "Levis", "American Eagle", "Other"], // the profileId here it's the userName of the ptofile!
        colors: ["Black", "White", "Red", "Green", "Purple", "Orange", "Pink", "Yellow", "Brown", "Cream", "Gray", "Turquoise"],
        bodyTypes: ["Hourglass", "Pear", "Apple", "Ruler"],
        bodyTypeDescription: ["This type is characterized by a relatively broad shoulders, a wide pelvis and a narrow waist (Endomorphic or Mesomorphic)", "In this body type the upper body is small, the chest is small and the abdomen is flat. Most of the weight is concentrated in the waist area and down (Mesomorphic or Endomorphic)", "This body type is characterized by a heavy upper torso, relatively broad chest and abdomen, but a narrow lower torso - narrow hips and narrow legs (Mesomorphic or Endomorphic)", "This body type is characterized by a straight body shape from the middle upwards and the middle downwards (Ectomorphic)"],
        gender: ["Female", "Male"]
    })

    general.save((error, general) => {
        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        }
        else {
            res.status(200).send({
                'status': 'OK',
                'general': general
            })
        }
    })
}


const getGeneral = async (req, res) => {

    const gen = await General.find({})

    try {
        res.status(200).send({ 'gen': gen })
    } catch (err) {
        res.status(400).send({
            'status': 'failure',
            'error': err.message
        })
    }

}

/************************************* functions for algorithm *************************************/


function createVector(profile) {

    let vector = []
    vector.push(parseInt(profile.shoulder));
    vector.push(parseInt(profile.chest));
    vector.push(parseInt(profile.basin));
    vector.push(parseInt(profile.waist));
    vector.push(parseInt(profile.height));
    vector.push(parseInt(profile.weight));

    return vector;
}

function avg(x) {

    if (x == null || x == undefined) {
        return -1;
    }

    var count = 0
    for (let i = 0; i < x.length; i++) {
        count += x[i]
    }
    count = (count / x.length);
    return count;
}
function variance(x) {

    if (x == null || x == undefined) {
        return -1;
    }
    let count = 0;
    for (let i = 0; i < x.length; i++) {
        count += (x[i] * x[i]);
    }

    count = (count / x.length);
    let u = (avg(x) * avg(x));
    let V = (count - u);

    return V;
}

function cov(x, y) {

    if (x == null || y == null || x == undefined || y == undefined) {
        return -1;
    }
    let ax = avg(x);
    let ay = avg(y);

    let count = 0;
    for (let i = 0; i < x.length; i++) {
        count += (x[i] * y[i]);
    }
    count = (count / x.length);
    return (count - (ax * ay));
}

function pearson(x, y) { // x = [] sizes of profile 1, y = [] sizes of profile 2

    let V1 = Math.sqrt(variance(x));
    let V2 = Math.sqrt(variance(y));
    let C = cov(x, y);

    if (V1 == 0 || V2 == 0) {
        return 1
    }
    return (C / (V1 * V2));
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
    getSuitablePosts,
    timeSince,
    getSearchPosts,
    general,
    getGeneral,
    getPostsByIds
}

