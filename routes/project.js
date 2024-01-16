const { ProjectModel } = require("../models/projectModel");

const createProject = async (req, res) => {
  try {
    // Assume you have extracted user ID from headers (you can modify this based on your actual implementation)
    // const createdBy = req.headers['user-id'];

    // let project = new ProjectModel({ ...req.body, createdBy });//לבדוק למה הוא הוסיף 3 נקודות, יכול להיות שאין צורך
    let project = new ProjectModel({ ...req.body });
    await project.save();
    res.status(201).json(project);
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Error creating project', err });
  }
};

const getProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.find();
    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error getting projects", err });
  }
};

const getProjectsByUserId = async (req, res) => {
  try {
    const userId = req.params.userId;
    const projects = await ProjectModel.find({ createdBy: userId });

    if (projects.length === 0) {
      return res.json({ msg: "You have no projects yet." });
    }
    res.json(projects);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error getting projects", err });
  }
};


const updateProject = async (req, res) => {
  try {
    const projectId = req.params.projectId;
    const updateData = req.body;

    const updatedProject = await ProjectModel.findByIdAndUpdate(projectId, updateData, { new: true });

    if (!updatedProject) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.json(updatedProject);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error updating project", err });
  }
};

const updateProjectFields = async (req, res) => {
  const projectId = req.params.projectId;
  const { createdBy, ...updateFields } = req.body; // Assuming createdBy is the user ID

  try {
    const project = await ProjectModel.findByIdAndUpdate(
      projectId,
      { $set: updateFields },
      { new: true }
    );

    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error updating project field", err });
  }
};



const getProjectById = async (req, res) => {
  const projectId = req.params.projectId;

  try {
    const project = await ProjectModel.findById(projectId);
    if (!project) {
      return res.status(404).json({ msg: "Project not found" });
    }

    res.json(project);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error getting project by ID", err });
  }
};

const getFilteredProjects = async (req, res) => {
  try {
    const projects = await ProjectModel.find();

    // Specify the fields you want to include
    const allowedFields = ['duration','profession','flexible','workEnvironment','style','teamSize','active' ,
    'createdBy'
    /* add more fields as needed */];

    // Filter projects to include only existing fields and values
    const filteredProjects = projects.map(project => {
      const filteredProject = {};

      // Include only allowed fields
      allowedFields.forEach(field => {
          filteredProject[field] = project[field];
      });
      return filteredProject;
    });
    res.json(filteredProjects);
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error getting projects", err });
  }
};

module.exports = {
  createProject,
  getProjects,
  getProjectsByUserId,
  updateProject,
  updateProjectFields,
  getProjectById,
  getFilteredProjects
};
