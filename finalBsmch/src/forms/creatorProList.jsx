import React, { useEffect, useState } from 'react';
import { get } from '../api/appApi'; // replace with the correct path
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';

const CreatorProList = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const url = 'creator-projects'; // replace with the correct URL
        const projectsData = await get(url);
        const projectsWithData = await Promise.all(
          projectsData.map(async (project) => {
            try {
              const creatorId = project.createdBy;
              console.log(creatorId);
              const creatorUrl = `getCreatorById/${creatorId}`; // replace with the correct URL
              const creatorData = await get(creatorUrl);

            //   return { ...project, proposedByData: userData.user };
              return { ...project, proposedByData: creatorData.creator};
            } catch (error) {
              console.error('Error fetching user data:', error);
              return project;
            }
          })
        );
        setProjects(projectsWithData);
        console.log(projects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  return (
    <div style={{ marginTop: '8rem' }}>
      <Typography variant="h2" gutterBottom>
        Creator Projects
      </Typography>
      <List>
        {projects.map((project) => (
          <ListItem key={project._id}>
            <Typography variant="h4">{project.title}</Typography>
            <Typography>Description: {project.description}</Typography>
            {/* <Typography>Date of Creation: {new Date(project.createdAt).toLocaleDateString()}</Typography> */}
            <Typography>Duration: {project.duration}</Typography>
            <Typography>
              Proposed By: {`${project.proposedByData?.firstName} ${project.proposedByData?.lastName}`}
            </Typography>
            {/* Add additional project details as needed */}
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default CreatorProList;
