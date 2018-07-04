const express =require('express');

const app =express();

const router = express.Router();

var User = require('../usermodel')

router.get('/',(req,res) => {

    res.render('profile')

});

module.exports=router