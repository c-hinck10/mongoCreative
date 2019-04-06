var mongoose = require('mongoose');
var SneakerSchema = new mongoose.Schema({
  name: {type: String, default: "No Shoe Name"},
  url: {type: String, default: "./No-image-found.jpg"},
  upvotes: {type: Number}
});

SneakerSchema.methods.upvote = function(cb) {
  this.upvotes += 1;
  this.save(cb);
};

SneakerSchema.methods.downvote = function(cb) {
  this.upvotes -= 1;
  this.save(cb);
};
mongoose.model('Sneaker', SneakerSchema);
