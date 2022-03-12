const Notification = require('../models/notification_model')
const Profile = require('../models/profile_model')

const getNotifications = async(req, res) => {
    try{
        const notificationsList = await Notification.find()
        res.status(200).send(notificationsList)
    }catch(err){
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        }) 
    }
}

const getNotificationsListByProfileId = async (req, res) => {
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const profile = await Profile.findById(req.params.id)
        const notificationList = profile.notifications
        res.status(200).send(notificationList)
    }catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getNotificationById = async (req, res) => {
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        const notification = await Notification.findById(req.params.id)
        res.status(200).send(notification)
    }catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const addNotification = async (req, res) => {
    const profile = await Profile.findById(req.params.id)
    const profileId = profile._id

    const newNotification = Notification({
        profileId: profileId,
        notificationType: req.body.notificationType,
        date: req.body.date
    })

    const newNotificationList = profile.notifications
    newNotificationList.push(newNotification._id)

    await profile.save((error)=>{
        if(error){
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        }else{
            res.status(200)
        }
    })

    newNotification.save((error,newNotification)=>{
        if(error){
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        }else{
            res.status(200).send({
                'status': 'OK',
                'notification': newNotification
            })
        }
    })
}

const editNotification = async (req, res) => {
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try{
        const editNotification = await Notification.findById(req.params.id)
        editNotification.notificationType = req.body.notificationType
        editNotification.date = req.body.date

        editNotification.save((error,editNotification)=>{
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            }else {
                res.status(200).send({
                    'status': 'OK',
                    'notification': editNotification
                })
            }
        })
    }catch(err){
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const deleteNotification = async (req, res) => {
    if (req.params.id == null || req.params.id == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try{
        const notificationToDelete = await Notification.findById(req.params.id)
        const profile = await Profile.findById(notificationToDelete.profileId)

        if(profile.notifications.includes(notificationToDelete._id)){
            profile.notifications.remove(notificationToDelete._id)
            profile.save((error)=>{
                if(error){
                    res.status(400).send({
                        'status': 'fail',
                        'error': error.message
                    })
                }else{
                    res.status(200)
                }
            })
        }

        notificationToDelete.remove((error)=>{
            if(error){
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            }else{
                res.status(200).send({
                    'status': 'OK',
                    'message': 'The notification was deleted successfully'
                })
            }
        })
    }catch(err){
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

module.exports = {
    getNotificationsListByProfileId,
    getNotificationById,
    addNotification,
    editNotification,
    deleteNotification,
    getNotifications
}