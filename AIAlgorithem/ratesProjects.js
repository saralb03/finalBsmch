const { getFilteredSProjects } = require('../routes/studentProject')
const { getFilteredCProjects } = require('../routes/creatorProject')

const getUserProjects = async (req, res) => {
  try {
    const { user_id, userType } = req.params;
    let filteredSProjects = [];
    let filteredCProjects = [];
    filteredSProjects = await getFilteredSProjects();
    filteredCProjects = await getFilteredCProjects();
    if (userType === 'student') {
      const sProjects = filteredSProjects.filter(project => {
        return project.createdBy && project.createdBy._id.toString() === user_id;
      });
      res.json(sProjects);
    } else if (userType === 'creator') {
      const cProjects = filteredCProjects.filter(project => {
        return project.createdBy && project.createdBy._id.toString() === user_id;
      });
      res.json(cProjects);
    } else {
      // Handle invalid userType
      return res.status(400).json({ msg: "Invalid userType" });
    }
  } catch (err) {
    console.error("Error getting user projects:", err);
    res.status(500).json({ msg: "Error getting user projects", err: err.message });
  }
};


