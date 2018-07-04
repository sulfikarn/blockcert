var express = require('express')
//var register=require('./routes/register')


var flash = require('connect-flash-plus')
var bodyParser = require('body-parser');
const session = require('express-session');
const cookieParser = require('cookie-parser')
const passport =require('passport'); 
const mongoose = require('mongoose');
var path = require('path');





var app=express()


app.use(express.static(path.join(__dirname,'public')));

//Load Routes
const users = require('./routes/register');
const login = require('./routes/auth');
const mail=require('./routes/sendmail');
const verification=require('./routes/verify');
const Profile=require('./routes/profile');





//Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(session({ 
    key: 'user_sid', 
    secret: 'somerandonstuffs', 
    resave: false, 
    secure:false, 
    saveUninitialized: false, 
    cookie: { 
        expires: 600000 
    } 
}));
app.use(cookieParser())
app.use((req, res, next) => { 
    if (req.cookies.user_sid && !req.session.user) { 
        res.clearCookie('user_sid'); 
    } 
    next(); 
}); 



//Express session middleware
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: true
}));

var sessionChecker = (req, res, next) => { 
    if (req.session.user && req.cookies.user_sid) { 
        res.render('user'); 
    } else { 
        res.render('login'); 
    } 
};

app.use(flash());


//Map global promise - get rid of warning
mongoose.Promise = global.Promise;

//Connect to mongoose
mongoose.connect('mongodb://localhost:27017/users')
.then(() => console.log("MongoDB Connected..."))
.catch(err => console.log(err));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());


//set view engine to ejs

app.set('view engine', 'ejs');



//Get

app.get('/',function(req,res){
    res.render('index')
})

app.get('/about',function(req,res){
    res.render('about')
})

app.get('/register',function(req,res){
    res.render('register')
})

app.get('/login',function(req,res){
    res.render('login')
})

/*Session check*/

app.get('/user',sessionChecker,function(req,res){
    res.render('userprofile')
})

app.get('/admin',sessionChecker,function(req,res){
    res.render('adminprofile')
})


//Use routes
app.use('/register',users);
app.use('/auth',login);
app.use('/send',mail);
app.use('/verify',verification);
app.use('/profile',Profile);


 const port = 8080;

 app.listen(port, () => {
     console.log(`Server started on port ${port}`);
 });
 module.exports=app;