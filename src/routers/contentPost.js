const express = require('express');
const adminPostRouter = express.Router();
const Content = require('../models/content');
const topDivContent = require('../models/topDivContent')
//const upload = require('../middleware/upload');
const multer = require('multer');
const auth = require('../middleware/auth');
const adminContent = require('../models/admincontent');

//get json parmition..
adminPostRouter.use(express.json());




adminPostRouter.get('/contentPost', auth, async (req, res)=>{
    try {
        const data = await topDivContent.find({});
        res.render('contentPost'
        // , {
        //         avatar1:data[0].avatar,
        //         heading1:data[0].heading,
        //         topic1:data[0].topic,
    
    
        //         avatar2:data[1].avatar,
        //         heading2:data[1].heading,
        //         topic2:data[1].topic,
    
    
        //         avatar3:data[2].avatar,
        //         heading3:data[2].heading,
        //         topic3:data[2].topic,
    
    
        //         avatar4:data[3].avatar,
        //         heading4:data[3].heading,
        //         topic4:data[3].topic
        // }
        );
        //const content = await Content.find();
        // res.send(content);
        // res.status(200).send('admin post Page');

    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
})  

adminPostRouter.get('/contents', async (req, res)=>{
    try {
        const num1 = req.query.limit;
        const curId = req.query.id;
    var num= parseFloat(num1);
    var skipv= parseInt(curId);

       const data = await Content.find({}).limit(num).skip(skipv);
       res.send(data);

    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
})

adminPostRouter.get('/topDivContent', auth, async (req, res)=>{
    try {

        res.render("topdiv");
    

    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
})


//uplods


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'public/img/')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage });

//Admin content Post..
//POST ..
adminPostRouter.post('/contentPost', upload.single('uploaded_file'),auth, async  (req, res)=> {
  try {
            const data = req.userData;
            const addData = new adminContent({
                heading:req.body.heading,
                body:req.body.body,
                avatar:req.file.filename,
                writer:data.name,
                comment:req.body.comment
            });
            //console.log(addData);
            const saveData = await addData.save();
            res.render('contentPost');
        } catch (err) {
            console.log(err);
        }
   //console.log(req.file, req.body)
  // res.render('contentPost')
});

adminPostRouter.post('/topDivContent', upload.single("uploaded_file"), async (req, res)=>{
    try {

       const addData = new topDivContent({
           topic:req.body.topic,
           heading:req.body.heading,
           avatar:req.file.filename
        });
       console.log(addData);
       const saveData = await addData.save();
       res.render('topdiv');

    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
})

//Content post..
//adminPostRouter.post('./admin')



//profile Timeline.......

adminPostRouter.get('/timelinecontents',auth, async (req, res)=>{
    try {
        const udata = await req.userData;
        const writer = udata.name;
        const num1 = req.query.limit;
        const curId = req.query.id;
    var num= parseFloat(num1);
    var skipv= parseInt(curId);

       const data = await Content.find({writer}).limit(num).skip(skipv);
      // console.log(data.writer);
       res.send(data);

    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
})






module.exports = adminPostRouter;