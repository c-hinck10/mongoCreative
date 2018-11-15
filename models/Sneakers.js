var mongoose = require('mongoose');
var SneakerSchema = new mongoose.Schema({
  name: {type: String, default: "No Name Provided"},
  url: {type: String, default: "/stylesheets/No-image-found.jpg"},
  upvotes: {type: Number, default: 0},
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
