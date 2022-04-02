const Profile = require('../models/profile_model')
const User = require('../models/user_model')
const Post = require('../models/post_model')

const getHello = async (req, res) => {
    res.json({
        adminName: "Yarin Admin User",
    });
}

const getAmounts = async (req, res) => {
    const usersList = await User.find()
    const postsList = await Post.find()
    const profileList = await Profile.find({ status: { $eq: true } })
    res.json({
        numOfPosts: postsList.length,
        numOfUsers: usersList.length,
        numOnlineProfiles : profileList.length,
    });
}

//TODO: check if work and bring the 5 users with the most of post  
const getTopProfiles = async (req, res) => {

    const profileList = await Profile.find()
    const orderListOfUsers = {
        userId: [],
        amountOfPosts: []
    }

    profileList.forEach(user => {
        if(!orderListOfUsers.userId.includes(user.userId)){
            orderListOfUsers.userId.push(user.userId)
            orderListOfUsers.amountOfPosts.push(1)
        }else{
            let index = orderListOfUsers.userId.indexOf(user.userId)
            orderListOfUsers.amountOfPosts[index]++
        }
    })

    sortTogether(orderListOfUsers.amountOfPosts, orderListOfUsers.userId)
    topUsers = orderListOfUsers.userId.slice(0,5)

    const finalResults = await User.find({ 'email': { $in: topUsers } });

    res.json({
        topUsers: finalResults
    })
}


function sortTogether(array1, array2) {
    var merged = [];
    for(var i=0; i<array1.length; i++) { merged.push({'a1': array1[i], 'a2': array2[i]}); }
    merged.sort(function(o1, o2) { return ((o1.a1 > o2.a1) ? -1 : ((o1.a1 == o2.a1) ? 0 : 1)); });
    for(var i=0; i<merged.length; i++) { array1[i] = merged[i].a1; array2[i] = merged[i].a2; }
}

module.exports = {
    getHello,
    getAmounts,
    getTopProfiles
}