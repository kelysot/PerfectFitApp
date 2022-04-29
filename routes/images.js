const express = require('express')
const multer = require('multer')
const fileType = require('file-type')
const fs = require('fs')
const router = express.Router()
const path = require('path');
const crypto = require('crypto');

router.use('/uploads', express.static('uploads'))
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

var image = multer({ storage: storage })


router.post('/upload', image.single("upload"), async (req, res) => {

    if (req.file === undefined) return res.status(404).send()

    let path = `/images/${req.file.filename}`
    res.status(200).json({ message: 'Image Uploaded Successfully !', path: path })
})

// router.get('/images/:imagename', (req, res) => {

//     let imagename = req.params.imagename
//     let imagepath = __dirname + "/images/" + imagename
//     let image = fs.readFileSync(imagepath)
//     let mime = fileType(image).mime

//     res.writeHead(200, { 'Content-Type': mime })
//     res.end(image, 'binary')
// })

router.get("/images/:imagename", async (req, res) => {
    let ans = req.params.imagename.toString()
    if (ans === "null") res.status(404).send()

    fs.readFile(req.params.imagename, function (err, data) {
        try {
            res.writeHead(200, { 'Content-Type': 'image/jpeg' })
            res.end(data)
        } catch (err) {
            err.status(400).send()
        }
    })
})

module.exports = router
