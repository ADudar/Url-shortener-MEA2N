var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;
var Schema = mongoose.Schema;

var userSchema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  username: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim : true,
    minlength:4,
    maxlength:20
  },
  password: {
    type: String,
    required: true,
    minlength:8,
    maxlength:20,
    select : false
  },
  salt: {
    type: String,
    required: false,
    select: false
  }
  //   ,
  //   admin: Boolean,
  //   created_at: Date,
});

userSchema.pre('save', function (next) {
  var user = this;

  bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, (err, hash) => {
      if (err) {
        return next(err);
      }
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

var User = mongoose.model('User', userSchema);

module.exports = User;