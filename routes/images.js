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

router.post("/upload", image.single("upload"), async (req, res) => {
    if (req.file === undefined) return res.status(400).send;
    let imgUrl = req.file.path;
    res.status(200).send(imgUrl);
});

router.get("/image/:imageName", async (req, res) => {

    let imagePath = req.params.imageName
    if (imagePath == null) res.status(404).send()

    fs.readFile(imagePath, function (err, data) {
        try {
            res.writeHead(200, { 'Content-Type': 'image/png' });
            res.end(data); // Send the file data to the browser.  
        } catch (err) {
            res.status(400).send();
        }
    });
});

module.exports = router
