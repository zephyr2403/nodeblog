var express = require('express');
var router = express.Router();

router.get('/',function(req,res,next){
  req.logout()
  req.flash('success','You have Succesful Logged Out');
  res.redirect('/');
})
module.exports = router;
