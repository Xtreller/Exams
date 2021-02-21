const mongoose = require('mongoose');

const expenseModel = new mongoose.Schema({
    merchant:{ type: String,required:true},
    total:{type:Number,required:true},
    category:{type:String,required:true,minlength:3,maxlength:30},
    description:{type:String,min:3,max:30},
    report:{type: Boolean, required:true ,default:false },
    creator: {type: mongoose.Types.ObjectId, ref:'User'}
});
module.exports = new mongoose.model('Expense',expenseModel);
