const mongoose = require('mongoose');



const topDivContentSchema = new mongoose.Schema({
    topic:{
        type:String
    },
    heading:{
        type:String
    },
    avatar:{
        type:String
    }

})

const topDivContent = new mongoose.model('topDivContent', topDivContentSchema);

module.exports = topDivContent;