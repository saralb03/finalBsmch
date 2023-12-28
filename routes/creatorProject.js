const { CreatorProjectModel } = require("../models/creatorProjectModel");

const createCreatorProject = async (req, res) => {
  try {
    let creatorProject = new CreatorProjectModel(req.body);
    await creatorProject.save();
    res.status(201).json(creatorProject);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error creating creator project", err });
  }
};

const getCreatorProjects = async (req, res) => {
    try {
      const creatorProjects = await CreatorProjectModel.find();
      res.json(creatorProjects);
    } catch (err) {
      console.log(err);
      res.status(500).json({ msg: "Error getting creator projects", err });
    }
  };

module.exports = {
  createCreatorProject,
  getCreatorProjects,
};
