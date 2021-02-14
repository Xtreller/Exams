const courseModel = require('../models/course');
const userModel = require('../models/user');
const mongoose = require('mongoose');

module.exports = {
    get:{
        
        create:(req,res,next)=>{
            res.render('./coursePages/create-course.hbs');
        },
        details:(req,res,next)=>{
            let isEnrolled = false;
            let isCreator;
            courseModel.findById(req.params.id)
            .then(course=>{
                
                isCreator = course.creatorId.toString() === req.user._id.toString();
                isEnrolled = course.users.includes(req.user._id);
               
                if(isCreator){

                    res.render('./coursePages/course-details.hbs',{course,isEnrolled,isCreator});
                    return;
                }
                else{
                    if(isEnrolled)
                    res.render('./coursePages/course-details.hbs',{course,isEnrolled,isCreator});
                    return;
                }}).catch(next);
        },
        edit:(req,res,next)=>{
            courseModel.findById(req.params.id)
            .then(course=>{
                res.render('./coursePages/edit-course.hbs',course);
            })
            .catch(next);
        },delete:(req,res,next)=>{
            courseModel.deleteOne({_id:req.params.id})
            .then(deleted=>{
                console.log(deleted);
                res.redirect('/')
            }).catch(next);
        }
        
    },
    post:{
        create:(req,res,next)=>{
            let {title,description,imageUrl,isPublic} = req.body;
            
            courseModel.create({title,description,imageUrl,isPublic:( isPublic ? true:false),creatorId:req.user})
            .then(()=>{
                res.redirect('/');
            }).catch(next);

        },
        edit:(req,res,next)=>{
            const courseId = req.params.id;
            const {title,description,imageUrl,isPublic} = req.body;
            courseModel.updateOne({_id:courseId},{title,description,imageUrl,isPublic:(isPublic?true:false)})
            .then(updated => {
                res.redirect('/course/details/' + courseId);
            })
            .catch(next);
        },
        enroll:(req,res,next)=>{
            const courseId = req.params.id;
            const userId = req.user;
            
            Promise.all([
                userModel.updateOne({ _id: userId }, { $push: { courses: courseId } }),
                courseModel.updateOne({ _id: courseId }, { $push: { users : userId } })
              ])
                .then(() => {
                  res.redirect('/course/details/' + courseId);
                }).catch(next);
            }
    }
}