var express = require('express')
var router = express.Router()
var mongo = require('mongodb')
var db = require('monk')('localhost/nodeblog')

router.get('/:name',ensureAuthentication,function(req,res,next){
  var dbposts = db.get('posts')
  var userpost = []
  console.log(req.params.name)
  dbposts.find({author:req.params.name},{}).then((userposts)=>{
    console.log(userposts)
    res.render('viewprofile',{
      title:'Profile',
      userposts:userposts
    })
  })//db.post

})//router.get


function ensureAuthentication(req,res,next)
{
  if(req.isAuthenticated())//Passport authenticate API
    return next();
  res.redirect('/login');
}
module.exports = router;
