// const mongoose = require("mongoose");
// const Joi = require("joi");
// const jwt = require("jsonwebtoken");
// const {config} = require("../config/secret")

// let userSchema = new mongoose.Schema({
//   firstName:String,
//   lastName:String,
//   email:String,
//   password:String,
//   birth_date:Date,
//   location:String,
//   img_url:String,
//   date_created:{
//     type:Date , default:Date.now()
//   },
//   // role of the user if regular user or admin
//   role:{
//     type:String, default:"user"
//   },
//   active:{
//     type:Boolean, default: true,
//    }
// })

// exports.UserModel = mongoose.model("users",userSchema);

// exports.createToken = (_id,role) => {
//   let token = jwt.sign({_id,role},config.tokenSecret,{expiresIn:"1440mins"});
//   return token;
// }

// exports.validUser = (_reqBody) => {
//   let joiSchema = Joi.object({
//     firstName:Joi.string().min(2).max(99).required(),
//     lastName:Joi.string().min(2).max(99).required(),
//     email:Joi.string().min(2).max(99).email().required(),
//     password:Joi.string().min(3).max(99).required(),
//     birth_date:Joi.string().min(2).max(99).required(),
//     img_url:Joi.string().min(2).max(99).allow(null,""),
//     location:Joi.string().min(2).max(99).required(),
//   })

//   return joiSchema.validate(_reqBody);
// }

// exports.validLogin = (_reqBody) => {
//   let joiSchema = Joi.object({
//     email:Joi.string().min(2).max(99).email().required(),
//     password:Joi.string().min(3).max(99).required()
//   })

//   return joiSchema.validate(_reqBody);
// }


const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret");

let userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 99,
  },
  lastName: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 99,
  },
  email: {
    type: String,
    unique: true,
    required: true,
    minlength: 2,
    maxlength: 99,
    email: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 99,
  },
  birth_date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 99,
  },
  img_url: {
    type: String,
    minlength: 2,
    maxlength: 99,
    default: null,
  },
  date_created: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
  },
});

// Add a pre-save hook to handle the unique index error
userSchema.pre("save", function (next) {
  mongoose.model("users").findOne({ email: this.email }, function (err, user) {
    if (user) {
      const error = new Error("Email is already in use");
      error.name = "ValidationError: Email is already in use";
      next(error);
    } else {
      next();
    }
  });
});

const UserModel = mongoose.model("users", userSchema);

exports.UserModel = UserModel;

exports.createToken = (_id, role) => {
  let token = jwt.sign({ _id, role }, config.tokenSecret, { expiresIn: "1440mins" });
  return token;
};

exports.validUser = async (_reqBody) => {
  let joiSchema = Joi.object({
    firstName: Joi.string().min(2).max(99).required(),
    lastName: Joi.string().min(2).max(99).required(),
    email: Joi.string().min(2).max(99).email().required(),
    password: Joi.string().min(3).max(99).required(),
    birth_date: Joi.string().min(2).max(99).required(),
    img_url: Joi.string().min(2).max(99).allow(null, ""),
    location: Joi.string().min(2).max(99).required(),
  });

  return joiSchema.validate(_reqBody);
};

exports.validLogin = (_reqBody) => {
  let joiSchema = Joi.object({
    email: Joi.string().min(2).max(99).email().required(),
    password: Joi.string().min(3).max(99).required(),
  });

  return joiSchema.validate(_reqBody);
};
