const { CreatorModel } = require("../models/creatorModel");
const Joi = require("joi"); // Import Joi for validation

// const validCreator = (_reqBody) => {
//   const joiSchema = Joi.object({
//     // Define validation fields for CreatorModel properties
//     // Example:
//     // name: Joi.string().min(2).max(99).required(),
//     // email: Joi.string().email().required(),
//     // ...

//     // For now, assuming no specific validation for the creator
//   });

//   return joiSchema.validate(_reqBody);
// };

const createCreator = async (req, res) => {
//   let validBody = validCreator(req.body);

//   if (validBody.error) {
//     return res.status(400).json(validBody.error.details);
//   }

  try {
    let creator = new CreatorModel(req.body);
    // Additional processing specific to creator, if needed
    await creator.save();
    res.status(201).json(creator);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error saving creator", err });
  }
};
const getCreatorById = async (req, res) => {
  try {
    const creatorId = req.params.creatorId; 
    const creator = await CreatorModel.findById(creatorId);
    
    if (!creator) {
      return res.json({ msg: "Creator not found" });
    }
    
    res.json({ creator });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error getting creator", err });
  }
};


module.exports = {
  createCreator,
  getCreatorById
};
