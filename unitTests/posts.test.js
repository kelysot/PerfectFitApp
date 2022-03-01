const app = require('../server')
const request = require('supertest')
const mongoose = require('mongoose')

beforeAll((done) => {
    done()
})

afterAll((done) => {
    mongoose.connection.close()
    done()
})

describe('Testing Post API', () => {
    const postMessage = 'this is my test post'
    const sender = 'Eliav'

    test('post get', async() => {
        const response = await request(app).get('/post') 
        expect(response.statusCode).toEqual(200)
    })
    test('add new post', async() => {
        const response = await request(app).post('/post').send({
            'message' : postMessage ,
            'sender' : sender
        })
        expect(response.statusCode).toEqual(200)
        const newPost = response.body.post
        expect(newPost.message).toEqual(postMessage)
        expect(newPost.sender).toEqual(sender)

        const response2 = await request(app).get('/post/' + newPost._id)
        expect(response2.statusCode).toEqual(200)
        const post2= response2.body
        expect(post2.message).toEqual(postMessage)
        expect(post2.sender).toEqual(sender)
    })
})