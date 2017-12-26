const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
const db = require('../database/db');

//const Student = require('../model/user_mysql');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

/*router.post('/register', function(req,res,next){
  // create a model of student
  let student = new Student({
    redid : req.body.redid,  
    firstName : req.body.firstName,
    lastName : req.body.lastName,
    educationDetails : req.body.educationDetails,
    expereinceDetails : req.body.expereinceDetails,
    skills: req.body.skills,
    phoneNumber : req.body.phoneNumber,
    emailId : req.body.emailId,
    password : req.body.password
  });

  Student.studentRegistration(student, (err, studentModel) => {
    if(err){
      console.log(err);
      switch(err.name){
        case 'ValidationError':
        for (field in err.errors) {
          switch (err.errors[field].path) {
            case 'emailId':
            res.json({success : false, msg:"Email already in use"});
            break;
          case 'redid':
            res.json({success : false, msg:"Redid already in use"});
            break;
          }
        }
        break;
      }
    } else {
      res.json({success : true, msg:'Registered successfully'});
    }
  });
});*/

router.post('/register', (req,res,next)=> {
  let user = req.body;
  // encrypting password
  bcrypt.genSalt(10,function(err, salt){
    bcrypt.hash(user.password, salt, function(err, hash){
      if (err) throw err;
      user.password = hash;
      var ran = Math.floor(100000 + Math.random() * 900000);
      profileUrl = user.firstName + user.lastName + ran;
      var query = "Insert into user(firstname,lastname,email_id,password,profileUrl,current_employment,current_location) values ( " + 
            " '"+ user.firstName + "', '" + user.lastName + 
            "','" + user.emailId + "','" + user.password + "','" + profileUrl + "','"+ user.currentEmployment
            + "','" + user.currentLocation + "')";
      db.insertData(query, function(err, results){
        if(err){
          res.json({success : false, msg : "Registration Failed"});
        } else {
          res.json({success : true, msg : "Registered successfully"});
        }
      });
    });
  });
});

router.post('/authenticate', (req, res, next) => {
  const emailId = req.body.emailId;
  const password = req.body.password;
  const numberOfConnections = 0;
  var query = "Select * from user where email_id = '" + emailId + "'";
  db.fetchData(query, function(err, results){
    if(err){
      return res.json({success : false, msg : "Invalid email or password"});
    }
    if(results.length > 0)
    {
    let user = results[0];
    db.comparePassword(password, user.password  , (err, isMatch) => {
      if(err) {
        res.json({success : false, msg : "invalid password"});
        return;
      }
     if(isMatch){
        const token = jwt.sign(user, config.secret, {
          expiresIn: 604800 // 1 week
        });
        res.json({
          success: true,
          token: 'JWT '+token,
          currentuser : {
            userId : user.user_id,
            firstName: user.firstname,
            lastName: user.lastname,
            emailId: user.email_id,
            education : JSON.parse(user.education),
            experience : JSON.parse(user.experience),
            skills : JSON.parse(user.skills),
            currentLocation : user.current_location,
            currentEmployment : user.current_employment,
            phoneNumber : user.phone_number,
            profileUrl : user.profileUrl
          }
        });
      } else {
        return res.json({success: false, msg: 'Wrong password'});
      }
    })
     } else {
       return res.json({success : false, msg : 'Invalid email id'});
     }
  });
});

// Profile
router.get('/profile', passport.authenticate('jwt', {session:false}), (req, res, next) => {
  res.json({user: req.user});
});


router.post('/updateEducation', (req, res, next) => {
console.log(req);
var edu = JSON.stringify(req.body.education);
var userid = req.body.user_id;
  var educationUpdateQuery = "update user set education = '" + edu + "' where user_id = " + userid;
  console.log(educationUpdateQuery);
  db.updateData(educationUpdateQuery, function(err, result){
    if(err){
      return res.json({success : false, msg : "Could not update eduction"});
    } else {
      return res.json({success : true, msg : "Education updated successfully"});
    }
  })
});

router.post('/updateExperience', (req, res, next) => {
  console.log("Updating experience...")
  var exp = JSON.stringify(req.body.experience);
  const userid = req.body.user_id;
  var experienceUpdateQuery = "UPDATE user SET experience = '" + exp + "' WHERE user_id = "  + userid;
  console.log("Query : " + experienceUpdateQuery);
  db.updateData(experienceUpdateQuery, function(err, result){
    if(err){
      return res.json({success : false, msg : "Could not update experience"});
    } else {
      return res.json({success : true, msg : "Experince updated successfully"});
    }
  });
});

router.post('/updateSkills', (req, res, next) => {
  console.log("Updating skills...");
  const skillSet = JSON.stringify(req.body.skills);
  const userId = req.body.user_id;
  var skillsUpdateQuery = "UPDATE user SET skills = '" + skillSet + "' WHERE user_id = " + userId ;
  db.updateData(skillsUpdateQuery, function(err, result){
    if(err){
      return res.json({success : true, msg : "Could not update skills"});
    } else {
      return res.json({success : true, msg : "Updated skills successfully"});
    }
  });
});


router.post('/connections', (req, res, next) => {
  console.log("Connections ----------------- " + req.body.user_id)
  const user_id = req.body.user_id;
  var getConnections = "Select count(*) from mynetwork where user_id = " + user_id
  db.fetchData(getConnections, (err, result) => {
    if(err) {
      return res.json({success: false, msg: "No connections found"})
    } else {
      return res.json({success : true, connections: result[0]['count(*)']})
    }
  })
})

module.exports = router;
