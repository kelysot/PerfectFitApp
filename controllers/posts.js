const getPosts = async (req, res) => {
    res.send(" this is my post list")
    
    // try {
    //     posts = await Post.find()
    //     res.status(200).send(posts)
    // } catch (err) {
    //     res.status(400).send({
    //         'status': 'fail',
    //         'error': err.message
    //     })
    // }
}

const addNewPost = (req, res) => {

    res.send("adding new post");
    // console.log('addNewPost ' + req.body.message)
    // sender = req.user.id

    // const post = Post({
    //     message: req.body.message,
    //     sender: sender
    // })

    // post.save((error, newPost) => {
    //     if (error) {
    //         res.status(400).send({
    //             'status': 'fail',
    //             'error': error.message
    //         })
    //     } else {
    //         res.status(200).send(newPost)
    //     }
    // })
}


module.exports = {
    getPosts,
    // getPostById,
    addNewPost
}

