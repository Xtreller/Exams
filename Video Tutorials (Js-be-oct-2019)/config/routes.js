const controllers = require('../controllers');
const auth = require('../middlewares/auth');

module.exports = (app) => {
    app.get('/course/create',controllers.course.get.create);
    app.post('/course/create',controllers.course.post.create);
    app.use('/course/details/:id',auth,controllers.course.get.details);
    app.get('/course/edit/:id',auth,controllers.course.get.edit);
    app.post('/course/edit/:id',auth,controllers.course.post.edit);
    app.get('/course/delete/:id',auth,controllers.course.get.delete);
    app.get('/course/enroll/:id',auth,controllers.course.post.enroll);

    
    app.get('/user/login',controllers.user.get.login );
    app.post('/user/login',controllers.user.post.login );
    app.get('/user/register',controllers.user.get.register );
    app.post('/user/register',controllers.user.post.register);
    app.get('/user/logout',controllers.user.get.logout);

    app.use('/',auth,controllers.home.get.home);
    app.use('*',(req, res, next)=>{
        res.status(404).render('404.hbs');
       if (req.accepts('html')) {
          res.render('404', { url: req.url });
          return;
        }
    });
    
};