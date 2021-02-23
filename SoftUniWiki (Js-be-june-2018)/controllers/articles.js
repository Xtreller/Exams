const articleModel = require('../models/article');

module.exports ={
    get:{
        home:(req,res,next)=>{
            
            articleModel.find({})
            .sort({date: 'desc'})
            .lean()
            .then(articles=>{
                
                let latest = articles.slice(0,3);
                res.render('index.hbs',{latest});
            })
            .catch(next)
        },
        create:(req,res,next)=>{
            res.render('create.hbs')
        },
        
        edit:(req,res,next)=>{
            
            articleModel.findOne({_id:req.params.id})
            .then(article=>{
                res.render('edit',article);
            })
        },
        article:(req,res,next)=>{
            articleModel.findOne({_id:req.params.id})
            .then(article=>{
                if(!article){
                    return res.render('404',{errMessage:'Article doesnt exist or have been removed'})
                }
                let paragraphs = [];
                console.log(article.description.split('\r\n'));
                article.description.split('\r\n').forEach(paragraph => {
                    paragraphs.push(paragraph);
                });
                article.description = paragraphs;
                    res.render('article.hbs',article);
            }).catch(next);
        },
        articles:(req,res,next)=>{
            articleModel.find({}).lean()
            .then(articles => {
            //   console.log(articles.map(article=> console.log(article.title)));
              res.render('all-articles.hbs', {articles});
            })
            .catch(next);
        },
        delete:(req,res,next)=>{
            articleModel.deleteOne({_id:req.params.id})
            .then(() => {
                res.redirect('/');
                console.log('deleted Successfuly')
            })
            .catch(next);
        }
    },
    post:{
        create:(req,res,next)=>{
            let err = {messages:[]};
            const {title,description} = req.body;

            
        if(title.length < 4) 
        {
         err.messages.push("The title should be at least 4 characters long");        
        }
        if(description.length < 20) 
        {
         err.messages.push("The description should be at least 20 characters long");
        }
        if(err.messages.length>0){
            res.render('create',err);   
            return;
        }
            articleModel.create({title,description,author:req.user})
            .then(()=>{
                res.redirect('/articles');
            }).catch(next);
        },
        
        edit:(req,res,next)=>{
            const articleId = req.params.id;
            const {title,description} = req.body;
            articleModel.updateOne({_id:articleId},{title,description})
            .then(updated=>{
                res.redirect('/article/'+articleId);
            })
        },
        delete:(req,res,next)=>{
            articleModel.deleteOne({_id:req.params.id})
            .then(() => {
                res.redirect('/');
                console.log('deleted Successfuly')
            })
            .catch(next);
        }
    },
}