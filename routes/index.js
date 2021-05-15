var express = require('express');
var router = express.Router();
var usermodel= require("../models").user;
var airportmodel=require("../models").airtportdata;
const { Op } = require("sequelize");

/* GET home page. */
router.get('/', function(req, res, next) {
 //res.render('index', { title: 'Express' });
 res.render('index');

});
router.post('/adduser', require('../middleware/checkKey'), function(req,res,next){
usermodel.create({
  name:req.body.name, 
  email:req.body.email,
  secret:req.body.age,
  password:req.body.pass

}).then((userdata)=>{
  if(userdata){
    req.flash("success","USER DATA CREATED SUCCESFULLY");
    res.render('userform');
  }
  else{
    req.flash("error","ERROR, page cannot be accessed");
    res.render('userform');
  }
});
});
router.get('/viewuser',async function(req,res,next){
  var alluser= await usermodel.findAll();
  res.render("userlist",{listuser:alluser});

});
router.get('/edituser/:userid', function(req,res,next){

usermodel.findOne({
  where:{ 
    id:{
      [Op.eq]:req.params.userid
    }
  }
}).then((userdata)=>{
  res.render('edituserform',{edituserlist:userdata});
});
});
router.post('/edituser/:userid',function(req,res,next){
  usermodel.update({
    name:req.body.name,
    email:req.body.email,
    secret:req.body.age,
    password:req.body.password
  },{where:{
    id:{
      [Op.eq]:req.params.userid
    }
  }}).then((userdata)=>{
    if(userdata){
      req.flash("success","USER DATA EDITED SUCCESFULLY");
      res.render('success');
    }
    else{
      req.flash("error","ERROR page cannot be accessed");
      res.render('success');
  
    }
  }
  );

});
router.post('/deleteuser',function(req,res,next){
  usermodel.findOne({
    where:{
      id:{
        [Op.eq]:req.body.user_id
      }
    }
  }).then((userdata)=>{
    if(userdata){
      console.log(userdata,req.body.user_id);
      usermodel.destroy({
        where:{
          id:
          {
            [Op.eq]:req.body.user_id
          }
        }
      }).then((userstatus)=>{
        if(userstatus){
        req.flash("success","USER DATA DELETED SUCCESFULLY");
          res.redirect('/viewuser');
        }
        else{
          req.flash("error","ERROR page cannot be accessed");
          res.redirect('/viewuser');
      
        }
        
      });
    }
  }
  );

});
router.get('/airportform',function(req,res,next){
res.render('airportform');


});
// router.post('/addairport',function(req,res,next){
//   if(!req.files){
//     req.flash("error","PLEASE UPLOAD AN IMAGE TO CONTINUE");
//     res.redirect("/airportform1");

//   }
 
//   else{
//     var image_attr=req.files.image;
//     image_attr.mv("./public/uploads/"+image_attr.name);
//    airportmodel.create({
//    name:req.body.name,
//    city:req.body.city,
//    state:req.body.state,
//    cleanliness:req.body.cleanliness,
//    ranking:req.body.ranking,
//    traffic:req.body.traffic,
//    airlines:req.body.airlines,
//    image:"/uploads/"+image_attr.name,
//    recommendation:req.body.recommendation,
//    service:req.body.service,
//    taxi:req.body.taxi,
//    foodchains:req.body.foodchains,

//    }).then((status)=>{
//      if(status){
//        req.flash("success","AIRPORT DETAILS HAVE BEEN CREATED SUCCESSFULLY");
      
//      }
//      else{
//        req.flash("error","ERROR IN UPLOADING AIRPORT DETAILS");
//      }
//      res.redirect("/airportform1");
//    })}

//});
router.post('/addairport',function(req,res,next){
 
if(!req.files){
  req.flash("error","please upload image file");

}
else{ var imagevar=req.files.image; 
  imagevar.mv("./public/uploads/"+imagevar.name);
     airportmodel.create({
     name:req.body.name,
     city:req.body.city,
     state:req.body.state,
     cleanliness:req.body.cleanliness,
     ranking:req.body.ranking,
     traffic:req.body.traffic,
     airlines:req.body.airlines,
     image:"/uploads/"+imagevar.name,
     recommendation:req.body.recommendation,
     service:req.body.service,
     taxi:req.body.taxi,
     foodchains:req.body.foodchains,
  
     }).then((status)=>{
       if(status){
         req.flash("success","AIRPORT DETAILS HAVE BEEN CREATED SUCCESSFULLY");
        
       }
       else{
         req.flash("error","ERROR IN UPLOADING AIRPORT DETAILS");
       }
       res.redirect("/airportform");
     })}


});
router.get('/viewairport',async function(req,res,next){
  var allairport= await airportmodel.findAll();
  res.render("airportlist",{airportlist:allairport});

});
router.post('/search', async function (req, res, next) {
  console.log(req.body.city + '2');
  var searchcity= await airportmodel.findAll({
    where:{
      city:{
        [Op.eq]:req.body.city

      }
} }).then((status)=>{
    if(status){
     res.render("searchdetail",{airportlist:status});
    }
    // else{
    //   req.flash("error","AIRPORT DETAIL NOT FOUND");
    //   res.render("searchdetail");

    // }
  }
  );

});
router.get('/searchbar', async function (req, res, next) {
  try {
    let cityList = await airportmodel.findAll({
      raw: true,
      attributes: ['city']
    });

    res.render("searchbar", { city: cityList });
    
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: 'error' });
  }
});

router.get('/index',function(req,res,next){
  res.render('index.ejs');
  
  
  });
  
  
router.get('/rightsidebar',function(req,res,next){
  res.render('right-sidebar');
  
  
  });
  router.get('/login',function(req,res,next){
    res.render('left-sidebar');
    
    
    });
    
  router.post('/signin', function(req,res,next){
      var signvar =  usermodel.findOne({
        where:{
          name:{
            [Op.eq]:req.body.name
            
    
          },
          password:{
            [Op.eq]:req.body.pass
          }
    } }).then((status)=>{
        if(status){
         res.render("airportform");
        }
        else{
          req.flash("error","PLEASE ENTER CORRECT DETAILS");
          res.render("left-sidebar");
        }
        
      }
      );
    
    });
    

module.exports = router;

