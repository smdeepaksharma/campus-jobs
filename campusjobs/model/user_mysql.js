var mysql = require('mysql');

var pool  = mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : 'root',
    database : 'campusjobs',
    debug    :  false
});


module.exports.userRegistration = function(user, callback){
    // used to encrypt the password
    bcrypt.genSalt(10,function(err, salt){
        bcrypt.hash(user.password, salt, function(err, hash){
            if (err) throw err;
            user.password = hash;
            
        pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);

        var query = "Insert into user(firstname,lastname,email,password) values ( " + 
            " '"+ user.firstName + "', '" + user.lastName + 
            "','" + user.emailId + "','" + user.password + "')";

        connection.query(query,function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });


        })
    })
}

function handle_database(req,res) {
    
    pool.getConnection(function(err,connection){
        if (err) {
          res.json({"code" : 100, "status" : "Error in connection database"});
          return;
        }   

        console.log('connected as id ' + connection.threadId);
        
        connection.query("select * from user",function(err,rows){
            connection.release();
            if(!err) {
                res.json(rows);
            }           
        });

        connection.on('error', function(err) {      
              res.json({"code" : 100, "status" : "Error in connection database"});
              return;     
        });
  });
}