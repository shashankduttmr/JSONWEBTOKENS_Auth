const mongoose = require('mongoose')

const {Schema} = mongoose

const userSchema = new Schema({
    firstname:{
        type:String,
        required:[true]

    },
    lastname:{
        type: String,
        required:[true]
    },
    email:{
        type:String,
        required:[true],
        unique:[true]
    },
    password:{
        type:String,
        required:[true]
    },
    token:{
        type: String
    }
})




module.exports = mongoose.model('User', userSchema)