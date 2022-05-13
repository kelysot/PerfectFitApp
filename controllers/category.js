const Category = require('../models/category_model')
const SubCategory = require('../models/sub_category_model')

const getCategories = async (req, res) => {

    const gender = req.params.gender

    try {
        // { profileId: { $eq: profileId } }
        const categoriesList = await Category.find({ 'gender': gender })
        res.status(200).send(categoriesList)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getCategoryNameAndGender = async (req, res) => {
    const categoryData = req.params.data
    const category = await Category.findOne({ 'name': categoryData.split('&')[0] ,'gender': categoryData.split('&')[1]})
    res.json({
        category: category
    });
}

const getCategoryById = async (req, res) => {
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const category = await Category.findById(req.params.id)
        res.status(200).send(category)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const addCategory = async (req, res) => {
    const newCategory = Category({
        "name": req.body.name,
        "pictureUrl": req.body.pictureUrl,
        "gender": req.body.gender,
        "subCategory": req.body.subCategory,
        "isDeleted": false
    })

    newCategory.save((error, newCategory) => {
        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        }
        else {
            res.status(200).send({
                'status': 'OK',
                'category': newCategory
            })
        }
    })
}

const editCategory = async (req, res) => {
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        //TODO: edit only the name of the category and the picture + nav to new category page
        const editCategory = await Category.findById(req.params.id)
        editCategory.name = req.body.name
        editCategory.pictureUrl = req.body.pictureUrl
        editCategory.gender = editCategory.gender
        editCategory.subCategory = editCategory.subCategory

        editCategory.save((error, editCategory) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            }
            else {
                res.status(200).send({
                    'status': 'OK',
                    'category': editCategory
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

const deleteCategory = async (req, res) => {
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const categoryToDelete = await Category.findById(req.params.id)
        categoryToDelete.isDeleted = true

        categoryToDelete.subCategory.forEach(async (sub) => {
            let subCategory = await SubCategory.findById(sub)
            subCategory.isDeleted = true

            subCategory.save((err) =>{
                if (err) {
                    res.status(400).send({
                        'status': 'fail',
                        'error': error.message
                    })
                }else{
                    res.status(200)
                }
            })
        })

        categoryToDelete.save((error) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            }
            else {
                res.status(200).send({
                    'status': 'OK',
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


module.exports = {
    getCategories,
    getCategoryNameAndGender,
    addCategory,
    editCategory,
    deleteCategory,
    getCategoryById
}