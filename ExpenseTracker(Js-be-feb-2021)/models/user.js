const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;
 
const userModel = new mongoose.Schema({
    username:{type: String,
       require:true,
      minlength:4},
    password:{type:String , 
      required:true,
      minlenght:4},
    amount:{type: Number , required: true , default: 0},
    expenses: [{type: mongoose.Types.ObjectId, ref:'Expenses'}]
});


userModel.pre('save', function (done) {
    const user = this;
  
    if (!user.isModified('password')) {
      done();
      return;
    }
  
    bcrypt.genSalt(saltRounds, (err, salt) => {
      if (err) { done(err); return; }
      bcrypt.hash(user.password, salt, (err, hash) => {
        if (err) { done(err); return; }
        user.password = hash;
        
        done();
      });
    });
  });

module.exports = new mongoose.model('User',userModel);