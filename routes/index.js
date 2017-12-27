var express = require('express');
var router = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog');
var unique = require('array-unique')
/* GET home page. */
router.get('/', function(req, res, next) {
  var db = req.db;
  var posts= db.get('posts')//name of database

  //  var uniquecate=posts.distinct('category')
  //  posts.distinct('category',function(categories){
  //   uniquecate = categories;
  //   //console.log(categories);
  //  })
  // fetchcate.on('success',function(categories){
  //   alert(categories);
  // })
  //var unicat = posts.distinct('category')
  //console.log(unicat);

  //req.flash('success','Nigga Boy');
posts.find({},{},function(err,posts){// nothing is passed because we want all the posts no queries are imposed
    var uniquecategory = ['All']

    posts.forEach(function(post){
      uniquecategory.push(post.category)
    })
    unique(uniquecategory)


    //uniquecategory.push(posts.category)
    //console.log(unicat)
    //console.log(uniquecate)
    res.render('index',{
      "posts":posts,
       title:"Home",
       "uniquecategory":uniquecategory
        });//res.render
    });//posts.find

});//router.get

module.exports = router;
