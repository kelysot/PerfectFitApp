const Profile = require('../models/profile_model')
const User = require('../models/user_model')
const Post = require('../models/post_model')

const getHello = async (req, res) => {

    const usersList = await User.find()
    const profilesList = await Profile.find()
    const postsList = await Post.find()

    res.json({ 
        message: "Hello from server!",
        numOfPosts: postsList.length,
        numOfUsers: usersList.length,
        numOfProfiles: profilesList.length 
    });
}

module.exports = {
    getHello
}