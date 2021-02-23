const articles = require('../controllers/articles');
const user = require('../controllers/user');
const auth = require('../middlewares/auth');

module.exports = (app) => {

    app.get('/',articles.get.home);
    app.get('/create',auth,articles.get.create);
    app.post('/create',auth,articles.post.create);
    app.get('/edit/:id',auth,articles.get.edit);
    app.post('/edit/:id',auth,articles.post.edit);
    app.get('/article/:id',auth,articles.get.article);
    app.get('/articles',auth,articles.get.articles);
    app.get('/delete/:id',auth,articles.get.delete);

    app.get('/login',user.get.login);
    app.get('/register',user.get.register);
    app.post('/login',user.post.login);
    app.post('/register',user.post.register);
    app.get('/logout',user.get.logout);
    
    app.get('*',(req, res, next)=>{
            res.status(404).render('404.hbs');
       if (req.accepts('html')) {
          res.render('404', );
          return;
        }
    });
    
};