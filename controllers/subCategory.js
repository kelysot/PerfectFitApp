const SubCategory = require('../models/sub_category_model')
const Category = require('../models/category_model')

const getSubCategories = async (req, res) => {
    try {
        const subCategoriesList = await SubCategory.find()
        res.status(200).send(subCategoriesList)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getSubCategoryById = async (req, res) => {

    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    const subCategory = await SubCategory.findById(req.params.id)
    try {
        res.status(200).send(subCategory)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getSubCategoriesByCategoryId = async (req, res) => {
    const categoryId = req.params.categoryId
    if (categoryId == null || categoryId == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const category = await Category.findById(categoryId)
        const subCategories = await SubCategory.find({ '_id': { $in: category.subCategory } })
        res.status(200).send(subCategories)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getSubCategoriesByNameAndGender = async (req, res) => {
    const subCategoryData = req.params.data
    const subCategory = await SubCategory.findOne({ 'name': subCategoryData.split('&')[0], 'gender': subCategoryData.split('&')[1] })
    res.json({
        subCategory: subCategory
    });
}

const addSubCategory = async (req, res) => {
    const categoryId = req.params.id
    const newSubCategory = SubCategory({
        "name": req.body.name,
        "pictureUrl": req.body.pictureUrl,
        "gender": req.body.gender,
        "categoryId": categoryId,
        "posts": [],
        "isDeleted": false
    })

    newSubCategory.save((error, newSubCategory) => {
        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        }
        else {
            res.status(200).send({
                'status': 'OK',
                'subCategory': newSubCategory
            })
        }
    })

    const category = await Category.findById(newSubCategory.categoryId)

    category.subCategory.push(newSubCategory._id)

    await category.save((error) => {
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
}

const editSubCategory = async (req, res) => {
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const editSubCategory = await SubCategory.findById(req.params.id)
        editSubCategory.name = req.body.name
        editSubCategory.pictureUrl = req.body.pictureUrl
        editSubCategory.posts = editSubCategory.posts

        editSubCategory.save((error, editSubCategory) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            }
            else {
                res.status(200).send({
                    'status': 'OK',
                    'SubCategory': editSubCategory
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

const deleteSubCategory = async (req, res) => {
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const subCategoryToDelete = await SubCategory.findById(req.params.id)
        subCategoryToDelete.isDeleted = true

        subCategoryToDelete.save((error) => {
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
    getSubCategories,
    getSubCategoriesByNameAndGender,
    addSubCategory,
    editSubCategory,
    deleteSubCategory,
    getSubCategoryById,
    getSubCategoriesByCategoryId
}