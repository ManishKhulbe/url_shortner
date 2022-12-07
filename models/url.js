const mongoose = require('mongoose')
const Schema = mongoose.Schema


const shortUrlSchema = new Schema({

    url:{
        type : String,
        required : true
    },
    shortId :{
        type: String,
        required : true
    }
})

const shortUrl = mongoose.model('shortUrl' , shortUrlSchema)

module.exports = shortUrl