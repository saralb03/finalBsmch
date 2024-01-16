const { CreatorProjectModel } = require("../models/creatorProjectModel");
const {CreatorModel } = require("../models/creatorModel");

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
const getFilteredCProjects = async (req, res) => {
  try {
    const projects = await CreatorProjectModel.find();

    // Specify the fields you want to include in the project
    const allowedFields = [
      'duration','description', 'profession', 'flexible', 'workEnvironment', 'style', 'teamSize', 'active',
      'createdBy', 'experienceLevel', 'toolsPreferred', 'skillrequired' /* add more fields as needed */
    ];

    // Specify the fields you want to include in the creator details
    const creatorFields = ['professionalBackground', 'active', 'location','_id'];

    // Filter projects to include only existing fields and values
    const filteredProjects = await Promise.all(projects.map(async (project) => {
      const filteredProject = {};

      // Include only allowed fields in the project
      for (const field of allowedFields) {
        // Check if the field exists in the project
       // if (project.hasOwnProperty(field)) {
          // If the field is 'createdBy', fetch the creator details
          if (field === 'createdBy') {
            const creatorId = project[field];
            const creator = await CreatorModel.findById(creatorId);

            // Include specified fields from the creator details directly in 'createdBy'
            filteredProject[field] = {};
            creatorFields.forEach(creatorField => {
              filteredProject[field][creatorField] = creator[creatorField];
            });
          } else {
            // For other fields, copy the value from the project
            filteredProject[field] = project[field];
          }
        }
    //  }

      return filteredProject;
    }));

    res.json(filteredProjects);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error getting projects", err });
  }
};




module.exports = {
  createCreatorProject,
  getCreatorProjects,
  getFilteredCProjects
};
