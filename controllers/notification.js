const Notification = require('../models/notification_model')
const Profile = require('../models/profile_model')
const Post = require('../models/post_model')

const getNotifications = async (req, res) => {
    try {
        const notificationsList = await Notification.find()
        res.status(200).send(notificationsList)
    } catch (err) {
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
    } catch (err) {
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
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const addNotification = async (req, res) => {
    var userName = req.body.profileIdMine
    const profile = await Profile.findOne({ 'userName': userName })
    const profileUserName = profile.userName

    const newNotification = Notification({
        profileIdMine: profileUserName,
        profileIdFrom: req.body.profileIdFrom,
        notificationType: req.body.notificationType,
        date: new Date(),
        postId: req.body.postId,
        seen: req.body.seen
    })

    const profileNotificationList = profile.notifications
    var notificationsToSend = []
    var flag = false
    //Check to not have the same notifications lot of time.
    for (var i = 0; i < profileNotificationList.length; i++) {
        const notification = await Notification.findById(profileNotificationList[i]._id)

        if (!flag && notification.profileIdFrom == newNotification.profileIdFrom &&
            notification.notificationType == newNotification.notificationType) {
            //Comments and likes check.    
            if (newNotification.notificationType.includes("commented") ||
                newNotification.notificationType.includes("liked")) {
                if (notification.postId == newNotification.postId) {
                    notificationsToSend.push(newNotification._id)
                }
            } else {
                notificationsToSend.push(newNotification._id)
            }
            flag = true
        } else {
            notificationsToSend.push(notification._id)
        }
    }

    if (!notificationsToSend.includes(newNotification._id)) {
        notificationsToSend.push(newNotification._id)
    }

    profile.notifications = notificationsToSend

    await profile.save((error) => {
        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        } else {
            res.status(200)
        }
    })

    newNotification.save((error, newNotification) => {
        if (error) {
            res.status(400).send({
                'status': 'fail',
                'error': error.message
            })
        } else {
            res.status(200).send({
                'status': 'OK',
                'notification': newNotification
            })
        }
    })
}

const editNotification = async (req, res) => {

    const notification = req.body
    const id = notification._id

    if (notification == null || notification == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }

    try {
        const editNotification = await Notification.findById(id)
        editNotification.notificationType = req.body.notificationType
        editNotification.date = new Date()
        editNotification.postId = req.body.postId
        editNotification.seen = req.body.seen

        editNotification.save((error, editNotification) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            } else {
                res.status(200).send({
                    'status': 'OK',
                    'notification': editNotification
                })
            }
        })
    } catch (err) {
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
    try {
        const notificationToDelete = await Notification.findById(req.params.id)
        const profile = await Profile.findById(notificationToDelete.profileId)

        if (profile.notifications.includes(notificationToDelete._id)) {
            profile.notifications.remove(notificationToDelete._id)
            profile.save((error) => {
                if (error) {
                    res.status(400).send({
                        'status': 'fail',
                        'error': error.message
                    })
                } else {
                    res.status(200)
                }
            })
        }

        notificationToDelete.remove((error) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            } else {
                res.status(200).send({
                    'status': 'OK',
                    'message': 'The notification was deleted successfully'
                })
            }
        })
    } catch (err) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
}

const getNotificationsByIds = async (req, res) => {

    const notificationsIds = req.params.notificationsIds // We get list as a string.
    arrayNotificationsIds = notificationsIds.substring(1)
    arrayNotificationsIds = arrayNotificationsIds.slice(0, -1)
    arrayNotificationsIds = arrayNotificationsIds.split(", ")

    if (notificationsIds == null || notificationsIds == undefined) {
        res.status(400).send({
            'status': 'fail',
            'error': err.message
        })
    }
    try {
        var notificationArr = []

        var i = 0
        for (i = 0; i < arrayNotificationsIds.length; i++) {
            var id = arrayNotificationsIds[i]
            var notification = await Notification.findById(id)

            //Check if the post that get a notification isn't deleted.    
            if (notification.postId != " ") {
                const post = await Post.findById(notification.postId)
                if (post.isDeleted == true) {
                    break
                }
            }

            //Check if the profile that made a notification deleted his profile.    
            const profile = await Profile.findOne({ 'userName': notification.profileIdFrom })
            if (profile.isDeleted == false) {
                notificationArr.push(notification)
            }
        }

        //Sort notification arr according to the time the notification was created.
        notificationArr.sort(function (a, b) {
            return new Date(b.date) - new Date(a.date);
        });

        res.status(200).send(notificationArr)
    } catch (err) {
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
    getNotifications,
    getNotificationsByIds
}