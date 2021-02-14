const mongoose = require('mongoose');
// Title - string (required), unique
//  Description - string (required), max length of 50 symbols,
//  Image Url - string (required),
//  Is Public - boolean, default - false,
//  Created at – Date or String, required
//  Users Enrolled - a collection of Users

const courseSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        unique:true
    },
    description:{
        type:String,
        required:true,
        maxlength:50
    },
    imageUrl:{
        type: String,
        required:true,
    },
    isPublic:Boolean,
    createdAt:{ type: Date, default: Date.now },
    creatorId:{type: mongoose.Schema.Types.ObjectId, ref: 'user'},
    users: [{ type: mongoose.Schema.Types.ObjectId, ref: 'user' }]

})

module.exports = new mongoose.model('course', courseSchema);