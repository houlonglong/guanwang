var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  post = mongoose.model('post');

module.exports = function (app) {
  app.use('/admin', router);
};

router.get('/', function (req, res, next) {
  post.find(function (err, posts) {
    if (err) return next(err);
    res.render('admin/index', {
      title: 'Generator-Express MVC',
      posts: posts,
      pretty:true
    });
  });
});







