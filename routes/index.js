var express = require('express');
var router = express.Router();
var Url = require('../models/url');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/*/', function(req, res, next) {
  var originalUrl = req.params[0];
  //console.log(originalUrl);
  //console.log(originalUrl.split('.'));
  //console.log(url);
  if (originalUrl.length === 8) {
    Url.findOne({ shortUrl : originalUrl }, function(err, url) {
      if (err) { res.redirect('/'); }
      else {
        //console.log(url.url);
        res.redirect(url.url);
      }
    });
  } else {  
    Url.findOne({ url : originalUrl }, function(err, url) {
      if (err) { res.redirect('/'); }
      if (url) {
        res.json({
          "original_url" : url.url,
          "short_url" : url.shortUrl
        });
      } else {
        var splitUrl = originalUrl.split('.');
        console.log(splitUrl);
        if (splitUrl[0] === 'https://www'
           || splitUrl[0] === 'http://www'
           && splitUrl[2].substring(0,3) === 'com') {
          Url.create({
            url : originalUrl
          }, function(err, url) {
            //console.log(url);
            if (err) { res.redirect('/'); }
            else {
              res.json({
                "original_url" : url.url,
                "short_url" : url.shortUrl
              });
            }
          });
        } else {
          res.json({
            "original_url" : 'Please follow the http://www.example.com or https://www.example.com format!',
            "short_url" : 'Error'
          });
        }
      }
    });
  }
});

module.exports = router;
