const Admin = require('../models/admin_model')
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
        const exist = await Admin.findOne({ 'email': email })
        if (exist != null) {
            return res.status(400).send({
                'status': 'fail',
                'error': 'user exist'
            })
        }
        const salt = await bcrypt.genSalt(10)
        const hashPwd = await bcrypt.hash(password, salt)
        const admin = Admin({
            'email': 'y@gmail.com',
            'password': hashPwd,
            'isConnected': "false",
            'lastUpdate': "10/05/2022",
            'newProfilesCompere': "0",
            'totalUsersCompere': "0",
            'totalPostCompere': "0"
        })
        const accessToken = await jwt.sign(
            { 'id': admin._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
        )

        const refreshToken = await jwt.sign(
            { 'id': admin._id },
            process.env.REFRESH_TOKEN_SECRET
        )

        console.log("the token: " + accessToken)
        admin.tokens = [accessToken, refreshToken]

        newAdmin = await admin.save();
        res.status(200).send(newAdmin);
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
        const admin = await Admin.findOne({ 'email': email })
        if (!admin) return sendError(res, 400, "wrong email or password")

        const match = await bcrypt.compare(password, admin.password)
        
        if (!match) return sendError(res, 400, "wrong email or password 111")
        admin.isConnected = "true"
        await admin.save()

        const accessToken = await jwt.sign(
            { 'id': admin._id },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: process.env.JWT_TOKEN_EXPIRATION }
        )

        const refreshToken = await jwt.sign(
            { 'id': admin._id },
            process.env.REFRESH_TOKEN_SECRET
        )



        console.log("the token: " + accessToken)
        // if (user.tokens == null)
        //TODO: send the two tokens: access and refresh
        admin.tokens = [accessToken, refreshToken]
        // else user.tokens.push(refreshToken)
        await admin.save()

        res.status(200).send({
            'accessToken': accessToken,
            'refreshToken': refreshToken
        });

    } catch (err) {
        return sendError(res, 400, err.message)
    }
}

const logout = async (req, res) => {
    const authHeaders = req.headers['authorization']
    const token = authHeaders && authHeaders.split(' ')[1]
    if (token == null) return res.sendStatus('401')

    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, async (err, userInfo) => {
        if (err) return res.status(403).send(err.message)
        const adminId = userInfo.id
        try {
            const admin = await Admin.findById(adminId)
            if (admin == null) return res.status(403).send('invalid request')
            if (!admin.tokens.includes(token)) {
                admin.isConnected = "false"
                admin.tokens = [] //invalidate all user token
                await admin.save()
                return res.status(403).send('invalid request')
            }
            else {
                admin.isConnected = "false"
                await admin.save()
            }
            admin.tokens.splice(admin.tokens.indexOf(token), 1)
            await admin.save()
            res.status(200).send();
        } catch (err) {
            res.status(403).send(err.message)
        }
    })
}

module.exports = {
    login,
    register,
    logout
    // refreshToken
}