var express = require('express'),
  router = express.Router(),
  mongoose = require('mongoose'),
  Post = mongoose.model('post'),
  Category = mongoose.model('category');

module.exports = function (app) {
  app.use('/admin/posts', router);
};

router.get('/', function (req, res, next) {
  var soretby = req.jquery.sortby ? req.query.sortby : 'created';
  var sortdir = req.jquery.sortdir ? req.query.sortdir : 'desc';



    Post.find({published:true})
      .sort(soretby)
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

        res.render('admin/post/', {
          title: 'Generator-Express MVC',
          posts: posts,
          pageNum:pageNum,
          pageCount:pageCount,
          pretty:true
    });
  });
});

router.get('/edit/:id', function (req, res, next) {

  });

router.post('/edit/:id', function (req, res, next) {

});
router.get('/delete/:id', function (req, res, next) {
      console.log(1111)
      if (!req.params.id) return next(new Error("没有该文章"));
      Post.remove({_id:req.params.id}).exec(function(err,rowsRemoved){
      if (err) return next(new Error(err));
      if(rowsRemoved){
        req.flash('success','文章删除成功');
      }else{
        req.flash('success','文章删除失败');
      }
        res.redirect("/admin/posts/")
      })

});








