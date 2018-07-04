var express=require('express');
var app=express();
var url=require('url');
var Token=require('../tokenmodel.js')
var user=require('../usermodel.js')
app.get('/',(req,res) => {
  urlparse=url.parse(req.url,true);
  id=urlparse.query.id;
  Token.findOne({ token: id }, function (err, token) {

        if (!token) return res.status(400).send({ type: 'not-verified', msg: 'We were unable to find a valid token. Your token my have expired.' });
        user.findOne({ _id:token._userId }, function (err, user) {
                 if(user){
                   user.isVerified = true;
                   user.save();
                   console.log(user);
                   req.flash('success_msg', 'Email verified successfully...Login to activate your account...');
                   res.render('login',{success_msg:'Email verified successfully...Login to activate your account...'});
                 }
                    if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.' });
                  });


});

});
module.exports=app;