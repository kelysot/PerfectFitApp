const app = require('../server')
const request = require('supertest')
const mongoose = require('mongoose')
const User = require('../models/user_model')

const email = 'test@a.com'
const pwd = '123456'
let accessToken = ''
let refreshToken = ''

let newAccessToken = ''
let newRefreshToken = ''

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
        accessToken = response.body.accessToken
        refreshToken = response.body.refreshToken
        expect(accessToken).not.toEqual(null);
        expect(refreshToken).not.toEqual(null);
    })

})

describe("Token access", () => {

    test("UnAuthorized accesss", async () => {
        const wrongToken = accessToken.replace(accessToken, "0000000")
        const response = await request(app).get("/post")
            .set({ authorization: 'JWT' + wrongToken })
        expect(response.statusCode).not.toEqual(200);
    });

    jest.setTimeout(30000);
    test("timeout access", async () => {
        await new Promise(r => setTimeout(r, 3 * 1000));
        const response = await request(app).get("/post")
            .set({ authorization: 'JWT' + accessToken })
        expect(response.statusCode).not.toEqual(200);
    });

    test("Refresh Token", async () => {
        const response = await request(app).get("/auth/refreshToken")
            .set({ authorization: 'JWT' + refreshToken })
        expect(response.statusCode).toEqual(200);
        newAccessToken = response.body.accessToken
        newRefreshToken = response.body.refreshToken
        expect(newAccessToken).not.toEqual(null);
        expect(newRefreshToken).not.toEqual(null);
    });


})

describe("Restric access without Auth / ", () => {
    test("It should respond with error", async () => {
        const response = await request(app).get("/post");
        expect(response.statusCode).not.toEqual(200);
    })
})