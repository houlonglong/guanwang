var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Post = mongoose.model('post');

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

        console.log(totalCount,pageCount,pageSize,pageNum);
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

router.get('/view', function (req, res, next) {

  });

router.get('/comment', function (req, res, next) {

});

router.get('/favourite', function (req, res, next) {

});






