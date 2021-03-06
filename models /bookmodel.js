const mongoose = require('mongoose')
const path = require('path')

const CoverImageBasePath = 'uploads/bookCovers'

const bookSchema = new mongoose.Schema({
        
    title : {
        type : String,
        required : true 
    },
    description : {
        type : String,
    },
    publishDate : {
        type : Date,//famma type date yaani remember it 
        required : true 
    },
    pageCount : {
        type : Number,
        required : true
    },
    createdAt : {
        type : Date, 
        required : true,
        default : Date.now //this will insert the actual date by default 
    },
    CoverImageName : {
        type : String, //storing only a little string (name of the image ) and storing the string in a server
        required : true 
    },
    author : {
        type : mongoose.Schema.Types.ObjectId,
        required : true ,
        ref : 'Author'//this name has to match the name set for the model
        }
    })

bookSchema.virtual('coverImagePath').get(function() {
if(this.CoverImageName != null){
return path.join('/',CoverImageBasePath,this.CoverImageName)
}
})

// Author is the name of the model(database table )with the authorschema as a schema
// the same cycle here need to export it and then require it to the routing page in which u need it 
module.exports = mongoose.model('Book',bookSchema)
module.exports.CoverImageBasePath = CoverImageBasePath