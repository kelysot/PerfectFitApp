const Notification = require('../models/notification_model')
const Profile = require('../models/profile_model')

const getNotificationsListByProfileId = async (req, res) => {
    if (req.params.id == null | req.params.id == undefined) {
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
    if (req.params.id == null | req.params.id == undefined) {
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

}

const editNotification = async (req, res) => {

}

const deleteNotification = async (req, res) => {

}

module.exports = {
    getNotificationsListByProfileId,
    getNotificationById,
    addNotification,
    editNotification,
    deleteNotification
}