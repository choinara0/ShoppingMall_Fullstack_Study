const express = require('express');
const router = express.Router();
const multer = require('multer');

//=================================
//             Product
//=================================

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')    //file이 저장될 위치 설정
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`)
    }   //file 이름 설정
});
var upload = multer({ storage: storage }).single('file');


router.post('/image', (req, res)=>{
     // 가져온 이미지를 저장할 것

    upload(req, res, (err) =>{
        if (err) {
            return req.json({success: false, err})
        }
        return res.json({
            success: true,
            filePath: res.req.path,
            fileName: res.req.file.filename,
        })
    })
})

module.exports = router;
