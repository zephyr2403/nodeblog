var express = require('express');
var router  = express.Router();
var mongo = require('mongodb');
var db = require('monk')('localhost/nodeblog')
//Url to post should be /posts/add
router.get('/add',ensureAuthentication,function(req,res,next){
  res.render('addpost',{
    title:"Add Post"
  })//res.render
});//router.get

function ensureAuthentication(req,res,next)
{
  if(req.isAuthenticated())//Passport authenticate API
    return next();
  res.redirect('/login');
}

router.get('/show/:id',function(req,res,next){
  var posts = db.get('posts')
  var post ={}
      posts.find({_id:req.params.id},{}).then((opost)=>{
        opost.forEach(function(p){
        post.id=p._id,
        post.title=p.title,
        post.body=p.body,
        post.author=p.author,
        post.category=p.category,
        post.date=p.date,
        post.comments=p.comments
      })
    res.render('show',{
      "post":post,
      "title":post.title
    });//res.router
  });//posts.find
});//router.get

router.post('/addcomment',function(req,res,next){

  var postid = req.body.postid;
  var body=req.body.body;
  var email=req.body.email;
  var usrname=req.body.usrname;
  req.checkBody('usrname','Name is a required field').notEmpty()
  req.checkBody('body','Body is a required field').notEmpty()
  req.checkBody('email','Email is a required field').notEmpty()

  var errors = req.validationErrors();
  var posts = db.get('posts')
  var post = {id:"",title:"",body:"",author:'',category:"",date:"",comments:""}
  if(errors){
    posts.find({_id:postid},{}).then((opost)=>{
      opost.forEach(function(p){
        post.id=p._id,
        post.title=p.title,
        post.body=p.body,
        post.author=p.author,
        post.category=p.category,
        post.date=p.date,
        post.comments=p.comments
      })
      //console.log(post)
      res.render('show',{
        "post":post,
        "errors":errors,
        "title":post.title,
        "usrname":usrname,
        "email":email,
        "body":body
       });//res.router
     });//find
  }//if
  else{
    var comment={
      "name":usrname,'email':email,'body':body,'commentdate':new Date()
    }
    posts.update({'_id':postid},
    {
      $push:{
        'comments':comment
            }
    })
      req.flash('success','Comment Added')
      res.location('/posts/show/'+postid);
      res.redirect('/posts/show/'+postid);
    }//else
  });//addcomment
router.post('/add',function(req,res,next){

  //get the form value
  var title = req.body.title.trim();
  var category=req.body.category.toLowerCase().trim();
  var body =req.body.body;
  var author=req.body.author.trim();
  var description = req.body.description.trim();
  var date = new Date();
  

  if(req.files.length>0){
    var postimagename=req.files[0].filename;
    }
    else
    {
      var postimagename="noimage.png";
    }

  req.checkBody('title','Title is Required').notEmpty();
  req.checkBody('category','Category is Required').notEmpty();
  req.checkBody('description','Description is Required').notEmpty();
  req.checkBody('description','Max 35 characters').isLength({max:35});
  req.checkBody('body','Body is Required').notEmpty();

  var errors = req.validationErrors();
  if(errors){
    res.render('addpost',{
      title:"Add Post",
      "errors":errors,
      "Title":title,
      "category":category,
      "Body":body,
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
      "date":date,
      "imagename":postimagename
    },function(err,post){
      if(err){
        res.send('There was an issue sumitting the post')
      }else {
        req.flash('success','Post Submitted') ;
        res.location('/');
        res.redirect('/');
      }
    });
  }
});//router.post

module.exports = router;
