var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Post = mongoose.model('post');

module.exports = function (app) {
  app.use('/posts', router);
};

router.get('/', function (req, res, next) {

  Post.find().populate('anthor').populate('category').exec(function (err, posts) {

    //返回数据
    //return res.json(posts);
   console.log(posts)
    if (err) return next(err);
    res.render('blog/index', {
      title: 'Generator-Express MVC',
      posts: posts,
      pretty:true
    });
  });
});

router.get('/view', function (req, res, next) {

  });

router.get('/comment', function (req, res, next) {

});

router.get('/favourite', function (req, res, next) {

});






