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

describe('Testing Auth API', () => {

    test('test registration', async () => {
        const response = await request(app).post('/auth/register').send({
            'email': email,
            'password': pwd,
            'type': "client" //need to think how we create admin account.
        })
        expect(response.statusCode).toEqual(200)
    })

    test('test login', async () => {
        const response = await request(app).post('/auth/login').send({
            'email': email,
            'password': pwd,
            'type': "client" //need to think how we create admin account.
        })
        expect(response.statusCode).toEqual(200)
    })

})