const mongoose = require("mongoose");
const { UserModel } = require("./userModel");

const creatorSchema = new mongoose.Schema({
  // Additional properties for creator
  entrepreneurshipExperience: String,
  professionalBackground: String,
  about: String,
  linkedin: String,
  portfolio: String,
});

const CreatorModel = UserModel.discriminator("creators", creatorSchema);

exports.CreatorModel = CreatorModel;
