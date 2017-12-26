var mysql = require('mysql');
var bcrypt = require('bcryptjs');
var pool  = mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'campusjobs',
    debug    :  false
});


module.exports.fetchData = function(sqlQuery, callback) {
     pool.getConnection(function(err,connection){
        if (err) {
            console.log(err);
           callback(err, null)
          return;
        }   
        console.log('connected as id ' + connection.threadId);

        console.log(sqlQuery);
        connection.query(sqlQuery,function(err,rows){
            connection.release();
            if(!err) {
                callback(false, rows);
            }           
        });
        connection.on('error', function(err) {      
              callback(true, err);
              return;     
        });
      });
}

module.exports.insertData = function(sqlQuery, callback){
         pool.getConnection(function(err,connection){
        if (err) {
            console.log(err);
           callback(err, null)
          return;
        }   
        console.log('connected as id ' + connection.threadId);
        console.log(sqlQuery);
        connection.query(sqlQuery,function(err,result){
            if(!err) {
                console.log(result);
                callback(false, result);
            } else {
                console.log(err);
            }  
            connection.release();       
        });
        connection.on('error', function(err) {      
              callback(true, err);
              return;     
        });
      });
}

module.exports.updateData = function(sqlQuery, callback) {
    pool.getConnection(function(err, connection){
        if(err) {
            callback(err, null);
            return;
        }
          connection.query(sqlQuery,function(err,result){
            if(!err) {
                console.log(result);
                callback(false, result);
            } else {
                console.log(err);
            }  
            connection.release();       
        });
        connection.on('error', function(err) {      
              callback(true, err);
              return;     
        });
      });
}

module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
}


module.exports.getUserById = function(userId, callback){

        pool.getConnection(function(err,connection){
        if (err) {
            console.log(err);
           callback(err, null)
          return;
        }   
        console.log('connected as id ' + connection.threadId);
        var sqlQuery = "select * from user where user_id = " + userId ; 
        console.log(sqlQuery);

        connection.query(sqlQuery,function(err,result){
            if(!err) {
                console.log(result[0]);

                var u = result[0];
                var user = {
                    user_id : u.user_id,
                    firstName: u.firstname,
                    lastName: u.lastname,
                    emailId: u.email_id,
                    currentEmployment : u.current_employment,
                    currentLocation : u.current_location,
                    education : JSON.parse(u.education),
                    experience : JSON.parse(u.experience),
                    skills : JSON.parse(u.skills),
                    phoneNumber : u.phone_number,
                profileUrl : u.profileUrl
                }
                callback(false, user);
            } else {
                console.log(err);
            }  
            connection.release();       
        });
        connection.on('error', function(err) {      
              callback(true, err);
              return;     
        });
      });
}




