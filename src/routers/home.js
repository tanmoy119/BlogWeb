const express = require('express');
const homeRouter = express.Router();
const topDivContent= require('../models/topDivContent');



homeRouter.get('/', async (req, res)=>{
    try {

        const data = await topDivContent.find({});
        res.status(200).render('index', {
            avatar1:data[0].avatar,
            heading1:data[0].heading,
            topic1:data[0].topic,


            avatar2:data[1].avatar,
            heading2:data[1].heading,
            topic2:data[1].topic,


            avatar3:data[2].avatar,
            heading3:data[2].heading,
            topic3:data[2].topic,


            avatar4:data[3].avatar,
            heading4:data[3].heading,
            topic4:data[3].topic


        });
    } catch (err) {
        res.status(400).send(err);
        console.log(err);
    }
})


homeRouter.get('/contactus', async (req, res)=>{
    try {
        res.render('contactus');
    } catch (err) {
        console.log(err);
    }
})

module.exports = homeRouter;