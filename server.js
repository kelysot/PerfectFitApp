const dotenv = require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const Profile = require('./models/profile_model')


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
            bearerAuth: { type: 'apiKey', in: 'header', name: 'authorization' },
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



/////////////////////////////// similar profiles deleter ///////////////////////////////

let compareMonth = 5
deleteSimilar()

function deleteSimilar() {
    (function loop() {

        var now = new Date()
        var currentMonth =  parseInt(now.getMonth())
    
        if(currentMonth == 11){
            if(compareMonth == 0){
                deleteSimilarProfile()
                compareMonth = currentMonth
                console.log("inside1")
            }
        }
        else if(currentMonth > compareMonth) {
            deleteSimilarProfile().then(
                console.log("inside")
            )
            compareMonth = currentMonth
        }

        now = new Date();                  
        var delay = 60000 - (now % 60000); 
        // setTimeout(loop, delay);
        setTimeout(loop, 86400000); // delay of a day

        // maybe need setInterval
    })();
}

async function getProfiles(){
    let profiles = Profile.find({})
    return profiles
}


async function deleteSimilarProfile(){ // delete every month the similarProfiles arrays

    let profiles = await getProfiles()

    for(let i=0; i<profiles.length; i++){
        profiles[i].similarProfileId = []
        profiles[i].save((error) => {
            if (error) {
                res.status(400).send({
                    'status': 'fail',
                    'error': error.message
                })
            } else {
                return false
            }
        })
    }

    return true;
}



///////////////////////////////////////////////////////




// // Include the node file module
// var fs = require('fs');

// storage = multer.diskStorage({
//     destination: './uploads/',
//     filename: function (req, file, cb) {
//         return crypto.pseudoRandomBytes(16, function (err, raw) {
//             if (err) {
//                 return cb(err);
//             }
//             return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
//         });
//     }
// });


// // Post files
// app.post("/upload/",
//     multer({
//         storage: storage
//     }).single('upload'), function (req, res) {
//         console.log(req.file);
//         console.log(req.body);
//         res.redirect("/uploads/" + req.file.filename);
//         console.log(req.file.filename);
//         return res.status(200).end();
//     });

// app.get('/upload/:upload', function (req, res) {
//     file = req.params.upload;
//     console.log(req.params.upload);
//     var img = fs.readFileSync(__dirname + "/uploads/" + file);
//     res.writeHead(200, { 'Content-Type': 'image/png' });
//     res.end(img, 'binary');

// });

// app.use('/uploadsAdmin',express.static(__dirname + '/uploads'))

/////////////////////////////// Routers ///////////////////////////////


app.use('/uploadsAdmin', express.static(path.join(__dirname, 'uploads')))

const dashboardRouter = require('./routes/dashboard_routes')
app.use('/dashboard', dashboardRouter)

const indexRouter = require('./routes/index')
app.use('/', indexRouter)

const postRouter = require('./routes/post_routes')
app.use('/post', postRouter)

const authRouter = require('./routes/auth_routes')
app.use('/auth', authRouter)

const profileRouter = require('./routes/profile_routes')
app.use('/profile', profileRouter)

const categoryRouter = require('./routes/category_routes')
app.use('/category', categoryRouter)

const subCategoryRouter = require('./routes/subCategory_routes')
app.use('/subCategory', subCategoryRouter)

const commentRouter = require('./routes/comment_routes')
app.use('/comment', commentRouter)

const notificationRouter = require('./routes/notification_routes')
app.use('/notification', notificationRouter)

const imagesRouter = require('./routes/images')
app.use('/images', imagesRouter)

const adminRouter = require('./routes/admin_routes')
app.use('/admin', adminRouter)

module.exports = app
