const mongoose = require('mongoose');

const schema = mongoose.Schema;

const contactschema = new schema(
    {
        name: {
            type: String ,
            required:true
        },
        email : {
            type: String,
            required:true,
            unique:true 
        },
        phone : Number,
        profile_img: String,
        cloudinary_id: String

}
)
module.exports = Contact = mongoose.model("contact" , contactschema )