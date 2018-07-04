const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/*var UserSchema = new Schema({
    
  fname: {
        type: String,
        required: true
    
    },
    email: {
        type: String,
        required:true, 
        unique: true
    },

    phone: {
      type: String,
      required: true
  },

    place: {
        type: String,
        required:true
    },
    password: {
        type: String, 
        required: true,
    },
    date: {
        type: Date, 
        default: Date.now
    },
                
});

// module.exports = 
mongoose.model('user', UserSchema);*/

var userSchema = new Schema({
    fname: String,
    lname: String,
    email: { type: String, unique: true },
    myroll: String,
    roles: [{ type: 'String' }],
    isVerified: { type: Boolean, default: false },
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date
  },);

 
var user=mongoose.model('user', userSchema);
module.exports=user