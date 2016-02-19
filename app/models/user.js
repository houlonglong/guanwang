// Example model  文章

var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

var UserSchema = new Schema({
  name: {type:String,require:true},
  eamil: {type:String,require:true},
  password: {type:String,require:true},
  created: {type:Date}

});

UserSchema.virtual('date')
  .get(function(){
    return this._id.getTimestamp();
  });

mongoose.model('User', UserSchema);

