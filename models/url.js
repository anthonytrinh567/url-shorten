var mongoose    = require('mongoose');
var shortid     = require('shortid');

var UrlSchema = new mongoose.Schema({
  url : String,
  shortUrl : {type: String, default : shortid.generate }
});

module.exports = mongoose.model("Url", UrlSchema);
