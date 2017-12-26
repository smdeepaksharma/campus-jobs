const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const config = require('../config/database');
const bcrypt = require('bcryptjs');
const db = require('../database/db');

router.post('/connect', (req, res, next)=>{

    var connect_request_by = req.body.user_id;
    var connect_to = req.body.friend_id;
});


router.get('/members', (req, res, next)=>{
    var sqlQuery = "Select * from user";
    db.fetchData(sqlQuery, function(err, result){
        if(err){
            return res.json({success : false, msg : "Could not find"});
        } else {
            console.log(result);
            return res.json({success : true, members : result});
        }
    });
});







module.exports = router;