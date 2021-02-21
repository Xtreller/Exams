const userController = require('../controllers/userController');
const expenseController = require('../controllers/expenseController');
const auth = require('../middlewares/auth');

module.exports = (app) => {
  app.get('/',auth,(req,res,next)=>{
    res.render('./home/home.hbs')
  })
   
  app.get('about',auth,(req,res,next)=>{
    res.render('about')
  })
   
   app.get('/expenses',auth,expenseController.getExpenses);
   app.get('/report/:id',auth,expenseController.getReport);
   app.get('/newExpense',auth,expenseController.getNewExpense);
   app.post('/newExpense',auth,expenseController.postNewExpense);
   app.get('/delete/:id',auth,expenseController.deleteReport);
   
   
   app.get('/account/:id',auth,userController.getAccount);
   app.post('/refill/:id',auth,userController.refill);
   app.get('/register',userController.getRegister);
   app.post('/register',userController.postRegister);
   app.get('/login',userController.getLogin);
   app.post('/login',userController.postLogin);
   app.get('/logout',userController.logout);

   app.get('*',(req,res,next)=>{
    res.render('./home/404.hbs')
  });
 };
