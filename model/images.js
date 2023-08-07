const mongoose = require('mongoose')
const image =new mongoose.Schema({
    img:{
        type: String
    },
    imgId:{
        type: String
    }
})

module.exports=mongoose.model('image',image);