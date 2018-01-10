var express = require('express')
var router = express.Router()
var mongo = require('mongodb')
var db = require('monk')('localhost/nodeblog')

router.get('/',ensurenotAuthentication,function(req,res,next){
  res.render('register',{title:'Register'});
});

function ensurenotAuthentication(req,res,next)
{
  if(req.isAuthenticated()){//Passport authenticate API
  req.flash('success','Please LogOut If You Want To Register')
  res.redirect('/');
  }
  else{return next();}
}
router.post('/',function(req,res,next){
  //getting form value
  console.log('Register');
  var fname = req.body.fname;
  var lname =req.body.lname;
  var email =req.body.email
  var pass = req.body.pass;
  var repass=req.body.repass;

  //Checking for image field
  if(req.files.profileimage)
  {
    console.log('uploading image .. ');
    //Storing Uploaded Image Details in Variables
    var imageorigname = req.files.profileimage.originalname;
    var imagename= req.files.profileimage.name;
    var imagemime= req.files.profileimage.mimetype;
    var imagepath= req.files.profileimage.path;
    var imageextension= req.files.profileimage.extension;
    var imagesize= req.files.profileimage.size;
  }
  else {
      //If no image is selected a default image will be shown
      var imagename  = 'nouser.png';
    }

    //Form Validation.
                          //(name , error-to-be-displayed)
    req.checkBody('fname','First Name is Required Field').notEmpty();
    req.checkBody('lname','Last Name is Required Field').notEmpty();
    req.checkBody('email','Email Required Field').notEmpty();
    req.checkBody('email','Invalid Email').isEmail();
    req.checkBody('pass','Password Is Required Field').notEmpty();
    req.checkBody('repass',"Password Don't Match").equals(req.body.pass);

    //Check For Errors

    var  errors = req.validationErrors();

    if(errors){
      res.render('register',{
        errors : errors,
        fname:fname,
        lname:lname,
        email:email
      });
    }
    else {
        var users = db.get('users');

        users.insert({
          "fname":fname,
          "lname":lname,
          "email":email,
          "password":pass,
          "profileimage":imagename,
        })
        console.log('this');
        //Success Messsage
        req.flash('success','You Are Now Registered And May Log In');

        res.location('/');
        res.redirect('/');

        }
});

module.exports = router;
