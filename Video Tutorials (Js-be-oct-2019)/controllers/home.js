const courseModel = require('../models/course');

module.exports = {
    get:{
        home:(req,res,next)=>{
            if(res.locals.isLogged){
            courseModel.find({})
            .then(courses=>{
                    res.render('./homePages/user-home.hbs',{courses});
                    return;
             }).catch(next);
            }
            else{
            courseModel.find({isPublic:true})
            .then(courses=>{
                console.log(courses)
                res.render('./homePages/guest-home.hbs',{courses});
                return;
         }).catch(next);
            
            }
        }
    }
}