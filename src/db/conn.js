const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blogweb').then(()=>{
    console.log(`connection successful..`);
}).catch((err)=>{
    console.log(err);
    console.log(`no connection`);
})