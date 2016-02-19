/**
 * Created by houlonglong on 16/2/19.
 */
//随即插入文章数据
var loremIpsum = require('lorem-ipsum'),
    slug = require('slug'),
    config = require('./config/config'),
    glob = require('glob'),
     mongoose = require('mongoose');

mongoose.connect(config.db);
var db = mongoose.connection;
db.on('error', function () {
  throw new Error('unable to connect to database at ' + config.db);
});

var models = glob.sync(config.root + '/app/models/*.js');
models.forEach(function (model) {
  require(model);
});

var Post = mongoose.model('post');
var User = mongoose.model('User');
var Category = mongoose.model('category');

User.findOne(function(err,user) {
  if (err) {
    return console.log('cannot find user')
  }
  Category.find(function (err, categories) {
    if (err) {
      return console.log('cannot find categories')
    }

    categories.forEach(function (category) {
      for(var i= 0;i<35;i++){
        var title = loremIpsum({count: 1, units: 'sentences'});
        var post = new Post({
          title: title,
          slug: slug(title),
          content: loremIpsum({count: 20, units: 'sentences'}),
          category:category,
          anthor: user,
          published: true,
          meta: {favorites: 0},
          comments: [],
          created: new Date()
        });

        post.save(function (err, post) {
          // console.log('插入数据:' , err);
          console.log('插入数据:' , post.slug,err);
        });
      }

    }) ;
  })
})
