const Category = require('../models/category_model')

const getCategories = async (req, res) => {
    try {
        const categoriesList = await Category.find()
        res.status(200).send(categoriesList)
    }catch(err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
} 

const addCategory = async (req, res) => {
    const newCategory = Category({
        "name": req.body.name
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
    try{
        const editCategory = await Category.findById(req.params.id)
        editCategory.name = req.body.name

        editCategory.save((error,editCategory)=>{
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
    }catch(err){
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
    try{
        const categoryToDelete = await Category.findById(req.params.id)
        categoryToDelete.remove((error)=>{
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            }
            else {
                res.status(200).send({
                    'status': 'OK',
                    'message': 'The category was deleted successfully'
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
    getCategories,
    addCategory,
    editCategory,
    deleteCategory
}