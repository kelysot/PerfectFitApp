const app = require('../server')
const request = require('supertest')
const mongoose = require('mongoose')
const subCategory = require('../models/sub_category_model')

const email = 'test1'
const pwd = 'test1'

beforeAll((done) => {
    // User.remove({ 'email': email }, (err) => {
        done()
    // })
})

afterAll((done) => {
    // User.remove({ 'email': email }, (err) => {
        mongoose.connection.close()
        done()
    // })
})

describe('Testing category API', () => {

    const email = 'testtest'
    const pwd = 'testtest'

    const name = "T-Shirt1"
    const pictureUrl = ""
    const gender = "Female"
    const categoryId= ""
    const posts= []
    const isDeleted = false

    test('test login', async () => {
        const response = await request(app).post('/auth/login').send({
            'email': email,
            'password': pwd,
            'type': "client" 
        })
        expect(response.statusCode).toEqual(200)
        accessToken = response.body.accessToken
    })


    // router.get('/', authenticate, SubCategory.getSubCategories)

    test('Get all subCategories', async () => {
        const response = await request(app).get('/subcategory').set({ authorization: 'JWT ' + accessToken }).send({})
        expect(response.statusCode).toEqual(200)
    })
   
    // router.get('/getSubCategoryById/:id', authenticate, SubCategory.getSubCategoryById)

    const subCategoryIdsend = '624eb68fa63ffe3195900e82'
    test('Get subCategory by id', async () => {
        const response = await request(app).get('/subcategory/getSubCategoryById/' + subCategoryIdsend).set({ authorization: 'JWT ' + accessToken }).send({})
        expect(response.statusCode).toEqual(200)
    })


})
