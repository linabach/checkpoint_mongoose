const { check , validateResult, validationResult} = require("express-validator")


exports.registerValidator = () => [
    check("firstname", "you have to insert your firstname !").not().isEmpty(),
    check("name", "you have to insert your name !").not().isEmpty(),
    check("email", "you have to insert an email !").isEmail(),
    check("password", "you have to insert a valid password !").isLength({min:6}),
]


exports.loginValidator = () => [
    check("email", "you have to insert your email !").isEmail(),
    check("password", "you have to insert your password !").isLength({min:6}),
]

exports.validation = (req,res,next) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({errors : errors.array()})
    }
    next()
}