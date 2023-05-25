
const mongoose = require("mongoose")

const Schema = mongoose.Schema

const MessageSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User"},
    title: {type: String},
    message_body: { type: String, required: true},
    date: {type: Date, required: true}
}
)

