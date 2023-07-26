
const User = require("../Model/User");
const jwt = require("jsonwebtoken");

const isAuth = async (req,res,next)=> {
    try {
        const token = req.headers["authorization"]

        if (!token) {
            return res.status(401).send({errors : [{msg : "not authorized 1 "}]})
        }

        const decoded = jwt.verify(token , process.env.SCRT_KEY )
        const foundUser = await User.findOne({_id :  decoded.id})

        if (!foundUser){
            return res.status(401).send({errors : [{msg : "not authorized 2 "}]})
        }

        req.user = foundUser
        next()

    } catch (error) {
        return res.status(401).send({errors : [{msg : "not authorized 3 "}]})
    }
}

module.exports = isAuth