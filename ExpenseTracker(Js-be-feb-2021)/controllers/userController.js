const userModel = require('../models/user');
const expenseModel = require('../models/expense');
const config = require('../config/config');
const salt = require('salt');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const saltRounds = 10;

function getRegister(req,res,next) {
    res.render('./user/register.hbs')
}

function postRegister(req,res,next) {
    const { username,email, password, repeatPassword,amount } = req.body;

    if (password !== repeatPassword) {
      res.render('./user/register.hbs', { err: 'Passwords and repeat-Password don\'t match!' });
      return;
    }
    let err = {messages:[]};
   if(username.length<4){
       err.messages.push("Username must be at least 4 charachters!");
   }
   if(password.length < 6 || password.length > 18){
       err.messages.push("Password must be at least 4 characters long");
   }
   if(+amount < 0)
   {
    err.messages.push("The amount  should be positive number (By default its 0(zero))");

   }
    
    userModel.exists({username:username})
    .then(exists=>{
        if(exists && !err.messages.includes("Username must be at least 4 charackters!")){
             err.messages.push('Username already exists!');
        }
        if(err.messages.length>0){
            res.render('./user/register.hbs',err);   
            return;
        }
        userModel.create({ username,email, password,amount})
    .then(() => { 
        res.redirect('/login');
        return;
     })
    .catch(e=>{
        if (!e.statusCode) {
            res.status(404).render('./home/404.hbs');
        }
    });    
    }) 
  } 
 
function getLogin(req,res,next) {
    res.render('./user/login.hbs')
}
function postLogin(req,res,next) {
     const {username,password} = req.body;
     userModel.findOne({username:username})
     .then(user=>{
         if(!user){
             return res.render('./user/login.hbs',{err:'User not found'})
         }
         else
         {
            bcrypt.compare(password,user.password)
            .then(match=>{
                if(!match){ res.render('./user/login.hbs',{err:"Invalid Username or Password!"}); return;}
                const token = jwt.sign({id:user._id},config.jwtSecret);
                console.log("Loged In!");
                res.cookie(config.authCookie,token).redirect('/expenses');
            });
            
         }
     }).catch(next);
}
function getAccount(req,res,next){
    const id = req.params.id;
    userModel.findById(id)
    .then(user=>
        {
            let total = 0;
            expenseModel.find({creator:user._id})
            .then(expenses=>{
                expenses.forEach(expense => {
                    total+=expense.total;
                });
                user.amount-=total;
                res.render('./user/account-info.hbs',{user,total})
            })
        })
    .catch(next)
}
function refill(req,res,next){
    const {amount} = req.body;
    userModel.updateOne({_id:req.params.id},{$inc : {amount : +amount}})
    .then(user=>{
        res.redirect('/expenses')
    })
    .catch(next)
}
function logout(req,res,next){
    res.clearCookie(config.authCookie);
    console.log('logged out!');
    res.redirect('/');
}


module.exports= {getRegister,postRegister,
                getLogin,postLogin,refill,
                getAccount,
                logout}
