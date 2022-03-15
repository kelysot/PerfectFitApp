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

describe('Testing Profile API', () => {
    //  const userId = '1234'
    const firstName = 'Yuval'
    const lastName = 'Levi'
    const gender = 'female'
    const userName = 'yuv92'
    const birthday = '07.11.92'
    const pictureUrl = 'pic1'
    const shoulder = '80'
    const chest = '80'
    const basin = '80'
    const waist = '80'
    const foot = '80'
    const height = '80'
    const weight = '80'
    const bodyType = '1'
    const status = false

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


    test('add new profile', async () => {
        const response = await request(app).post('/profile').set({ authorization: 'JWT ' + accessToken}).send({
            'userId': userId,
            'firstName': firstName,
            'lastName': lastName,
            'gender': gender,
            'userName': userName,
            'birthday': birthday,
            'pictureUrl': pictureUrl,
            'shoulder': shoulder,
            'chest': chest,
            'basin': basin,
            'waist': waist,
            'foot': foot,
            'height': height,
            'weight': weight,
            'bodyType': bodyType,
            'status': status,
            'similarProfileId': null,
            'followers': null,
            'trackers': null,
            'notifications': null,
            'wishlist': null,
            'myPostsListId': null

        })
        expect(response.statusCode).toEqual(200)
        const newProfile = response.body.profile
        expect(newProfile.firstName).toEqual(firstName)

        // const response2 = await request(app).get('/profile/' + newProfile._id).set({ authorization: 'JWT ' + accessToken })
        // expect(response2.statusCode).toEqual(200)
        // const profile2 = response2.body
        // expect(profile2.firstName).toEqual(firstName)
    })
})

