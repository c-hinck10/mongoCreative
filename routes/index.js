var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var Sneaker = mongoose.model('Sneaker');

router.get('/sneakers', function(req, res, next) {
  Sneaker.find(function(err, sneakers){
    if(err){ return next(err); }
    res.json(sneakers);
  });
});

router.post('/sneakers', function(req, res, next) {
  var sneaker = new Sneaker(req.body);
  sneaker.save(function(err, sneaker){
    if(err){ return next(err); }
    res.json(sneaker);
  });
});

router.param('sneaker', function(req, res, next, id) {
  var query = Sneaker.findById(id);
  query.exec(function (err, sneaker){
    if (err) { return next(err); }
    if (!sneaker) { return next(new Error("can't find sneaker")); }
    req.sneaker = sneaker;
    return next();
  });
});

router.get('/sneakers/:sneaker', function(req, res) {
  res.json(req.sneaker);
});

router.put('/sneakers/:sneaker/upvote', function(req, res, next) {
  req.sneaker.upvote(function(err, sneaker){
    if (err) { return next(err); }
    res.json(sneaker);
  });
});

router.put('/sneakers/:sneaker/downvote', function(req, res, next) {
  req.sneaker.downvote(function(err, sneaker){
    if (err) { return next(err); }
    res.json(sneaker);
  });
});

router.delete('/sneakers/:sneaker', function(req, res) {
  console.log("in delete");
  req.sneaker.remove();
  res.sendStatus(200);
});


module.exports = router;
