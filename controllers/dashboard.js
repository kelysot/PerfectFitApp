const Profile = require('../models/profile_model')
const User = require('../models/user_model')
const Post = require('../models/post_model')
const Category = require('../models/category_model')
const SubCategory = require('../models/sub_category_model')

//////////////////////////////////////*Home Page*///////////////////////////////////////

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
        percentageOfConnect: percentageOfConnect.toFixed(2)
    });
}

const getCategoriesData = async (req, res) => {
    const categoriesData = []
    const maleSubCategoryArray = await SubCategory.find({'gender': 'Male'})
    const femaleSubCategoryArray = await SubCategory.find({'gender': 'Female'})
    
    const createData = async (arr) => {
        let results = []
        for(let i=0; i<arr.length; i++) {
            let category = await Category.findById(arr[i].categoryId)
            if(category != null || category != undefined){
                let mData = {
                    name: category.name,
                    sum : arr[i].posts.length,
                    gender : arr[i].gender
                }
                results.push(mData)
            }
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
                                data.male += category.sum
                            }
                        })
                    }else{
                        finalDataArr.forEach((data) => {
                            if(data.name === category.name){
                                data.female += category.sum
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

//////////////////////////////////////*Categories Page*///////////////////////////////////////

const categoriesTableData = async (req, res) => {
    const categoriesList = await Category.find({},{_id:0})
    const categoriesListWithId = await Category.find({})
    const postList = await Post.find()
    const dataToTable = []

    const createData = async (arr) => {
        for(let i=0; i<arr.length; i++) {
            let sub = await SubCategory.find({'categoryId' : categoriesListWithId[i]._id})
            let numOfPosts = 0
            for(let i=0; i<sub.length; i++) {
                numOfPosts += sub[i].posts.length
            }
            let categoryData = {
                id: i+1,
                image: arr[i].pictureUrl,
                gender: arr[i].gender,
                name: arr[i].name,
                numOfPosts: numOfPosts,
                percent: numOfPosts === 0 ? '0.00%' : `${((numOfPosts / postList.length)*100).toFixed(2)}%`,
                status: arr[i].isDeleted ? 'Deleted' : 'Active'
            }
            dataToTable.push(categoryData)
        }
        return dataToTable
    }

    createData(categoriesList).then((data) => {
        res.json({
            data: data
        })
    })
}

//////////////////////////////////////*Single Category Page*///////////////////////////////////////

const getSingleCategory = async (req, res) => {
    const data = req.params.categoryData
    const categoryName = data.split("&")[0]
    const categoryGender = data.split("&")[1]
    const singleCategory = await Category.findOne({'name' : categoryName , 'gender' : categoryGender})
    const postList = await Post.find()
    
    const categoryData = async (category) => {
        const sub = await SubCategory.find({'categoryId' : category._id})
        let maleCount = 0
        let femaleCount = 0
        let subPostListSize
        let parallelCategory = []
        topProfilesChart = []

        const topProfiles = {
            profileUserName:[],
            amountOfPosts: []
        }

        for(let i = 0; i < sub.length; i++) {
            if(categoryGender === 'Male'){
                maleCount += sub[i].posts.length
                const parallelCategory = await Category.findOne({'name' : categoryName , 'gender' : 'Female'})
                if(parallelCategory !== null){
                    const parallelSub = await SubCategory.find({'categoryId' : parallelCategory._id})
                    for(let j = 0; j < parallelSub.length; j++){
                        if(parallelSub[j] === undefined)
                            femaleCount += 0
                        else
                            femaleCount += parallelSub[j].posts.length
                    } 
                }
            }else{
                femaleCount += sub[i].posts.length
                const parallelCategory = await Category.findOne({'name' : categoryName , 'gender' : 'Male'})
                if(parallelCategory !== null){
                    const parallelSub = await SubCategory.find({'categoryId' : parallelCategory._id})
                    for(let j = 0; j < parallelSub.length; j++){
                        if(parallelSub[j] === undefined)
                            maleCount += 0
                        else
                            maleCount += parallelSub[j].posts.length 
                    }
                }
            }
            
            for(let j = 0; j < sub[i].posts.length ; j++) {
                let post = await Post.findById(sub[i].posts[j])
                let userName = post.profileId
                if(!topProfiles.profileUserName.includes(userName)) {
                    topProfiles.profileUserName.push(userName)
                    topProfiles.amountOfPosts.push(1)
                    } else{
                        let index = topProfiles.profileUserName.indexOf(userName)
                        topProfiles.amountOfPosts[index] = (topProfiles.amountOfPosts.at(index)+1)
                    }
            }
        }
        
        sortTogether(topProfiles.amountOfPosts,topProfiles.profileUserName)
        const bestProfilesNames = topProfiles.profileUserName.slice(0,3)
        const bestProfilesNumPosts = topProfiles.amountOfPosts.slice(0,3)
        
        createDataToProfilesChat(bestProfilesNames,bestProfilesNumPosts,topProfilesChart)

        if(sub.length !== 0)
            parallelCategory.push({name: 'Male',count: maleCount},{name : 'Female',count: femaleCount})
        else
            parallelCategory.push({name: 'There in no parallel data',count: 0})

        sub[0] === undefined ? subPostListSize = 0 : subPostListSize = sub[0].posts.length

        const categoryData = {
            numOfPosts: subPostListSize,
            percent: `${((subPostListSize / postList.length)*100).toFixed(2)}%`,
            parallelCategory: parallelCategory,
            topProfilesChart: topProfilesChart
        }
        return categoryData
    }

    categoryData(singleCategory).then((data) => {
        res.json({
            singleCategory: singleCategory,
            amounts: data
        });
    })
}

const getCategoryId = async (req, res) => {
    const data = req.params.categoryData
    const categoryName = data.split("&")[0]
    const categoryGender = data.split("&")[1]
    const singleCategory = await Category.findOne({'name' : categoryName , 'gender' : categoryGender})

    res.json({
        categoryId : singleCategory._id,
        categoryGender : categoryGender,
        categoryName : categoryName , 
    });
}

const getSubCategoriesData = async (req, res) => {
    const data = req.params.categoryData
    const categoryName = data.split("&")[0]
    const categoryGender = data.split("&")[1]
    const singleCategory = await Category.findOne({'name' : categoryName , 'gender' : categoryGender})
    const subCategoriesData = []

    for(let i=0;i<singleCategory.subCategory.length;i++){
        let subCategory = await SubCategory.findById(singleCategory.subCategory[i])
        subCategoriesData.push({
            id: i+1,
            image: subCategory.pictureUrl,
            gender: subCategory.gender,
            name: subCategory.name,
            status: subCategory.isDeleted ? 'Deleted' : 'Active'
        })
    }

    res.json({
        subCategoriesData : subCategoriesData
    });
}

//////////////////////////////////////*Profile Page*///////////////////////////////////////

const getProfileChartData = async (req, res) => {
    const userName = req.params.userName
    const profile = await Profile.findOne({'userName' : userName})
    getProfileCategoryData(profile.myPostsListId).then((data) => {
        const chartData = []
        for(let i = 0; i < data.categoriesName.length; i++) {
            let category = {
                categoryName : data.categoriesName[i],
                amount : data.amountOfCategories[i]
            }
            chartData.push(category)
        }

        res.json({
            data: chartData
        });
    })

}

//////////////////////////////////////*Search*///////////////////////////////////////

const search = async (req, res) => {
    const search = req.params.inputToSearch
    const typeSearch = req.params.typeSearch
    const genderSearch = req.params.gender

    switch(typeSearch) {
        case 'category': {
            if(search !== "" && typeSearch !== "" && genderSearch !== "") {
                const category = await Category.findOne({'name': {$regex: new RegExp("^" + search , "i") }  , 'gender': genderSearch})
                if(category !== null){
                    const location = `/categories/${category.name}&${category.gender}`
             
                    res.json({
                        data: location
                    });
                }
            }
        }
        break;
        case 'subCategory': {
            if(search !== "" && typeSearch !== "" && genderSearch !== "") {
                const subCategory = await SubCategory.findOne({'name':  {$regex: new RegExp("^" + search , "i") }, 'gender': genderSearch})
                const category = await Category.findById(subCategory.categoryId)
                if(category !== null && subCategory !== null) {
                    const location = `/categories/${category.name}&${category.gender}`

                    res.json({
                        data: location
                    });
                }
            }
        }
        break;
        case 'profile': {
            if(search !== "" && typeSearch !== "") {
                const profile = await Profile.findOne({'userName':  {$regex: new RegExp("^" + search , "i") }})
                if(profile !== null){
                    const location = `/users/${profile.userName}`

                    res.json({
                        data: location
                    });
                }
            }
        }
        break;
        default:
            break;
    }
}

//////////////////////////////////////*Functions*///////////////////////////////////////

function sortTogether(array1, array2) {
    var merged = [];
    for(var i=0; i<array1.length; i++) { merged.push({'a1': array1[i], 'a2': array2[i]}); }
    merged.sort(function(o1, o2) { return ((o1.a1 > o2.a1) ? -1 : ((o1.a1 == o2.a1) ? 0 : 1)); });
    for(var i=0; i<merged.length; i++) { array1[i] = merged[i].a1; array2[i] = merged[i].a2; }
}

function createDataToProfilesChat(bestProfilesNames,bestProfilesNumPosts,topProfilesChart) {
    if( bestProfilesNames.length > 0){
        for(let i = 0; i < bestProfilesNames.length; i++){
            topProfilesChart.push({
                name: bestProfilesNames[i],
                count: bestProfilesNumPosts[i]
            })
        }
    } else{
        topProfilesChart.push({
            name: "No one post this category ",
            count: 0
        })
    }
}

async function getProfileCategoryData(arr){
    const topCategories = {
        categoriesName:[],
        amountOfCategories: []
    }

    for(let i=0 ; i< arr.length; i++){
        let currentPost = await Post.findById(arr[i])
        let categoryName = currentPost.categoryId

        if(!topCategories.categoriesName.includes(categoryName)){
            topCategories.categoriesName.push(categoryName)
            topCategories.amountOfCategories.push(1)
        }else{
            let index = topCategories.categoriesName.indexOf(categoryName)
            topCategories.amountOfCategories[index] += 1
        }
    }

    sortTogether(topCategories.amountOfCategories,topCategories.categoriesName)
    const topSixCategories = topCategories.categoriesName.slice(0,6)
    const topSixAmounts = topCategories.amountOfCategories.slice(0,6)

    topCategories.categoriesName = topSixCategories
    topCategories.amountOfCategories = topSixAmounts

    return topCategories
}

module.exports = {
    getHello,
    getAmounts,
    getTopProfiles,
    getPercentage,
    getCategoriesData,
    categoriesTableData,
    getSingleCategory,
    getSubCategoriesData,
    getCategoryId,
    getProfileChartData,
    search
}