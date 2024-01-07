const bcrypt = require("bcrypt"); 
const mongoose = require("mongoose");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const { config } = require("../config/secret");

let userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: [true, "first name is requred"],
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
    minLength: 8,
    required: true,
    // select: false,
  },
  passwordConfirm: {
    type: String,
    required: [true, "Please retype the password"],
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
  // img_url: {
  //   type: String,
  //   minlength: 2,
  //   maxlength: 99,
  //   default: null,
  // },
  date_created: {
    type: Date,
    default: Date.now(),
  },
  role: {
    type: String,
    enum: {
      values: ["admin", "user", "premium"],
      message: "the value must be either 'admin','user','premium'",
    },
    default: "user",
  },
  active: {
    type: Boolean,
    default: true,
  },
  // passwordChangedAt: Date,
  password_reset_token: {
    type: String,
  default: null,
},
  password_reset_expires:{ 
    type:Date,
  default: null,
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
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  next();
});

userSchema.pre("save", function (next) {
  // console.log(this);
  this.id = String(this._id);
  next();
});

userSchema.methods.checkPassword = async function (password, hash) {
  return await bcrypt.compare(password, hash);
};

userSchema.methods.createPasswordResetToken = function () {
  // Generate a random token (32 bytes) and convert it to a hexadecimal string
  const resetToken = crypto.randomBytes(32).toString("hex");

  // Save the encrypted reset token into the database
  this.passwordResetToken = crypto
    .createHash("sha256") // Use the desired hashing algorithm, e.g., "sha256"
    .update(resetToken)
    .digest("hex");

  // Set the expiration date for the reset token (10 minutes from now)
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; // milliseconds (10 minutes)

  // Return the plain hexadecimal string token to be sent by email
  return resetToken;
};

const UserModel = mongoose.model("users", userSchema);

exports.UserModel = UserModel;

exports.createToken = (_id, role) => {
  let token = jwt.sign({ _id, role }, config.tokenSecret, { expiresIn: "1440mins" });
  return token;
};

// exports.validUser = async (_reqBody) => {
//   let joiSchema = Joi.object({
//     firstName: Joi.string().min(2).max(99).required(),
//     lastName: Joi.string().min(2).max(99).required(),
//     // email: Joi.string().min(2).max(99).email().required(),
//     // password: Joi.string().min(3).max(99).required(),
//     birth_date: Joi.string().min(2).max(99).required(),
//     img_url: Joi.string().min(2).max(99).allow(null, ""),
//     location: Joi.string().min(2).max(99).required(),
//   });

//   return joiSchema.validate(_reqBody);
// };

exports.validLogin = (_reqBody) => {
  let joiSchema = Joi.object({
    email: Joi.string().min(2).max(99).email().required(),
    password: Joi.string().min(3).max(99).required(),
  });

  return joiSchema.validate(_reqBody);
};


//---------------------------------------------------------
