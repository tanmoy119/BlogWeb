const express= require('express');
const adminRouter = express.Router();
const user = require('../models/user');
const auth = require('../middleware/auth');
const loginauth = require('../middleware/loginauth');
const multer = require('multer');
const adminContent = require('../models/admincontent');
const content = require('../models/content');
//const url = require('url');

//adminRouter.use(express.json());


// adminRouter.post('/login', async (req, res)=>{
//      try {
//           //res.send('Login page');
//           const adata = new user({
//                email:req.body.email,
//                password:req.body.password
//           })
//           console.log(adata);
//           const sdata= await adata.save();
//           res.send(sdata);

//      } catch (err) {
//           console.log(err);
          
//      }
     
// })

adminRouter.get('/admin', auth, async (req, res)=>{
     try {
          const data = req.userData;
          if (data.name == "Tanmoy Barman" || data.name == "Sankhadeep Mondal") {
               res.render('admin',{
                    avatar:data.avatar
               });
          } else {
           res.redirect('./profile');    
          }
     } catch (err) {
          console.log(err); 
     }
})

//admin Post..

adminRouter.get('/delete/:id', auth, async (req, res)=>{
     try {
          const id = req.params.id;
          const response = await adminContent.find({_id:id});
          const data = await JSON.stringify(response);
          console.log(data);
          console.log(data.body);

          const addData = new content({
               heading:data.heading,
               body:data.body,
               avatar:data.avatar,
               writer:data.writer
           });
           console.log(addData);
           const saveData = await addData.save();
           console.log(saveData);
          // const ddata= await adminContent.deleteOne({_id:id});
          res.redirect('/admin');
     } catch (err) {
          console.log(err); 
     }
})

adminRouter.get('/adminContent', auth, async (req, res)=>{
     try {
          // const udata = await req.userData;
          // const writer = udata.name;
          const num1 = req.query.limit;
          const curId = req.query.id;
      var num= parseFloat(num1);
      var skipv= parseInt(curId);
  
         const data = await adminContent.find({}).limit(num).skip(skipv);
         res.send(data);
     } catch (err) {
          console.log(err); 
     }
})

adminRouter.get('/profile', auth, async (req, res)=>{
     try {
          const data = req.userData;
          res.render('profile',{
               userid:data.userid,
               name:data.name,            
               email:data.email,
               avatar:data.avatar,
               profession:data.profession,
               number:data.number,
               country:data.country


          });
     } catch (err) {
          console.log(err);
     }
})





//login...

adminRouter.post('/login', async (req, res)=>{
     try {
          const email = req.body.email;
          const password = req.body.password;
          const data = await user.findOne({email});


          if (data.password === password) {
               const token = await data.generateAuthToken();
          res.cookie('jwt',token,{
              // expires:new Date(Date.now() +30000),
               httpOnly:true
          });
               res.redirect('/profile');
          } else {
               res.send('invalid login details')
          }

          // console.log(data.email);
          // console.log(data.password);

     } catch (err) {
          console.log(err);
          
     }
     
})
adminRouter.get('/login', loginauth, async (req, res)=>{
     try {
          res.render('login');
          
     } catch (err) {
          console.log(err);
          res.status(401).send(err);
          
     }
     
     
     
})

//logout...

adminRouter.get('/logout', auth,async (req, res)=>{
     try {

          req.userData.tokens = req.userData.tokens.filter((currentElement)=>{
               return currentElement.token != req.token
          })
          res.clearCookie("jwt");
          await req.userData.save();
          res.redirect('/login');
     } catch (err) {
          console.log(err);
     }
})


//uplods


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


//Register...

adminRouter.get('/register',loginauth, async (req, res)=>{
     try {
          res.render('register');
     } catch (err) {
          console.log(err);
     }
})

adminRouter.post('/register', upload.single('uploaded_file'), async (req, res)=>{
     try {
            // console.log(req.body.urname);
         // console.log(req.body.name);
         // console.log(req.file.filename);
        const pass = req.body.pass;
        const cpass = req.body.cpass;
        if(pass === cpass){
        const adata = new user({
            name: req.body.name,
            userid: req.body.urname,
            number:req.body.number,
            email:req.body.email,
            password:req.body.pass,
            profession:req.body.profession,
            avatar:req.file.filename,
            country:req.body.country
        })

        const token = await adata.generateAuthToken();
        //console.log(token);

        res.cookie('jwt',token,{
           httpOnly:true
      });

        const sdata = await adata.save();
        console.log(sdata);
        res.status(200).redirect('/login');
      }
    else{
          res.send('password and conform passwor are not match.');
    }
     } catch (err) {
          console.log(err);
     }
})


//editProfile... .. .. .

adminRouter.get('/profile/editprofile', auth,async (req, res)=>{
     try {
          const data = await req.userData;
          res.render('editprofile',{
               name:data.name,
               email:data.email,
               number:data.number,
               avatar:data.avatar,
               profession:data.profession,
               userid:data.userid,
               country:data.country
               
               
          });
     } catch (err) {
          console.log(err);
     }
})



module.exports = adminRouter;