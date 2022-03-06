const mongoose = require('mongoose')

const {Schema,model} = mongoose;

const quizSchema = new Schema({
    q_id:{
        type:String,
        required:true
    },
    topic : {
        type: String,
        required:true
    },
    image:{
        type:String,
        required:true
    },
    questions:[{
            _id:{
                type:String,
                // required:true
            },
            question:{
                type: String,
                required:true
            },
            pts:{
                type:Number,
                required:true
            },
            negativePts:{
                type:Number,
                required:true
            },
            options:[
                {   
                    _id:{
                        type:String,
                        required:true    
                    },
                    option:{
                        type:String,
                        required:true
                    },
                    isRight:{
                        type:Boolean,
                        required:true
                    },
                   
                }
            ]
        }]
    }

)

const Quiz = model('Quiz',quizSchema)

module.exports = {Quiz}