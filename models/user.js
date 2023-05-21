const mongoose = require("mongoose")

const Schema = mongoose.Schema

const UserSchema = new Schema({
    first_name: {type: String, required: true},
    last_name: {type:String, required: true},
    username: {type: String, required: true, minLength: 6, maxLength: 20},
    password: {type: String, required: true, minLength: 6, maxLength: 20},
}
)

UserSchema.virtual("full_name").get(function(){
    return `${first_name} ${last_name}`
})