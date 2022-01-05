const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/blogweb',{
    stale: false,
    compatible: true,
    heartbeatFrequencyMS: 10000,
    localThresholdMS: 15,
    logicalSessionTimeoutMinutes: undefined,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=>{
    console.log(`connection successful..`);
}).catch((err)=>{
    console.log(err);
    console.log(`no connection`);
})