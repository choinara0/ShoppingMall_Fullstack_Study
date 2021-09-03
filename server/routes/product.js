const express = require('express');
const router = express.Router();
const multer = require('multer');
const { Product } = require('../models/Product');

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
            filePath: res.req.file.path,
            fileName: res.req.file.filename,
        })
    })
})

router.post('/', (req, res)=>{

    // 받아온 정보들을 DB에 넣어줄 것
    const product = new Product(req.body)
    product.save((err)=>{
        if(err) return res.status(400).json({success: false, err})
        return res.status(200).json({success: true})
    })
})

router.post('/products', (req, res)=>{

    let limit = req.body.limit ? parseInt(req.body.limit) : 20 //req.body.limit가 있으면 받고, 아니면 20
    let skip = req.body.skip ? parseInt(req.body.skip) : 0
    //product collection에 들어있는 모든 상품 정보 가져오기
    Product.find() // Product.find() : product collection안에 있는 모든 정보를 찾는 메소드
        .populate('writer') // writer가 가지고 있는 모든 정보 가져오기
        .skip(skip)
        .limit(limit)
        .exec((err, productInfo) => {
            if(err) return res.status(400).json({success:false, err})
            return res.status(200).json({success:true, productInfo})

        })

})

module.exports = router;
