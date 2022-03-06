const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const {Schema,model} = mongoose;

const userSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    score  : {
        type : Number,
    },
    topic :{
        type:String
    }
})

userSchema.pre('save',async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password,12)
    }
    next()
})


const User = model('User', userSchema)

module.exports = { User }