
var express = require('express');
var router = express.Router();
/* in node js whenever we want to access any request from user to respond we need to attach express module so that we can attach all the funcitons
like a library file */
router.get("/fuser",function(req,res,next){
    res.redirect('simple');
});

module.exports = router;
