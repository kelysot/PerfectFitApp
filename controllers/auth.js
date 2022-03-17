const User = require('../models/user_model')
const bcrypt = require('bcryptjs')
const { use } = require('../routes')
const jwt = require('jsonwebtoken')

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
            'type': "client" //need to think how we create admin account.
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
        user.tokens = [accessToken]

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
        user.tokens = [accessToken]
        // else user.tokens.push(refreshToken)
        await user.save()

        res.status(200).send({
            'accessToken': accessToken,
            'refreshToken': refreshToken
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


//TODO: logout not working.
// const logout = async (req, res) => {
//     const authHeaders = req.headers['authorization']
//     const token = authHeaders && authHeaders.split(' ')[1]
//     if (token == null) return res.sendStatus('401')

//     jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo) => {
//         if (err) return res.status(403).send(err.message)
//         const userId = userInfo._id
//         try {
//             user = await User.findById(userId)
//             if (user == null) return res.status(403).send('invalid request')
//             if (!user.tokens.includes(token)) {
//                 user.tokens = [] //invalidate all user token
//                 await user.save()
//                 return res.status(403).send('invalid request')
//             }
//             user.tokens.splice(user.tokens.indexOf(token), 1)
//             await user.save()
//             res.status(200).send();
//         } catch (err) {
//             res.status(403).send(err.message)
//         }
//     })
// }


const refreshToken = async (req, res) => {
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1]
    if (token == null) return res.sendStatus('401')

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, async (err, userInfo) => {
        if (err) return res.status(403).send(err.message)
        const userId = userInfo._id
        try {
            user = await User.findById(userId)
            if (user == null) return res.status(403).send('invalid request')
            if (!user.token.includes(token)) {
                user.token = [] //invalidate all user tokens
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

            user.tokens[user.tokens.indexOf(token)] = refreshToken
            await user.save()
            res.status(200).send({ 'accessToken': accessToken, 'refreshToken': refreshToken });
        } catch (err) {
            res.status(403).send(err.message)
        }
    })
}

const checkIfEmailExist = async (req, res) => {
    const email = req.params.email
    const exist = await User.findOne({ 'email': email })
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

module.exports = {
    login,
    register,
    getUser,
    checkIfEmailExist
    // logout,
    // refreshToken
}