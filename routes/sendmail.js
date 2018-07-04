var express=require('express');
var nodemailer = require("nodemailer");
var app=express();
var url=require('url');
var randtoken = require('rand-token');
var Token=require('../tokenmodel.js');
var User=require('../usermodel.js');
var crypto = require('crypto');
const bodyparser=require('body-parser');

var apps=require('../app.js')

//send mailhead and token generation
app.get('/',function(req,res){
    console.log('send');
    urlparse=url.parse(req.url,true);
    id = urlparse.query.id;
    var hashtoken = crypto.randomBytes(16).toString('hex');
    var tokens = new Token({ 
        _userId: id, 
        token: hashtoken 
    });
    tokens.save();
    urlparse = url.parse(req.url,true);
    emails=urlparse.query.emailid;
    console.log(emails);
    host=req.get('host');
    link="http://"+req.get('host')+"/verify?id="+hashtoken;
    nodemailer.createTestAccount((err, account) => {
        // create reusable transporter object using the default SMTP transport
        let transporter = nodemailer.createTransport({
            service: "Gmail",
            auth: {
                user: "bosetester19@gmail.com",
                //user: "sulfikarsulfi.n@gmail.com",
               pass: "zeusbomber"
                
            }
        });
    
       // var rand,mailOptions,host,link;
        let mailOptions = {
            from: '"User Veryfication " <sulfikarsulfi,n@gmail.com>', // sender address
            to: emails, // list of receivers
            //to: "sulfikarsulfi.n@gmail.com",
            subject: "Please confirm your Email account", // Subject line
            text: 'Hello ✔', // plain text body
            html: "Hello,<br> Please Click on the link to verify your email.<br><a href="+link+">Click here to verify</a>" // html body
        };
    
        // send mail with defined transport object
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
            update = 'You are registered now..Plz verify your email to log in...'; 
                    res.render('login',{update:update}) 
    
        });
    });
});

module.exports=app;