const Profile = require('../models/profile_model')
const User = require('../models/user_model')
const Post = require('../models/post_model')
const Category = require('../models/category_model')

const getHello = async (req, res) => {
    res.json({
        adminName: "Yarin Admin User",
    });
}

const getAmounts = async (req, res) => {
    const usersList = await User.find()
    const postsList = await Post.find()
    const profileList = await Profile.find({ status: "true" })

    res.json({
        numOfPosts: postsList.length,
        numOfUsers: usersList.length,
        numOnlineProfiles : profileList.length,
    });
}

const getTopProfiles = async (req, res) => {

    const profileList = await Profile.find()

    const topProfiles = {
        profileUserName:[],
        amountOfPosts: []
    }

    profileList.forEach(profile => {
        topProfiles.profileUserName.push(profile.userName)
        topProfiles.amountOfPosts.push(profile.myPostsListId.length)
    })
    
    sortTogether(topProfiles.amountOfPosts,topProfiles.profileUserName)
    const tenTopProfiles = topProfiles.profileUserName.slice(0,10)
    
    res.json({
        topProfiles: tenTopProfiles
    })
}

const getPercentage = async (req, res) => {

    const profileList = await Profile.find()
    let connectProfileSize = 0
    let sumOfFemale = 0
    let sumOfMale = 0

    profileList.forEach((profile) => {
        if(profile.status === "true"){
            connectProfileSize++
            if(profile.gender === "Female")
                sumOfFemale++
            else
                sumOfMale++
        }

    })

    const percentageOfConnect = (connectProfileSize / profileList.length)*100

    res.json({
        data: {
            sumOfFemale:sumOfFemale,
            sumOfMale:sumOfMale,
            total: connectProfileSize
        },
        percentageOfConnect: percentageOfConnect
    });
}

//FIXME: example how to give data for top Categories chart
const getCategoriesData = async (req, res) => {

    const categoriesData = []
    const categoriesList = await Category.find()

    categoriesList.forEach( async (category)=>{
        let nameOfCategory = category.name
        let genderOfCategory = category.gender
        let postsList =  await Post.find({categoryId: category._id})
        console.log(postsList)
        let numOfPosts = postsList.length
        //TODO: over all the posts that have the same id of category + build obj to push in categoriesData
    })
    res.json({
        data: [
            {
                name: "name1",
                male: "5",
                female: "10"
            },
            {
                name: "name2",
                male: "7",
                female: "3"
            },
            {
                name: "name3",
                male: "2",
                female: "2"
            },
            {
                name: "name4",
                male: "7",
                female: "12"
            }
        ]
    });
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
    getTopProfiles,
    getPercentage,
    getCategoriesData
}