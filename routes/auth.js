const express=require('express')
const router = express.Router();
const app=express();
var bcrypt = require('bcryptjs');
const bodyparser=require('body-parser');

var User = require('../usermodel')
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());



router.post('/',(req,res) => {
    
  
    User.findOne({
        email:req.body.email,
        isVerified:true,

        
      },


      function(err, email) {
        if (err) throw err;
    
        if (!email) {
          messages = 'sorry account with specified email doesnt exist';
          res.render('login', { messages:messages });
        }
        else if (email)
        {
    
          //compare login password with password on database
          console.log(req.body.password);
           var pass= bcrypt.compareSync(req.body.password, email.password);
           console.log(pass);
            if (!pass) {
                messageinvalid = 'sorry invalid username or password';
                res.render('login', { messageinvalid:messageinvalid });
          }
          else if(pass){
            if(email.myroll==1){

              console.log(email.myroll);

              res.render('adminprofile');



            } else if(email.myroll==2){

              console.log(email.myroll);
              
              res.redirect('user');
            }
           
          }
    
        }
      })
    });

module.exports=router;