const dotenv = require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({extended:true, limit: '1m'}))
app.use(bodyParser.json())

// {useNewUrlParser : true}
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection
db.on('error',error=>{console.error(error)})
db.once('open',()=>{console.log('db connected!')})


const port = process.env.PORT

const indexRouter = require('./routes/index')
app.use('/',indexRouter)

const postRouter = require('./routes/post_routes')
app.use('/post',postRouter)


app.listen(port, ()=>{
    console.log('server is running on port ' + port)
})

