// Example model  文章

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var PostSchema = new Schema({
  title: {type:String,require:true},
  content: {type:String,require:true},
  slug: {type:String,require:true},
  category: {type:Schema.Types.ObjectId,ref:'category'},
  anthor: {type:Schema.Types.ObjectId,ref:'User'},
  published: {type:Boolean,require:true},
  meta: {type:Schema.Types.Mixed,require:true},
  comments: {type:Schema.Types.Mixed,require:true},
  created: {type:Date}

});

//PostSchema.virtual('date')
//  .get(function(){
//    return this._id.getTimestamp();
//  });

mongoose.model('post', PostSchema);

