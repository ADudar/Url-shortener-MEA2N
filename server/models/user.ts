import { Schema, model } from 'mongoose';
import { hash, genSalt } from 'bcryptjs';
const SALT_WORK_FACTOR = 10;

const userSchema = new Schema({
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
    trim: true,
    minlength: 4,
    maxlength: 20
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 20,
    select: false
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
  const user = this;

  genSalt(SALT_WORK_FACTOR, (err, salt) => {
    if (err) {
      return next(err);
    }
    hash(user.password, salt, (error, hash) => {
      if (error) {
        return next(error);
      }
      user.password = hash;
      user.salt = salt;
      next();
    });
  });
});

const User = model('User', userSchema);
export { User }
