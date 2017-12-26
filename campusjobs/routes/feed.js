const express = require('express');
const router = express.Router();
const db = require('../database/db');
const passport = require('passport');
const jwt = require('jsonwebtoken');

// feeds 
router.post('/newfeeds', passport.authenticate('jwt', {session:false}), function(req, res, next){
    console.log("inside feeds");
    
    var feedArray= []; 

    var commentsQuery = "select u.firstname ,c.user_id, c.time_stamp, c.comment, p.post_id, p.description "
    + "from mynetwork n, comments c left outer join posts p on c.post_id = p.post_id left outer join "
    + "user u on u.user_id = p.user_id where c.user_id = n.connected_to and n.user_id =" + req.body.userid; 
    db.fetchData(commentsQuery, function(err, rows){
        
        console.log(rows.length);
        if(rows.length > 0){
            for(i = 0 ; i < rows.length ; i++){
                rows[i].type = 'comment';
                feedArray.push(rows[i]);
            }
        } else {
            console.log("No feeds available");
        }  
    });

    var likesQuery = "select u.firstname ,l.user_id, l.time_stamp, p.post_id, p.description "
    + "from mynetwork n, likes l left outer join posts p on l.post_id = p.post_id left outer join "
    + "user u on u.user_id = p.user_id where l.user_id = n.connected_to and n.user_id =" + req.body.userid;
    console.log(likesQuery);
    db.fetchData(likesQuery, function(err, rows){
        console.log(rows.length);
        if(rows.length > 0){
             for(i = 0 ; i < rows.length ; i++){
                 rows[i].type = 'likes'
                feedArray.push(rows[i]);
            }
        } else {
            console.log("No feeds available");
        }
    });

    var postsQuery = "select p.post_id, p.description, p.time_stamp, u.user_id, u.firstname, n.connected_to as 'postedby', n.user_id as 'currentUser' from user u inner join posts p on u.user_id = p.user_id inner join mynetwork n on p.user_id = n.connected_to where n.user_id ="+ req.body.userid; 
    db.fetchData(postsQuery, function(err, posts){
        if(posts.length>0){
            for(i = 0; i < posts.length ; i++){
                posts[i].type = 'post';
                feedArray.push(posts[i]);
            }
            // sorting the feeds by time stamp
            feedArray.sort(function(a, b) { return a.time_stamp - b.time_stamp; });
            res.json({success : true, data : feedArray});
        } else {
            res.json({success : false, msg : 'No feeds'});
        }
    });
});

// new post by user
router.post('/postarticle', function(req,res){
    let article = req.body ; 
    var sqlQuery = "Insert into posts(posted_by,description,images,tags) values(" + article.postedBy +
    ",'" + article.description + "','" + article.images + "','" + JSON.stringify(article.tags) +"')";
  
   db.insertData(sqlQuery, function(err,results){
        if(!err){
            res.json({success : true, msg : 'posted successfully'});
        } else {
            res.json({success : false, msg :'Something went wrong'});
        }
    });
});


router.post('/like',  passport.authenticate('jwt', {session:false}), function(req,res){
    var bundle = req.body;
    var liked_by = bundle.user_id;
    var post_id = bundle.post_id  ; 
    console.log("like server end", liked_by);
    var sqlQuery = "Insert into likes (post_id, user_id) values( " + post_id + "," + liked_by + ")";
    db.insertData(sqlQuery, function(err, results){
        if(!err){
            res.json({success : true, msg : 'liked'});
        } else {
            res.json({success : false, msg :'Something went wrong'});
        }
    })

})

module.exports = router;