const express = require('express');
const {ConnectionDB} = require('./DB/MongoDB')
const bodyParser = require('body-parser');
var cors = require('cors')
const app = express();


const PORT = process.env.PORT || 5000;
ConnectionDB()

app.use(cors())
app.use(bodyParser.json());

app.get('/',(req,res) =>{
    res.send("hello")
})

const userRoutes = require('./Routes/userRoutes')
app.use('/user',userRoutes)

const quizRoute = require('./Routes/quizRoute')
app.use('/quiz',quizRoute)

app.listen(PORT,() => {
    console.log("running at port,"+PORT)
})