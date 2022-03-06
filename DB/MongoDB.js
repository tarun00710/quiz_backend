const mongoose = require('mongoose')
const MongoDB_URL = "mongodb+srv://QuizApp:Tarun%406750@quizcluster.xw9jc.mongodb.net/test?authSource=admin&replicaSet=atlas-5ysgzc-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true"

const ConnectionDB = async() => {
    try{
        const connect = await mongoose.connect(MongoDB_URL)
        if(connect)
        console.log("connected to DB");
    else
        console.log("Couldn't connect to MongoDB");
    }
    catch(err){
        console.log(err)
    }   
}

module.exports = {ConnectionDB}