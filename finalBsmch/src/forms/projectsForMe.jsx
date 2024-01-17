import React, { useEffect, useState } from 'react';
import { get } from '../api/appApi';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { getData } from '../api/apiService'

const ProjectsForMe = async () => {
    const [projects, setProjects] = useState([]);
    const _id = localStorage.getItem('_id');
    const typeUser = localStorage.getItem('user');
    const urlS = 'getFilteredSProjects';
    const urlC = 'getFilteredCProjects';
    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const filteredSProjects = await get(urlS);
                const filteredCProjects = await get(urlC);
                if (typeUser === 'creator') {
                    const url1 = 'getFilteredSProjects';
                }
                else if (typeUser === 'student') {
                    const url1 = 'getFilteredCProjects';
                }

            } catch (error) {
                console.error(error);
                alert(error.message);
            }
            try {
                const url1 = `projects/user/${_id}`;
                const projectsData = await get(url1);



                const projectsWithData = await Promise.all(
                    projectsData.map(async (project) => {
                        try {
                            const studentId = project.createdBy;
                            const studentUrl = `getStudentById/${studentId}`;
                            const studentData = await get(studentUrl);
                            return { ...project, proposedByData: studentData.student };
                        } catch (error) {
                            console.error('Error fetching student data:', error);
                            return project;
                        }
                    })
                );

                setProjects(projectsWithData);
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
                            <div style={{ fontWeight: 'bold', margin: '10px 0' }}>
                                Proposed By:
                            </div>
                            <button
                                onClick={(e) => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    navigate('/studentInfo', { state: { userData: project.proposedByData } });
                                }}
                                className="btn mx-2"
                                style={{ textDecoration: 'none' }}
                            >
                                {project.proposedByData
                                    ? `${project.proposedByData?.firstName} ${project.proposedByData?.lastName}`
                                    : 'Not specified'}
                            </button>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
};

export default ProjectsForMe;
