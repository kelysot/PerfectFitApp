const express = require('express')
const multer = require('multer')
const fileType = require('file-type')
const fs = require('fs')
const router = express.Router()
const path = require('path');
const crypto = require('crypto');


var storage = multer.diskStorage({
    destination: './uploads/',
    filename: function (req, file, cb) {
        return crypto.pseudoRandomBytes(16, function (err, raw) {
            if (err) {
                return cb(err);
            }
            return cb(null, "" + (raw.toString('hex')) + (path.extname(file.originalname)));
        });
    }
});


// const storage = multer({
//     dest: 'images/',
//     limits: { fileSize: 10000000, files: 1 },
//     fileFilter: (req, file, callback) => {

//         //console.log(file)
//         if (!file.originalname.match(/\.(jpg|jpeg)$/)) {

//             //return callback(new Error('Only Images are allowed !'), false)
//         }

//         return callback(null, true);
//     }
// })

var image = multer({ storage: storage })

router.post('/images/upload', image.single("upload"), (req, res) => {

    // if (err) {

    //     res.status(400).json({ message: err.message })

    // } else {

    let path = `/images/${req.file.filename}`
    res.status(200).json({ message: 'Image Uploaded Successfully !', path: path })
    // }

})

router.get('/images/:imagename', (req, res) => {

    let imagename = req.params.imagename
    let imagepath = __dirname + "/images/" + imagename
    let image = fs.readFileSync(imagepath)
    let mime = fileType(image).mime

    res.writeHead(200, { 'Content-Type': mime })
    res.end(image, 'binary')
})


module.exports = router







// var express = require("express");
// const router = express.Router()
// var multer, storage, path, crypto;
// multer = require('multer')
// path = require('path');
// crypto = require('crypto');




// // Post files
// router.post("/",
//     multer({
//         storage: storage
//     }).single('upload'), function (req, res) {
//         console.log(req.file);
//         console.log(req.body);
//         res.redirect("/uploads/" + req.file.filename);
//         console.log(req.file.filename);
//         return res.status(200).end();
//     });

// router.get('/:upload', function (req, res) {
//     file = req.params.upload;
//     console.log(req.params.upload);
//     var img = fs.readFileSync(__dirname + "/uploads/" + file);
//     res.writeHead(200, { 'Content-Type': 'image/png' });
//     res.end(img, 'binary');

// });
