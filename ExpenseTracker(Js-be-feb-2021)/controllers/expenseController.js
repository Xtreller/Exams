const expenseModel = require('../models/expense');
const userModel = require('../models/user');

function getExpenses(req,res,next) {
    expenseModel
    .find({creator:req.user})
    .then(
        expenses =>{
        res.render('./expenses/expenses.hbs',{expenses,userId:req.user});
    })
    .catch(next);
}
function getReport(req,res,next) {
    const id = req.params.id;
    expenseModel.findById(id)
    .then(report=>{
        console.log(report);
        res.render('./expenses/report.hbs',report);
    })
    .catch(next)
}
function getNewExpense(req,res,next) {
    res.render('./expenses/new-expense.hbs')

}
function postNewExpense(req,res,next){
    const {merchant,total,category,description,report} = req.body;
    
    let err = {messages:[]};

    if(merchant.length < 4) 
    {
     err.messages.push("The merchant name should be at least 4 characters long");
 
    }
    if(+total < 0) 
    {
     err.messages.push("The total should be positive number");
    }
    if(description.length < 3 || description.length >30) 
    {
     err.messages.push("The description should be minimum 3 characters long and 30 characters maximum");
    }
    if(err.messages.length>0){
        res.render('./expenses/new-expense.hbs',err);   
        return;
    }
    

    expenseModel.create({merchant,total,category,description,report:( report ? true:false),creator:req.user})
    .then(expense=>{
        userModel.updateOne({_id:expense.creator},
            { $push: { expenses: expense } })
        .then(()=>{
            res.redirect('/expenses')
            next()})
    })
    .catch(next)
    
    
}
function deleteReport(req,res,next){
    const id = req.params.id;
    expenseModel.deleteOne({_id:id})
    .then(()=>{
        console.log("deleted");
        res.redirect('/expenses');
    })
    .catch(next)
}
module.exports = {getExpenses,
    getReport,
    getNewExpense,postNewExpense,
    deleteReport,
}