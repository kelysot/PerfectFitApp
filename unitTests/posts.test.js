const app = require('../server')
const request = require('supertest')
const mongoose = require('mongoose')
const User = require('../models/user_model')

const email = 'test1'
const pwd = 'test1'

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
    const profileId = 'test'
    const productName = 'shirt1'
    const description = 'this is my test post'
    // const profileId = '1234' - need to change later user id to profile id.
    const sku = 'abc'
    const size = 'L'
    const company = 'ZARA'
    const price = '100'
    const color = 'Black'
    const categoryId = 'Shirt'
    const subCategoryId = 'T-Shirt'
    const date = '7/6/22'
    const link = 'www.example.com'
    const sizeAdjustment = '4'
    const rating = '5'
    const picturesUrl = []
    const likes = []
    const comments = []
    const isDeleted = false
    let accessToken = ''
    
 
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



    test('get all posts', async () => {
        const response = await request(app).get('/').set({ authorization: 'JWT ' + accessToken })
        expect(response.statusCode).toEqual(200)
    })

    // test('add new post', async () => {
    //     const response = await request(app).post('/').set({ authorization: 'JWT ' + accessToken }).send({
    //         'description': postDescription,
    //         'profileId': userId,
    //         'productName': productName,
    //         'sku': sku,
    //         'size': size,
    //         'company': company,
    //         'price': price,
    //         'color': color,
    //         'categoryId': categoryId,
    //         'subCategoryId': subCategoryId,
    //         'date': date,
    //         'link': link,
    //         'sizeAdjustment': sizeAdjustment,
    //         'rating': rating,
    //         'picturesUrl': picturesUrl,
    //         'likes': null,
    //         'comments': null,
    //         'isDeleted': false
    //     })
    //     expect(response.statusCode).toEqual(200)
        // const newPost = response.body.post
        // expect(newPost.description).toEqual(postDescription)
        // expect(newPost.sender).toEqual(sender)

        // const response2 = await request(app).get('/post/' + newPost._id).set({ authorization: 'JWT ' + accessToken })
        // expect(response2.statusCode).toEqual(200)
        // const post2 = response2.body
        // expect(post2.description).toEqual(postDescription)
        // expect(post2.sender).toEqual(sender)
    // })


    test('get WishList', async () => {
        const response = await request(app).get('/post/getWishList/' + profileId).set({ authorization: 'JWT ' + accessToken }).send({
        })
        expect(response.statusCode).toEqual(200)
    })


    test('get profiles posts', async () => {
        const response = await request(app).get('/post/getProfilePosts/' + profileId).set({ authorization: 'JWT ' + accessToken }).send({
        })
        expect(response.statusCode).toEqual(200)
    })

    const postId = '625bf9283127cd24f5a99da6'
    
    test('get post by id', async () => {
        const response = await request(app).get('/post/getPostById/' + postId).set({ authorization: 'JWT ' + accessToken }).send({
        })
        expect(response.statusCode).toEqual(200)
    })


    const subCategoryIdsend = '6277e8f36e522fb22ce0f50d'
    test('get posts by subCategoryId', async () => {
        const response = await request(app).get('/post/getPostsBySubCategoryId/' + subCategoryIdsend).set({ authorization: 'JWT ' + accessToken }).send({
        })
        expect(response.statusCode).toEqual(200)
    })

    test('Get suitable posts', async () => {
        const response = await request(app).get('/post/getSuitablePosts/' + profileId).set({ authorization: 'JWT ' + accessToken }).send({
        })
        expect(response.statusCode).toEqual(200)
    })



})

