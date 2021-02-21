const config = require('../config/config');
const jwt = require('jsonwebtoken');
const user = require('../models/user'); 
const { jwtSecret } = config;

module.exports = function auth(req,res,next){
  const token= req.cookies[config.authCookie];
 if(!token){next();return;};
  const data = jwt.verify(token,config.jwtSecret,(err,decoded)=>{
    if(err){
      res.redirect('/login');
      next(err);
    }
    return decoded;
  });
  user.findById(data.id).then(user=>{   
  req.user = user._id;
  res.locals.isLogged = !!req.user;
  res.locals.user = user;
  next();
  }).catch(err =>{
    if(err)
    {
      res.redirect('/login');
      
    }
  })
  
}
