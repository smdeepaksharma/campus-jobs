const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
const db = require('../database/db');

// get public profile os the user
router.get('/public-profile/:profileUrl', function(req, res){

  var profile = req.params.profileUrl ; 
  var sqlQuery = "SELECT * FROM user WHERE profileUrl = '"+ profile + "'";

  db.fetchData(sqlQuery, function(err, rows){
    if(err){
      res.json({success : false, msg : 'Unable to find user'});
    } else {
        if(rows.length <= 0){
            res.json({success : false, msg : 'Invalid url'});
        } else {
            res.json({success : true, user : rows[0]})
        }
    }
  });
});

module.exports = router;