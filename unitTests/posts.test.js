const app = require('../server')
const request = require('supertest')
const mongoose = require('mongoose')
const User = require('../models/user_model')

const email = 'test@a.com'
const pwd = '123456'

beforeAll((done) => {
    User.remove({ 'email': email }, (err) => {
        done()
    })

})

afterAll((done) => {
    User.remove({ 'email': email }, (err) => {
        mongoose.connection.close()
        done()
    })
})

describe('Testing Post API', () => {
    const postDescription = 'this is my test post'
    // const profileId = '1234' - need to change later user id to profile id.
    const productName = 'shirt'
    const sku = 'abc'
    const size = 'L'
    const company = 'Zara'
    const price = '100'
    const color = 'black'
    const categoryId = '1'
    const subCategoryId = '2'
    const date = '3/3/22'
    const link = 'www.example.com'
    const sizeAdjustment = '4'
    const rating = '5'
    const picturesUrl = ['pic1', 'pic2']
    let accessToken = ''
    let userId = ''

    test('test registration', async () => {
        const response = await request(app).post('/auth/register').send({
            'email': email,
            'password': pwd,
            'type': "client" //need to think how we create admin account.
        })
        expect(response.statusCode).toEqual(200)
        userId = response.body._id
    })

    test('test login', async () => {
        const response = await request(app).post('/auth/login').send({
            'email': email,
            'password': pwd,
            'type': "client" //need to think how we create admin account.
        })
        expect(response.statusCode).toEqual(200)
        accessToken = response.body.accessToken
    })



    test('post get', async () => {
        const response = await request(app).get('/post').set({ authorization: 'JWT ' + accessToken })
        expect(response.statusCode).toEqual(200)
    })
    test('add new post', async () => {
        const response = await request(app).post('/post').set({ authorization: 'JWT ' + accessToken }).send({
            'description': postDescription,
            'profileId': userId,
            'productName': productName,
            'sku': sku,
            'size': size,
            'company': company,
            'price': price,
            'color': color,
            'categoryId': categoryId,
            'subCategoryId': subCategoryId,
            'date': date,
            'link': link,
            'sizeAdjustment': sizeAdjustment,
            'rating': rating,
            'picturesUrl': picturesUrl,
            'likes': null,
            'comments': null
        })
        expect(response.statusCode).toEqual(200)
        const newPost = response.body.post
        expect(newPost.description).toEqual(postDescription)
        // expect(newPost.sender).toEqual(sender)

        const response2 = await request(app).get('/post/' + newPost._id).set({ authorization: 'JWT ' + accessToken })
        expect(response2.statusCode).toEqual(200)
        const post2 = response2.body
        expect(post2.description).toEqual(postDescription)
        // expect(post2.sender).toEqual(sender)
    })
})

