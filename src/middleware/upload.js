const express = require('express');
const multer = require('multer');

// const app = express(); 
// const bodyParser = require('body-parser');            
// app.use(bodyParser.json({limit:'50mb'})); 
// app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));



// const storage = multer.diskStorage({
//     destination: (req, file, cb) =>{
//         cb(null,'./images' )
//     },

//     filename: (req, file, cb)=>{
//         cb(null, Date.now() + '--' + file.originalname)
//     }
// });

// const upload = multer({ 
//     storage: storage
//  });

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img2/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage });

module.exports = upload;