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
    try {
        const subCategory = await SubCategory.findById(req.params.id)
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
    const gender = req.params.gender

    if (categoryId == null || categoryId == undefined || gender == null || gender == undefined) {
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

const addSubCategory = async (req, res) => {
    const categoryId = req.params.id
    console.log("categoryId " + categoryId)
    const newSubCategory = SubCategory({
        "name": req.body.name,
        "pictureUrl": req.body.pictureUrl,
        "categoryId": categoryId
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
        const fromWhoToDelete = req.body.fromWhoToDelete
        const category = await Category.findById(subCategoryToDelete.categoryId)

        category.subCategory.remove(subCategoryToDelete._id)

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


        subCategoryToDelete.remove((error) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            }
            else {
                res.status(200).send({
                    'status': 'OK',
                    'message': 'The subCategory was deleted successfully'
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
    addSubCategory,
    editSubCategory,
    deleteSubCategory,
    getSubCategoryById,
    getSubCategoriesByCategoryId
}