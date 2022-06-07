const app = require('../server')
const request = require('supertest')
const mongoose = require('mongoose')
const category = require('../models/category_model')

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

    const name = "Shirt1"
    const pictureUrl = ""
    const gender = "Female"
    const subCategory = "T-Shirt"
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
   
    test('Get all categories', async () => {
        const response = await request(app).get('/category/' + gender).set({ authorization: 'JWT ' + accessToken }).send({})
        expect(response.statusCode).toEqual(200)
    })

    const categoryId = '624eb63da63ffe3195900e7e'

    test('Get all categories', async () => {
        const response = await request(app).get('/category/' + categoryId).set({ authorization: 'JWT ' + accessToken }).send({})
        expect(response.statusCode).toEqual(200)
    })


    // router.post('/', authenticate, Category.addCategory)

    // router.patch('/:id', authenticate, Category.editCategory)

    // router.delete('/:id', authenticate, Category.deleteCategory)

    // router.get('/getByGenderAndName/:data', authenticate, Category.getCategoryNameAndGender)

    // const data = {

    // }
    // test('Get actegory by gender and name', async () => {
    //     const response = await request(app).get('/getByGenderAndName/' + data).set({ authorization: 'JWT ' + accessToken }).send({})
    //     expect(response.statusCode).toEqual(200)
    // })




})
