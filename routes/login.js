var express = require('express');
var router = express.Router();
var passport =require('passport');
var LocalStrategy=require('passport-local').Strategy;
var mongo = require('mongodb')
var db = require('monk')('localhost/nodeblog')



router.get('/',ensurenotAuthentication,function(req,res,next){
  res.render('login',{title:'Log In'});
});

function ensurenotAuthentication(req,res,next)
{
  if(req.isAuthenticated()){//Passport authenticate API
  req.flash('success','You Are Already Logged In')
  res.redirect('/');
  }
  else{return next();}
}
//session management
passport.serializeUser(function(user,done){
  //console.log(user)
  done(null,user._id);
});

passport.deserializeUser(function(id,done){
 var userscollection = db.get('users')
userscollection.find({_id:id}).then((usr)=>{
  var user={id:'',fname:'',lname:'',email:'',profileimage:''}
usr.forEach(function(usr){
  user={id:usr._id,fname:usr.fname,lname:usr.lname,email:usr.email,profileimage:usr.profileimage}
})
  done(null,user)
})
});

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'pass'
  },
  function(email,password,done){
        var users = db.get('users')
        users.find({email:email},{}).then((allusers)=>{
          if(allusers.length == 0 ){
            return done(null,false,{message:'Unknown User'})
            }
          else{
            allusers.forEach(function(user){
              if(user.password == password)
              {
                return done(null,user)
              }
            })//allusers.forEach(function(user)
            return done(null,false,{message:'Wrong Password'})
          }//else
        })//users.find
  }//function
));

//local Strategy
router.post('/',passport.authenticate('local',{failureRedirect:'/login',failureFlash:"Invalid Username And Password"}),function(req,res){
  req.flash('success','You Are Logged In');
  res.redirect('/');
})


module.exports  = router
