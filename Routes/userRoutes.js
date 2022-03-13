const express = require("express");
const bcrypt = require("bcryptjs")
const {User} = require('../Model/UserModel')
const {userCheckHandler} = require('../Middleware/userCheckHandler');
const {authVerify} = require('../Middleware/authVerify') 
const jwt = require('jsonwebtoken')

const Router = express.Router()

const secret = "efuhpBjqkzx2zE84IoqSVwzNakAL0McwYDMrkxVfkAyoyt0Cf9rjDwVFvwwmCYWh55ciD7HYPU5EC4cYxWMDhrZ5cnLBMgJrFBDHLzAW3ReYrQsLUd2qr6picKFl5oHxybeJU8RJRSKm8qY9ZC5NXNCZGOVSS8qAju2kQLwA9haBEWgD17QZOxbU/WY1qVM1xUfYzBIzs76oEq7x4gku6PLsnAW9oMfml0wPB2aQKIxWZjso5iWvDswLiorDnfv9hUMgjcZ5Dm4V1ciMkfu+zMrfNyRkdQZHao/aW0Zkz2hvaueAhx+n/lFZuMi0yhyOlXmHom8W3H4YhPlUztyyIw=="

Router.route('/').get(async(req,res) => {
    try{
        const allUsers = await User.find();
        if(allUsers)
            return res.json({ success:true,allUsers })
        return res.json({success:false , message:"no user found"})    
    }catch(err){
        console.log(err.message)
    }
} )


Router.route('/register')
    .post(userCheckHandler,async(req,res) =>{
        try{
            const { name,email,password } = req.body;
            const newUser = new User({name, email, password});
            console.log(newUser)
            const userSave =await newUser.save();
            if(userSave){
                console.log(userSave)
                return res.status(201).json({ success:true , message:"User successfully registered"});
            }
            return res.status(422).json({success : false ,message :"something went wrong"})
        }
        catch(err){
            console.log(err.message)
        }
    })

Router.route('/login')
        .post(async(req,res) => {
            try{
                const { email,password } = req.body
                const userExist = await User.findOne({email : email})
                const isMatch = bcrypt.compare(password,userExist.password)
                if(isMatch){
                   const token = await jwt.sign({userId : userExist._id},secret,{expiresIn : '24h'})
                   return res.status(200).json({success:true , userExist , token })
                }
                return res.status(422).json({success : false , message : "Invalid credential"})
            }
            catch(err){
                console.log(err.message)
            }
        }) 
//using token
Router.route('/userInfo')
        .post(authVerify,async(req,res) => {
            try{
                const {userId} = req.user
                if(userId){
                    const findUser = await User.findById(userId)
                    return res.json({success : true, userData : findUser})
                }
                return res.json({success : false , message :"User doesn't exist"})
            }catch(err){ 
                console.log(err.message)
            }
           
        })

Router.route('/:userId')
        .get(async(req,res) => {
            try {
                const { userId } = req.params
                const findUser = await User.findById(userId)
                if(findUser){
                    return res.json({success:true , findUser})
                }
                res.json({success:false , message : "Invalid user"})
            }catch(err)  
             {
                console.log(err.message)
             }
        })

Router.route('/:userId/topic/:topic/score/:score')
    .post(async(req,res) => {
        try {
            const {userId ,topic, score} = req.params
            const findUser = await User.findById(userId)
            if(findUser){
               findUser.score = score
               findUser.topic = topic
               findUser.save()
               return res.status(200).json({success:true , findUser})
            }
            return res.status(422).json({success:false , message : "Invalid user"})

        } catch (error) {
            console.log(error.message)
        }
    } )        

module.exports = Router