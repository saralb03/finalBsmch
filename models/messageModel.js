const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    message: {type: String,required: [true, "type your message"],minlength: 1,maxlength: 99,},
    users: [String],
    sender:{type: String,required: [true, "type your userName"],minlength: 2,maxlength: 99,},
    // sender: {type: mongoose.Schema.Types.ObjectId,ref: "User",required: true,},
  }
//   {
//     timestamps: true,
//   }
);
const MessageModel = mongoose.model("messages", messageSchema);
module.exports = MessageModel;