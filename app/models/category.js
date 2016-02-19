// Example model  文章

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var CategorySchema = new Schema({
  name: {type:String,require:true},
  body: {type:String,require:true},
  created: {type:Date}

});

CategorySchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('category', CategorySchema);

