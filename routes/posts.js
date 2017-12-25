var express = require('express');
var router  = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog')
//Url to post should be /posts/add
router.get('/add',function(req,res,next){
  res.render('addpost',{
    title:"Add Post"
  })//res.render

});//router.get

router.post('/add',function(req,res,next){

  //get the form value
  var title = req.body.title;
  var category=req.body.category;
  var body =req.body.body;
  var author=req.body.author;
  var description = req.body.description;
  var date = new Date();

  if(req.files.mainimage){
    var mainimageOriginalname=req.files.mainimage.originalname;
    var mainimagename=req.files.mainimage.name;
    var mainimagesize = req.files.mainimage.size
  }else{
      var mainimagename="noimage.png ";
  }

  req.checkBody('title','Title is Required').notEmpty();
  req.checkBody('category','Category is Required').notEmpty();
  req.checkBody('author','Author is Required').notEmpty();
  req.checkBody('description','Description is Required').notEmpty();
  req.checkBody('body','Body is Required').notEmpty();

  var errors = req.validationErrors();
  if(errors){
    res.render('addpost',{
      "errors":errors,
      "Title":title,
      "category":category,
      "body":body,
      "author":author,
      "description":description

    })
  }else {
    var posts = db.get('posts');
    posts.insert({
      "title":title,
      "description":description,
      "category":category,
      "author":author,
      "body":body,
      "date":date
    },function(err,post){
      if(err){
        res.send('There was an issue sunmitting the post')
      }else {
        req.flash('success','Post Submitted') ;
        res.location('/');
        res.redirect('/');
      }
    });
  }
});//router.post

module.exports = router;
