
import React, { useEffect, useState } from 'react';
import { get } from '../api/appApi';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useNavigate } from 'react-router-dom';

const MyProjects = () => {
  const [projects, setProjects] = useState([]);
  const storedId = localStorage.getItem('_id');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const url = `projects/user/${storedId}`;
        const MyprojectsData = await get(url);
        setProjects(MyprojectsData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleCardClick = (project) => {
    console.log(project);
    navigate('/studentProjectInfo', { state: { projectData: project } });
  };

  return (
    <div style={{ marginTop: '8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h2" gutterBottom>
        Student Projects
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        {projects.map((project) => (
          <Card
            key={project._id}
            style={{ width: '600px', marginBottom: '16px', cursor: 'pointer', padding: '16px', borderRadius: '8px' }}
            onClick={() => handleCardClick(project)}
          >
            <CardContent style={{ textAlign: 'left' }}>
              <Typography variant="h4">{project.title}</Typography>
              <div style={{ margin: '10px 0' }}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Description:
                </Typography>
                <Typography variant="body1">{project.description}</Typography>
              </div>
              <div style={{ margin: '10px 0' }}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Duration:
                </Typography>
                <Typography variant="body1">{project.duration}</Typography>
              </div>
              
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MyProjects;
