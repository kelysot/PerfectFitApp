const Profile = require('../models/profile_model')
const User = require('../models/user_model')
const Post = require('../models/post_model')
const Category = require('../models/category_model')
const SubCategory = require('../models/sub_category_model')

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

//FIXME: There is problem - when create new  post its not add in subCategories post list  automatically.
const getCategoriesData = async (req, res) => {

    const categoriesData = []
    const maleSubCategoryArray = await SubCategory.find({'gender': 'Male'})
    const femaleSubCategoryArray = await SubCategory.find({'gender': 'Female'})

    const createData = async (arr) => {
    
        let results = []

        for(let i=0; i<arr.length; i++) {
            let category = await Category.findById(arr[i].categoryId)
            let mData = {
                name: category.name,
                sum : arr[i].posts.length,
                gender : arr[i].gender
            }
            results.push(mData)
        }
        return results
    }

    createData(maleSubCategoryArray).then((results) => {
        results.forEach((m)=>{
            categoriesData.push(m)
        })
    }).then(() => {
        createData(femaleSubCategoryArray).then((results) => {
            results.forEach((f)=>{
                categoriesData.push(f)
            })
        }).then(() => {
            let finalDataArr = []
            let check = []
            categoriesData.forEach((category)=>{
                if(!check.includes(category.name)){
                    if(category.gender === 'Male'){
                        let obj = {
                            name : category.name,
                            male: category.sum,
                            female: 0 
                        }
                        finalDataArr.push(obj)
                        check.push(category.name)
                    }else{
                        let obj = {
                            name : category.name,
                            male: 0,
                            female: category.sum 
                        }
                        finalDataArr.push(obj)
                        check.push(category.name)
                    }
                }else{
                    if(category.gender === 'Male'){
                        finalDataArr.forEach((data) => {
                            if(data.name === category.name){
                                data.male = category.sum
                            }
                        })
                    }else{
                        finalDataArr.forEach((data) => {
                            if(data.name === category.name){
                                data.female = category.sum
                            }
                        })
                    }
                }
            })
            res.json({
                data: finalDataArr
            })
        })
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
    getTopProfiles,
    getPercentage,
    getCategoriesData
}