const mongoose =require("mongoose");
const Joi = require("joi");

const categorySchema = new mongoose.Schema({
  name:String,
  url_name:String,
  info:String,
  img_url:String
})



exports.CategoryModel = mongoose.model("categories",categorySchema);


exports.validateCategory = (_reqBody) => {
  let joiSchema = Joi.object({
    name:Joi.string().min(2).max(99).required(),
    url_name:Joi.string().min(2).max(99).required(),
    info:Joi.string().min(2).max(500).required(),
    img_url:Joi.string().min(2).max(200).required()
  })
  return joiSchema.validate(_reqBody);
}