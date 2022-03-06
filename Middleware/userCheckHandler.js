const {User}= require('../Model/UserModel')

const userCheckHandler = async(req,res,next) =>
{
    try{
        const {email} = req.body;
        const findUser = await User.findOne({email: email});
        if(findUser){
            return res.status(422).json({success: false, message: "User alreadY found"})
        }else{
            next();
        }

    }catch(err){
        console.log(err.message)
    }
}
module.exports = {userCheckHandler}