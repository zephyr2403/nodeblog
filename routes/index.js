var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');

/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var posts = db.get('posts')//name of database

posts.find({},{},function(err,posts){// nothing is passed because we want all the posts no queries are imposed
    res.render('index',{
      "posts":posts
        });//res.render
    });//posts.find
});//router.get

module.exports = router;
