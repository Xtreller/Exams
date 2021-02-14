const userModel = require('../models/user');
const config = require('../config/config');
const jwt = require('jsonwebtoken');
const {authCookie,jwtSecret} = config;

module.exports = {
    get:{
        login:(req,res,next)=>{
            res.render('./userPages/login.hbs');
        },
        register:(req,res,next)=>{
            res.render('./userPages/register.hbs')
        },
        logout:(req,res,next)=>{
            res.clearCookie(authCookie);
            console.log('logged out!');
            res.redirect('/');
        }   
    },
    post:{
        login:(req,res,next)=>{
            const { username, password } = req.body;
            userModel.findOne({ username })
              .then(user => Promise.all([user, user ? user.comparePasswords(password) : false]))
              .then(([user, match]) => {
                if (!match) {
                  res.render('../user/login', { errorMessage: 'Wrong username or password' });
                  return;
                }
                return jwt.sign({ userId: user._id }, jwtSecret);
              })
              .then(jwtToken => {
                res.cookie(authCookie, jwtToken, { httpOnly: true });
                res.redirect('/');
              })
              .catch(next);
        },
        register:(req,res,next)=>{
            const {username,password,repeatPassword} = req.body;
            if(password === repeatPassword ){
                userModel.create({username,password,repeatPassword})
                .then(newUser=>{
                    console.log(newUser);
                    res.redirect('/user/login');
                    return;
                })
                .catch(next);
            }
        }
    }
}