require('dotenv').config();
const express = require('express');
const app = express();

//router require..
const homeRouter = require('./routers/home');
const adminPostRouter = require('./routers/contentPost');
const adminRouter = require('./routers/admin');

//cookieParser require..
const cookieParser = require('cookie-parser');



//DB connection..
require('./db/conn');



//path require..
const path = require('path');

const bodyParser = require('body-parser');
const multer = require('multer');
const GridFsStorage = require('multer-gridfs-storage');
const Grid = require('gridfs-stream');
const methodOverride = require('method-override');

//hbs require..
const hbs = require('hbs');

//Middleware
 app.use(bodyParser.json());
// app.use(methodOverride('_method'));

 app.use(bodyParser.json({limit:'50mb'})); 
app.use(bodyParser.urlencoded({extended:true, limit:'50mb'}));

app.use(cookieParser());






//port 
const port = process.env.PORT || 3000;


//path
const static_path = path.join(__dirname, "../public");
const views_path = path.join(__dirname, "../templates/views");
const partials_path = path.join(__dirname, "../templates/partials");

//set static path ..
app.use(express.static(static_path));

//set hbs..
app.set('view engine', 'hbs');
app.set('views', views_path);
hbs.registerPartials(partials_path);


//Routers...

app.use(homeRouter);
app.use(adminPostRouter);
app.use(adminRouter);





//listen..
app.listen(port, ()=>{
    console.log(`server running at port ${port}`);
})