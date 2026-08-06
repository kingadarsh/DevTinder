const mongoose=require('mongoose');
const validator = require('validator');

const {Schema,model}= mongoose;

const userSchema=new Schema({
    firstName:{
        type:String,
        required:true,
        trim:true

    },
    lastName:{
        type:String,
        required:true,
        trim:true

    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true,
        lowercase:true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error ("the email is is not valid");
            }
        }
    },
    password:{
        type:String,
        required:true,
    },
    age:{
        type:Number
    },
    gender:{
        type:String,
        enum:["Male","Female","Other"],
        validate(value){
            if(!["Male","Female","Other"].includes(value)){
                throw new Error("The gender is not a type")
            }
        }
    },
    about:{
        type:String,
        default:"This is something about user"
    }
});

const User=model('User',userSchema); // always create models using capital letter like User not userSchema

module.exports=User;