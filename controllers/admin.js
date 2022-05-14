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
            'profilesLoginCompere': "0",
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

        // if need update:
        // save current date in mongo - V
        // save the variables to cards home page in mongo - v
        // create variable to send client - calculate percentage for each card data
        if(checkIfNeedUpdate(lastUpdate,dd)){
            const profileListLogin = await Profile.find({ status: "true" })
            const profileList = await Profile.find()
            const usersList = await User.find()
            const postsList = await Post.find()
            
            //FIXME: the calc of past week and today doesn't correct
            const newProfilesCompere_new = profileList.length - admin.newProfilesCompere
            const profilesLoginCompere_new = profileListLogin.length - admin.profilesLoginCompere
            const totalUsersCompere_new =  usersList.length - admin.totalUsersCompere
            const totalPostCompere_new = postsList.length - admin.totalPostCompere

            const cardsData = ({
                'loginProfile': {
                    'result' : ((Math.abs(profilesLoginCompere_new)/admin.profilesLoginCompere)*100).toFixed(1),
                    'direction' : profilesLoginCompere_new > 0 ? "up" : "down"
                },
                'newProfiles' : {
                    'result' : ((Math.abs(newProfilesCompere_new)/admin.newProfilesCompere)*100).toFixed(1),
                    'direction' :  newProfilesCompere_new > 0 ? "up" : "down"
                },
                'totalUsers' : {
                    'result' : ((Math.abs(totalUsersCompere_new)/admin.totalUsersCompere)*100).toFixed(1),
                    'direction' : totalUsersCompere_new > 0 ? "up" : "down"
                },
                'totalPosts' : {
                    'result' : ((Math.abs(totalPostCompere_new)/admin.totalPostCompere)*100).toFixed(1),
                    'direction' : totalPostCompere_new > 0 ? "up" : "down"
                }
            })
            
            admin.lastUpdate = today
            admin.newProfilesCompere = newProfilesCompere_new
            admin.profilesLoginCompere = profilesLoginCompere_new
            admin.totalUsersCompere = totalUsersCompere_new
            admin.totalPostCompere = totalPostCompere_new   
            await admin.save()

            res.json({
                data: cardsData
            })
        
        }else{
            res.json({
                data: "none"
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
    updateData
    // refreshToken
}