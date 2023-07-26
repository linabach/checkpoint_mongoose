const User = require("../Model/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");



exports.register = async(req , res) =>{
    try {
        const { firstname , name , email , password} = req.body ; 
        const foundUser = await User.findOne({ email});
        if (foundUser) {
           return res.status(400).send( { errors : [{ msg : "email in use..."}]})
        }
        const saltRounds = 10
        const checkpassword = await bcrypt.hash(password, saltRounds)

        const newUser = new User({...req.body})

        newUser.password = checkpassword
       
        await newUser.save()

        const token = jwt.sign({
            id : newUser._id
        } , process.env.SCRT_KEY , {expiresIn: "48h"})


        res.status(200).send( { success : [{ msg : "successuful registration "}] , user : newUser , token })

        
    } catch (error) {
        res.status(400).send({ errors : [{ msg : "try again"}]})
    }

}
exports.login = async(req,res)=>{
    try {
        const { email, password}= req.body 
        const foundUser = await User.findOne({ email });
        if(!foundUser){
            return res.status(400).send({ errors : [{msg : "user not found ! "}]})
        }
        const checkpassword = await bcrypt.compare(password , foundUser.password)
        if (!checkpassword){
            return res.status(400).send({errors : [{msg : "verify your password"}]})
        }
        const token = jwt.sign({
            id : foundUser._id
        } , process.env.SCRT_KEY , {expiresIn: "48h"})

        res.status(200).send({success:[{msg:"welcome back!"}], user: foundUser , token})
    } catch (error) {
        res.status(400).send({ errors : [{ msg : "try again"}]})
    }
}

exports.updateUserPassword = async(req,res)=>{
    const { oldPassword , password , confirmPassword } = req.body;
    const {_id} = req.params;
    try {
        
        const user = await User.findById(req.params);
        if (!user){
            return res.status(400).send({ errors : [{msg : "user not found"}]})
        }

        const isValidPassword = await bcrypt.compare(oldPassword  , user.password);
        if (!isValidPassword) {
            return res.status(400).send({ errors : [{ msg : "verify your password"}]})
        }


        if (password !== confirmPassword){
            return res.status(400).send({ errors : [{msg : "verify your new password"}]})
        }

        const hashedPassword = await bcrypt.hash(password,10)
        user.password = hashedPassword

        const updatedUserPassword = await user.save()
        return res.json({sucess : [{msg: "your password has been updated successfully "}]})

    } catch (error) {
        return res.status(400).send({ errors : [{msg : "try again later"}]})
    }
}

