const dotenv = require('dotenv').config()
const express = require('express')
const app = express();
const port = process.env.PORT

const indexRouter = require('./routes/index')
app.use('/',indexRouter)

const postRouter = require('./routes/post_routes')
app.use('/post',postRouter)


app.listen(port, ()=>{
    console.log('server is running on port ' + port)
})