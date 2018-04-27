'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var JokesSchema = new Schema({
  user: String,
  text: String,
  likesCount: Number,
  commentsCount: Number,
  versionDate:Number
});

module.exports = mongoose.model('Joke', JokesSchema);