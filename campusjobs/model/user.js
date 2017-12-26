var mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const config = require('../config/database');
var uniqueValidator = require('mongoose-unique-validator');

const StudentSchema = mongoose.Schema({
    redid : {
        type : String,
        required : [true, 'RedId required'],
        index: {unique: true, dropDups: true}
    },
    firstName : String,
    lastName : String,
    educationDetails : [],
    expereinceDetails :[],
    skills : [],
    phoneNumber : String,
    emailId : {
        type : String,
        required : [true, 'Email required'],
        index: [{unique: true, dropDups: true}, 'Email already in use']
    },
    password : {
        type : String,
        required : true
    },
    photoUrl : String

});

StudentSchema.plugin(uniqueValidator);

const Student = module.exports = mongoose.model('student',StudentSchema);

// to retrieve student based on id
module.exports.getStudentById = function(id, callback){
    Student.findById(id,callback);
}

// to retrieve student by email id (Login)
module.exports.getStudentbyEmail = function(emailId, callback){
    const query = {emailId: emailId};
    Student.findOne(query, callback);
}

// student registration
module.exports.studentRegistration = function(newStudent, callback){
    // used to encrypt the password
    bcrypt.genSalt(10,function(err, salt){
        bcrypt.hash(newStudent.password, salt, function(err, hash){
            if (err) throw err;
            newStudent.password = hash;
            newStudent.save(callback);
        })
    })
}

// method to authenticate student password
module.exports.comparePassword = function(candidatePassword, hash, callback){
    bcrypt.compare(candidatePassword, hash, function(err, isMatch){
        if(err) throw err;
        callback(null, isMatch);
    });
}