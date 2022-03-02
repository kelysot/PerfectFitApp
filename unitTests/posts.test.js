const app = require('../server')
const request = require('supertest')
const mongoose = require('mongoose')
const User = require('../models/user_model')

const email = 'test@a.com'
const pwd = '123456'

beforeAll((done) => {
    User.remove({'email' : email}, (err)=>{
        done()
    })
   
})

afterAll((done) => {
    User.remove({'email' : email}, (err)=>{
        mongoose.connection.close()
        done()
    })
})

describe('Testing Post API', () => {
    const postMessage = 'this is my test post'
    const sender = 'Eliav'
    let accessToken = ''
    let userId = ''

    test('test registration', async() => {
        const response = await request(app).post('/auth/register').send({
            'email' : email,
            'password': pwd
        }) 
        expect(response.statusCode).toEqual(200)
        userId = response.body._id
    })

    test('test login', async() => {
        const response = await request(app).post('/auth/login').send({
            'email' : email,
            'password': pwd
        }) 
        expect(response.statusCode).toEqual(200)
        accessToken = response.body.accessToken
    })



    test('post get', async() => {
        const response = await request(app).get('/post').set({ authorization: 'JWT ' + accessToken})
        expect(response.statusCode).toEqual(200)
    })
    test('add new post', async() => {
        const response = await request(app).post('/post').set({ authorization: 'JWT ' + accessToken}).send({
            'message' : postMessage ,
            'sender' : sender
        })
        expect(response.statusCode).toEqual(200)
        const newPost = response.body.post
        expect(newPost.message).toEqual(postMessage)
        // expect(newPost.sender).toEqual(sender)

        const response2 = await request(app).get('/post/' + newPost._id).set({ authorization: 'JWT ' + accessToken})
        expect(response2.statusCode).toEqual(200)
        const post2= response2.body
        expect(post2.message).toEqual(postMessage)
        // expect(post2.sender).toEqual(sender)
    })
})