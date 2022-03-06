const express = require('express')
const {Quiz} = require('../Model/quizDataModel')
const {quizzes} = require('../DB/quizData')
const {User} = require('../Model/UserModel')
const Router = express.Router();

// Router.route('/').get(async(req,res) => {
//     try{
        
//     }catch(err){
//         console.log(err.message)
//     }
// } )



Router.route('/').post(async(req,res) => {
    try{
        quizzes.map(async(ele,i) => {
            const quizReg = new Quiz(ele)
            const userSave = await quizReg.save();
            // if(userSave){
            //     return res.status(201).json({ success:true , message:"User successfully registered"});
                console.log(userSave)
            }
            // return res.status(422).json({success : false ,message :"something went wrong"})
        ) 
    }catch(err){
        console.log(err.message)
    }
} ).get(async(req,res)=>{
    try{
    const getQuizData = await Quiz.find();
    if(getQuizData)
        return res.status(200).json({success:true,getQuizData})
        return res.status(422).json({success:false,message:"failed to get data"})
    }
    
    catch(err){
        console.log(err.message)
    }
})
module.exports = Router