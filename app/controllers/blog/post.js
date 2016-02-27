var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Post = mongoose.model('post'),
  Category = mongoose.model('category');

module.exports = function (app) {
  app.use('/posts', router);
};

router.get('/', function (req, res, next) {

  Post.find({published:true})
      .sort('category')
      .populate('anthor')
      .populate('category')
      .exec(function (err, posts) {

       //返回数据
       //return res.json(posts);

        if (err) return next(err);
        //分页

        var pageNum = Math.abs(parseInt(req.query.page || 1)) ;  //页数
        var pageSize = 10;  //一页展示10条
        var totalCount = posts.length //文增总数
        var pageCount = Math.ceil(totalCount/pageSize);//多少页

        if(pageNum > pageCount){
            pageNum = pageCount;
        }

        //console.log(totalCount,pageCount,pageSize,pageNum);
        var posts = posts.slice((pageNum - 1)*pageSize,pageNum*pageSize-1);
        //console.log(posts);

        res.render('blog/index', {
          title: 'Generator-Express MVC',
          posts: posts,
          pageNum:pageNum,
          pageCount:pageCount,
          pretty:true
    });
  });
});

router.get('/view/:id', function (req, res, next) {

  if(!req.params.id) return next(new Error('没有该文章的id'));

  var conditions = {};
  try {
    conditions._id = mongoose.Types.ObjectId(req.params.id)
  }catch(err){
    conditions.slug = req.params.id
  }
  Post.findOne(conditions)
    .populate('category')
    .populate('anthor')
    .exec(function (err, post) {
      console.log(post)
      if (err) {

        return next(err);
      }

      res.render('blog/view', {
        post: post,
      });
    });

  });

router.get('/category/:name', function (req, res, next) {
      //res.jsonp(req.params)
  Category.findOne({name:req.params.name}).exec(function(err,category){
    if(err) return next(err)
    Post.find({category:category,published:true})
        .sort('created')
        .populate('category')
        .exec(function(err,posts){
          if(err) return next(err)
          res.render('blog/category',{
            posts:posts,
            category:category,
            pretty:true
          })
        });
  })
});

router.get('/favourites/:id', function (req, res, next) {
  if(!req.params.id) return next(new Error('没有该文章的id'));

  var conditions = {};
  try {
    conditions._id = mongoose.Types.ObjectId(req.params.id)
  }catch(err){
    conditions.slug = req.params.id
  }
  Post.findOne(conditions)
    .populate('category')
    .populate('anthor')
    .exec(function (err, post) {
      console.log(post)
      if (err) {

        return next(err);
      }
      post.meta.favourites = post.meta.favourites ? post.meta.favourites + 1 : 1;
      post.markModified('meta');
      post.save(function(err){
        //res.render('blog/view', {
        //  post: post,
        //});
        //跳回页面
        res.redirect('/posts/view/'+post.slug)
      })

    });
});
router.post('/comment/:id', function (req, res, next) {
    //return res.jsonp(req.body)
  if(!req.body.email) return next(new Error('没有评论 的邮件地址'));
  if(!req.body.content) return next(new Error('没有评论的内容'));

  var conditions = {};
  try {
    conditions._id = mongoose.Types.ObjectId(req.params.id)
  }catch(err){
    conditions.slug = req.params.id
  }
  Post.findOne(conditions)
    .exec(function (err, post) {
      console.log(post)
      if (err) {

        return next(err);
      }
      var comment = {
        email:req.body.email,
        content:req.body.content,
        created:new Date()
      };
      post.comments.unshift(comment);
      post.markModified('comments')
      post.save(function(err,post){
        req.flash('info', '评论添加成功!')
        //跳回页面
        res.redirect('/posts/view/'+post.slug)
      })

    });
});








