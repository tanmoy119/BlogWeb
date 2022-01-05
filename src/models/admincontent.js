const mongoose = require('mongoose');


const adminContentSchema = new mongoose.Schema({

    heading:{
        type:String
    },
    body:{
        type:String
    },
    avatar:{
        type:String
    },
    writer:{
        type:String
    },
    comment:{
        type:Number,
        default:0
    },
    date:{
        type:Date,
        default: Date.now
    }
})

const adminContent = new mongoose.model('Admincontent',adminContentSchema);

module.exports = adminContent;

