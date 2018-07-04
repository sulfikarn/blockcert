var bcrypt = require('bcryptjs');

const express=require('express')
const passport = require('passport');
const router = express.Router();
const mongoose = require('mongoose');

const nodemailer = require('nodemailer');

const bodyparser=require('body-parser');

//var randtoken = require('rand-token');
//var crypto = require('crypto');


//Load User model
const user=require('../usermodel');//extra . since we are outside the folder
const User = mongoose.model('user');

//Registration Form post
router.post('/',(req,res) => {
  var post=req.body;
  let errors = [];

  if(req.body.password != req.body.cpassword){
      errors.push({text:'Passwords do not match'});
  }

  if(req.body.password.length < 5)
  {
      errors.push({text:'Password must be at least 5 characters'});
  }

  if(errors.length > 0){
      res.render('register', {
          errors: errors,
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          myroll: req.body.myroll,
          password: req.body.password,
          cpassword: req.body.cpassword
      });
  } else{
      const newUser = {
          fname: req.body.fname,
          lname: req.body.lname,
          email: req.body.email,
          phone: req.body.phone,
          myroll: req.body.myroll,
          password: req.body.password,
          cpassword: req.body.cpassword
      }

      user.findOne({'email':post.email},function(err,user){ 
        if (user) { 
     
            update = 'sorry email'+' '+post.email+' '+'exist,try another'; 
            res.render('register',{update:update}) 
          } 
        });

      bcrypt.genSalt(9,(err, salt) => {
          bcrypt.hash(newUser.password, salt, (err, hash) => {
              if(err)
                  throw err;
              newUser.password = hash;
              new User(newUser)

              .save()
                  .then(user => {
                    res.writeHead(302, {'Location': 'http://127.0.0.1:8080/send?emailid='+req.body.email+'&id='+user._id});
                    res.end();
                    console.log('writeheadlink');
                    //req.flash('success_msg', 'You are registered now..Plz verify your email to log in...');

                    update = 'You are registered now..Plz verify your email to log in...'; 
                    res.render('login',{update:update}) 

                      //res.redirect('/login');
                  })
                  .catch(err => {
                      console.log(err);
                      return;
                  });
               
          });
      });
  }
});
module.exports=router;

 