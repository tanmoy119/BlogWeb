const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tanmoy11:wMEFOtFzAMGUFWcf@cluster0.xe3lz.mongodb.net/blogweb?retryWrites=true&w=majority').then(()=>{
    console.log(`connection successful..`);
}).catch((err)=>{
    console.log(err);
    console.log(`no connection`);
})