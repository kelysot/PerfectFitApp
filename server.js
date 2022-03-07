const dotenv = require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')


if (process.env.NODE_ENV == "development") {
    const swaggerUI = require("swagger-ui-express")
    const swaggerJsDoc = require("swagger-jsdoc")
    const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Perfect Fit API",
                version: "1.0.0",
                description: "A simple Express Library API",
            },
            servers: [{ url: "http://localhost:" + process.env.PORT, },],
        },
        apis: ["./routes/*.js"],
    };
    const specs = swaggerJsDoc(options);
    app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));
}


app.use(bodyParser.urlencoded({ extended: true, limit: '1m' }))
app.use(bodyParser.json())

// {useNewUrlParser : true}
mongoose.connect(process.env.DATABASE_URL);
const db = mongoose.connection
db.on('error', error => { console.error(error) })
db.once('open', () => { console.log('db connected!') })


const port = process.env.PORT

const indexRouter = require('./routes/index')
app.use('/', indexRouter)

const postRouter = require('./routes/post_routes')
app.use('/post', postRouter)

const authRouter = require('./routes/auth_routes')
app.use('/auth', authRouter)

const profileRouter = require('./routes/profile_routes')
app.use('/profile', profileRouter)

module.exports = app
