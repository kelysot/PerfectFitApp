const User = require('../models/user_model')
const Profile = require('../models/profile_model')
const bcrypt = require('bcryptjs')
const { use } = require('../routes')
const jwt = require('jsonwebtoken')
const SendEmail = require('../utils/sendEmail')

const sendError = (res, code, msg) => {
    return res.status(code).send({
        'status': 'fail',
        'error': msg
    })
}

const register = async (req, res) => {

    const email = req.body.email
    const password = req.body.password

    if (email == null || password == null) {
        return sendError(res, 400, "wrong email or password")
    }

    try {
        const exist = await User.findOne({ 'email': email })
        if (exist != null) {
            return res.status(400).send({
                'status': 'fail',
                'error': 'user exist'
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPwd = await bcrypt.hash(password, salt)
        const user = User({
            'email': email,
            'password': hashPwd,
            'type': "client", //need to think how we create admin account.
            'isConnected': "true"
        })
        const accessToken = await jwt.sign(
            { 'id': user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
        )

        const refreshToken = await jwt.sign(
            { 'id': user._id },
            process.env.REFRESH_TOKEN_SECRET
        )

        console.log("the token: " + accessToken)
        user.tokens = [accessToken, refreshToken]

        newUser = await user.save();
        res.status(200).send(newUser);
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const login = async (req, res) => {

    const email = req.body.email
    const password = req.body.password
    if (email == null || password == null) return sendError(res, 400, "wrong email or password")

    try {

        const user = await User.findOne({ 'email': email })
        if (!user) return sendError(res, 400, "wrong email or password")

        const match = await bcrypt.compare(password, user.password)
        if (!match) return sendError(res, 400, "wrong email or password")


        user.isConnected = "true"
        await user.save()
        // user.save((error, user) => {
        //     if (error) {
        //         res.status(400).send({
        //             'status': 'fail',
        //             'error': error.message
        //         })
        //     }
        // })

        const accessToken = await jwt.sign(
            { 'id': user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
        )

        const refreshToken = await jwt.sign(
            { 'id': user._id },
            process.env.REFRESH_TOKEN_SECRET
        )



        console.log("the token: " + accessToken)
        // if (user.tokens == null)
        //TODO: send the two tokens: access and refresh
        user.tokens = [accessToken, refreshToken]
        // else user.tokens.push(refreshToken)
        await user.save()

        res.status(200).send({
            'accessToken': accessToken,
            'refreshToken': refreshToken,
            'user': user
        });

    } catch (err) {
        return sendError(res, 400, err.message)
    }
}

const getUser = async (req, res) => {

    const email = req.params.email
    if (email == null || email == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const user = await User.findOne({ 'email': email })
        const senduser = user._doc
        res.status(200).send(senduser)
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
        console.log("--------------- " + err.message)
    }
}

const logout = async (req, res) => {
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1]
    if (token == null) return res.sendStatus('401')

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, userInfo) => {
        if (err) return res.status(403).send(err.message)
        const userId = userInfo.id
        try {
            const user = await User.findById(userId)
            if (user == null) return res.status(403).send('invalid request')
            if (!user.tokens.includes(token)) {
                user.isConnected = "false"
                user.tokens = [] //invalidate all user token
                await user.save()
                return res.status(403).send('invalid request')
            }
            else {
                user.isConnected = "false"
                await user.save()
            }
            user.tokens.splice(user.tokens.indexOf(token), 1)
            await user.save()
            res.status(200).send();
        } catch (err) {
            res.status(403).send(err.message)
        }
    })
}


const refreshToken = async (req, res) => {
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1]
    if (token == null) return res.sendStatus('401')

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo) => {
        if (err) return res.status(403).send(err.message)
        const userId = userInfo.id
        try {
            console.log("**************")
            console.log("the userId = " + userId)
            const user = await User.findById(userId)
            if (user == null) return res.status(403).send('invalid request')
            if (!user.tokens.includes(token)) {
                console.log("delete the tokens!!!")
                user.tokens = [] //invalidate all user tokens
                await user.save()
                return res.status(403).send('invalid request')
                
            }
            const accessToken = await jwt.sign(
                { 'id': user._id },
                process.env.ACCESS_TOKEN_SECRET,
                { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
            )
            const refreshToken = await jwt.sign(
                { 'id': user._id },
                process.env.REFRESH_TOKEN_SECRET
            )

            user.tokens = [accessToken, refreshToken]
            console.log("the tokens: ")
            console.log("access = " + accessToken)
            console.log("refresh = " + refreshToken)
            console.log("the user is:")
            console.log(user)
            //TODO: maybe we need to save the tokens by add them tp the tokens array.

            // user.tokens[user.tokens.indexOf(token)] = refreshToken
            await user.save()
            res.status(200).send({ 'accessToken': accessToken, 'refreshToken': refreshToken });
        } catch (err) {
            res.status(403).send(err.message)
        }
    })
}

const checkIfEmailExist = async (req, res) => {
    const email = req.params.email
    console.log(email)
    const exist = await User.findOne({ 'email': email })
    console.log(exist)
    if (exist != null) {
        return res.status(400).send({
            'status': 'fail',
            'error': 'email exist'
        })
    }
    else {
        res.status(200).send({
            'status': 'OK'
        })
    }
}

const editUser = async (req, res) => {

    const user = req.body
    const previousEmail = req.body.previousEmail
    var email = req.body.email

    if (previousEmail != null && previousEmail != undefined) {
        email = previousEmail
    }

    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hashPwd = await bcrypt.hash(password, salt)

    if (user == null || user == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }

    try {
        const editUser = await User.findOne({ 'email': email })
        editUser.email = req.body.email
        editUser.password = hashPwd
        editUser.type = "client"
        editUser.isConnected = req.body.isConnected
        editUser.profilesId = req.body.profilesId
        editUser.tokens = editUser.tokens

        editUser.save((error, editUser) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            } else {
                res.status(200).send({
                    'status': 'OK',
                    'user': editUser
                })
            }
        })

        //Change the email in every relevant profile: 

        let profiles = await Profile.find({ userId: { $eq: previousEmail } })

        for (const element of profiles) {

            element.userId = req.body.email
            element.save((error) => {
                if (error) {
                    res.status(400).send({
                        'status': 'fail',
                        'error': error.message
                    })
                }
            })
        }

    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const resetPassword = async (req, res) => {
    var randomCode = getRandomInt()

    console.log(randomCode)

    var text = "Hi, your new code to PerfectFit app is " + String(randomCode)

    await SendEmail(req.params.email, "Reset Password - PerfectFit", text)
    res.status(200).send({
        'status': 'OK',
        'code': String(randomCode)
    })
}


function getRandomInt() {
    var min = 10000;
    var max = 100000000;
    return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
}

const changePassword = async (req, res) => {
    console.log("1111111111111")

    const user = req.body
    var email = req.body.email
    console.log(email)

    const password = req.body.password
    const salt = await bcrypt.genSalt(10)
    const hashPwd = await bcrypt.hash(password, salt)

    if (user == null || user == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }

    try {
        const editUser = await User.findOne({ 'email': email })
        console.log(editUser)
        editUser.password = hashPwd

        console.log(editUser)

        editUser.save((error, editUser) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            } else {
                res.status(200).send()
            }
        })

    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

module.exports = {
    login,
    register,
    getUser,
    editUser,
    checkIfEmailExist,
    logout,
    resetPassword,
    changePassword,
    refreshToken
}