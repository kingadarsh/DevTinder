const mongoose=require('mongoose');

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
        lowercase:true
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
        enum:["Male","Female","Other"]
    }
});

const User=model('User',userSchema); // always create models using capital letter like User not userSchema

module.exports=User;