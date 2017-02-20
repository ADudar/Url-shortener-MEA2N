var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var linkSchema = new Schema({

  longUrl: {
    type: String,
    required: [true, 'Long url must exist'],
    unique: false,
    match: /^http/
  },
  shortUrl: {
    type: String,
    required: [true, 'Short url must exist'],
    unique: true
  },
  clicks: {
    type: Number,
    required: [true, 'Count clicks must exist'],
    default: 0,
    min:0

  },
  description: {
    type: String
  },
  tags: {
    type: Array,
    required: [true, 'Tags  must exist'],
    unique: false
  },
  user_id: {
    type: Schema.Types.ObjectId,
    required: [true, 'Link\'s user  must exist'],
    unique: false,
    index: true,
    select: false
  },
  created: {
    type: Date,
    default: Date.now(),
    select: false,
    required: false
  }
});

// var handleE11000 = function (error, res, next) {
//   if (error.name === 'MongoError' && error.code === 11000) {
//     next(new Error('This link is already exist!'));
//   } else {
//     next();
//   }
// };

// linkSchema.post('save', handleE11000);

var Link = mongoose.model('Link', linkSchema);

module.exports = Link;