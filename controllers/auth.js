
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
        if (user == null) sendError(res, 400, "wrong email or password")

        const match = await bcrypt.compare(password, user.password)
        if (!match) return sendError(res, 400, "wrong email or password")


        const accessToken = await jwt.sign(
            { 'id': user._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
        )
        res.status(200).send({ 'accessToken': accessToken });

    } catch (err) {
        return sendError(res, 400, err.message)
    }
}

const logout = async (req, res) => {
    res.status(400).send({
        'status': 'fail',
        'error': 'not implemented'
    })
}

module.exports = {
    login,
    register,
    logout
}