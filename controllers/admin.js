const Admin = require('../models/admin_model')
const User = require('../models/user_model')
const Post = require('../models/post_model')
const Profile = require('../models/profile_model')
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
            'name' : "Yarin Matmoni",
            'image': "https://media-exp1.licdn.com/dms/image/C4E03AQEGVXXL-uwrGA/profile-displayphoto-shrink_400_400/0/1606300287456?e=1657756800&v=beta&t=vqPPAP-02fFAQBeY0_SSwi7shnDXWVCgvUsQ6LnNZ-g",
            'isConnected': "false",
            'lastUpdate': "10/05/2022",
            "profilesLoginCompere": {
                "lastWeek": "0",
                "total": "0",
                "percent": "0"
            },
            "newProfilesCompere": {
                    "lastWeek": "0",
                    "total": "0",
                    "percent": "0"  
            },
            "totalUsersCompere":{
                    "lastWeek": "0",
                    "total": "0",
                    "percent": "0"
            },
            "totalPostCompere": {
                    "lastWeek": "0",
                    "total": "0",
                    "percent": "0"
            }
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

const editAdminDetails = async (req, res) => {
    console.log("ok")
    try{
        const editAdmin = await Admin.findOne()
        editAdmin.name = req.body.name
        editAdmin.email = req.body.email
        editAdmin.image = req.body.image

        editAdmin.save((error, editAdmin) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            }
            else {
                res.status(200).send({
                    'status': 'OK',
                    'admin': editAdmin
                })
            }
        })

    }catch (err){
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getAdminData = async (req, res) => {
    try{
        const admin = await Admin.findOne()
        res.json({
            data: admin
        });
    }catch (err) {
        return sendError(res, 400, err.message)
    }
}

const updateData = async (req, res) => {
    try {
        const admin = await Admin.findOne()
        const lastUpdate = admin.lastUpdate

        let today = new Date()
        const dd = String(today.getDate()).padStart(2, '0')
        const mm = String(today.getMonth() + 1).padStart(2, '0')
        const yyyy = today.getFullYear()
        today = dd + '/' + mm + '/' + yyyy

        if(checkIfNeedUpdate(lastUpdate,dd)){
            const profileList = await Profile.find()
            const profileListLogin = await Profile.find({ status: "true" })
            const usersList = await User.find()
            const postsList = await Post.find()
            
            const resToLoginProfile = profileListLogin.length - admin.profilesLoginCompere.lastWeek
            const resToNewProfiles = profileList.length - admin.newProfilesCompere.lastWeek
            const resToTotalUsers = usersList.length - admin.totalUsersCompere.lastWeek
            const resToTotalPosts = postsList.length - admin.totalPostCompere.lastWeek

            admin.lastUpdate = today
            admin.newProfilesCompere.total = profileList.length
            admin.newProfilesCompere.lastWeek = admin.newProfilesCompere.total
            admin.newProfilesCompere.percent = Math.abs((resToNewProfiles/admin.newProfilesCompere.lastWeek)*100).toFixed(1)
            admin.profilesLoginCompere.total = profileListLogin.length
            admin.profilesLoginCompere.lastWeek = admin.profilesLoginCompere.total
            admin.profilesLoginCompere.percent = Math.abs((resToLoginProfile/admin.profilesLoginCompere.lastWeek)*100).toFixed(1)
            admin.totalUsersCompere.total = usersList.length
            admin.totalUsersCompere.lastWeek = admin.totalUsersCompere.total
            admin.totalUsersCompere.percent = Math.abs((resToTotalUsers/admin.totalUsersCompere.lastWeek)*100).toFixed(1)
            admin.totalPostCompere.total = postsList.length
            admin.totalPostCompere.lastWeek = admin.totalPostCompere.total
            admin.totalPostCompere.percent = Math.abs((resToTotalPosts/admin.totalPostCompere.lastWeek)*100).toFixed(1)

            await admin.save()

            const cardsData = ({
                'loginProfile': {
                    'result' : resToLoginProfile,
                    'resultPercent' : admin.profilesLoginCompere.lastWeek === "0" ? "---" : admin.profilesLoginCompere.percent,
                    'direction' : resToLoginProfile > 0 ? 'up' : resToLoginProfile < 0 ? 'down' : 'flat'
                },
                'newProfiles' : {
                    'result' : resToNewProfiles,
                    'resultPercent' : admin.newProfilesCompere.lastWeek === "0" ? "---" : admin.newProfilesCompere.percent,
                    'direction' : resToNewProfiles > 0 ? 'up' : resToNewProfiles < 0 ? 'down' : 'flat'
                },
                'totalUsers' : {
                    'result' : resToTotalUsers,
                    'resultPercent' : admin.totalUsersCompere.lastWeek === "0" ? "---" : admin.totalUsersCompere.percent,
                    'direction' : resToTotalUsers > 0 ? 'up' : resToTotalUsers < 0 ? 'down' : 'flat'
                },
                'totalPosts' : {
                    'result' : resToTotalPosts,
                    'resultPercent' : admin.totalPostCompere.lastWeek === "0" ? "---" : admin.totalPostCompere.percent,
                    'direction' : resToTotalPosts > 0 ? 'up' : resToTotalPosts < 0 ? 'down' : 'flat'
                }
            })

            res.json({
                data: cardsData
            })
        
        }else{
            //FIXME: Check
            const cardsData = ({
                'loginProfile': {
                    'result' : admin.profilesLoginCompere.lastWeek,
                    'resultPercent' : admin.profilesLoginCompere.percent === "0" ? "---" : admin.profilesLoginCompere.percent,
                    'direction' : admin.profilesLoginCompere.lastWeek > 0 ? 'up' :  admin.profilesLoginCompere.lastWeek < 0 ? 'down' : "flat"
                },
                'newProfiles' : {
                    'result' : admin.newProfilesCompere.lastWeek,
                    'resultPercent' : admin.newProfilesCompere.percent === "0" ? "---" : admin.newProfilesCompere.percent,
                    'direction' : admin.newProfilesCompere.lastWeek > 0 ? 'up' :  admin.newProfilesCompere.lastWeek < 0 ? 'down' : "flat"
                },
                'totalUsers' : {
                    'result' : admin.totalUsersCompere.lastWeek,
                    'resultPercent' : admin.totalUsersCompere.percent === "0" ? "---" : admin.totalUsersCompere.percent,
                    'direction' : admin.totalUsersCompere.lastWeek > 0 ? 'up' :  admin.totalUsersCompere.lastWeek < 0 ? 'down' : "flat"
                },
                'totalPosts' : {
                    'result' : admin.totalPostCompere.lastWeek,
                    'resultPercent' : admin.totalPostCompere.percent === "0" ? "---" : admin.totalPostCompere.percent,
                    'direction' : admin.totalPostCompere.lastWeek > 0 ? 'up' :  admin.totalPostCompere.lastWeek < 0 ? 'down' : "flat"
                }
            })

            res.json({
                data: cardsData
            })
        }
    }catch (err) {
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

//////////////////////////////////////*Functions*///////////////////////////////////////

function checkIfNeedUpdate(lastUpdate,today){
    const dayBefore = (parseInt(lastUpdate.split('/')[0]))
    const dayToday = (parseInt(today))

    if(dayToday - dayBefore >= 7)
        return true
    else
        return false
}

module.exports = {
    login,
    register,
    logout,
    getAdminData,
    updateData,
    editAdminDetails
    // refreshToken
}