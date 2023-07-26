// require mongoose

const mongoose = require('mongoose')

// connectDb

const connectDb = async ()=>{
    try {
        await mongoose.connect(process.env.DB_URI)
        console.log('database connected')
    } catch (error) {
        console.log('database is not connected')
    }
}
module.exports = connectDb