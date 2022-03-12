const SubCategory = require('../models/sub_category_model')

const getSubCategories = async (req, res) => {
    try{
        const subCategoriesList = await SubCategory.find()
        res.status(200).send(subCategoriesList)
    }catch(err){
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const addSubCategory = async (req, res) => {
    const categoryId = req.params.id
    const newSubCategory = SubCategory({
        "name": req.body.name,
        "categoryId" : categoryId
    })

    newSubCategory.save((error,newSubCategory) => {
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
}

const editSubCategory = async (req, res) => {
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try{
        const editSubCategory = await SubCategory.findById(req.params.id)
        editSubCategory.name = req.body.name

        editSubCategory.save((error,editSubCategory)=>{
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
    }catch(err){
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
    try{
        const subCategoryToDelete = await SubCategory.findById(req.params.id)
        subCategoryToDelete.remove((error)=>{
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
    }catch(err){
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
    deleteSubCategory
}