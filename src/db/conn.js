const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tanmoy119:tanmoy@atlas5678@cluster0.xe3lz.mongodb.net/blogweb?retryWrites=true&w=majority').then(()=>{
    console.log(`connection successful..`);
}).catch((err)=>{
    console.log(err);
    console.log(`no connection`);
})