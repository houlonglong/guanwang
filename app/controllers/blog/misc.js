var express = require('express'),
  router = express.Router();

module.exports = function (app) {
  app.use('/', router);
};

router.get('/', function (req, res, next) {
  //Post.find().populate('anthor').populate('category').exec(function (err, posts) {
  //  //返回数据
  //  // return res.json(posts);
  // // console.log(posts)
  //  if (err) return next(err);
  //  res.render('blog/index', {
  //    title: 'Generator-Express MVC',
  //    posts: posts,
  //    pretty:true
  //  });
  //});
  res.redirect('/posts')
});

router.get('/about', function (req, res, next) {
    res.render('blog/index', {
      title: 'about',
      pretty:true
    });
  });

router.get('/contact', function (req, res, next) {
  res.render('blog/index', {
    title: 'contact',
    pretty:true
  });
});





