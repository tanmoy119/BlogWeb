const mongoose = require('mongoose');


const contentSchema = new mongoose.Schema({

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

const Content = new mongoose.model('Content',contentSchema);

module.exports = Content;

