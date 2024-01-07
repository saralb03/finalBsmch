import React, { useEffect, useState } from 'react';
import { get } from '../api/appApi';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { Link as RouterLink } from 'react-router-dom';
import StudentInfo from  './studentInfo'

const StudentProList = () => {
    const [projects, setProjects] = useState([]);

    useEffect(() => {
        const fetchProjects = async () => {
            try {
                const url = 'student-projects';
                const projectsData = await get(url);

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

    return (
        <div style={{ marginTop: '8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Typography variant="h2" gutterBottom>
                Student Projects
            </Typography>
            <List>
                {projects.map((project) => (
                    <ListItem key={project._id}>
                        <Card style={{ width: '100%', marginBottom: '16px' }}>
                            <CardContent>
                                <Typography variant="h4">{project.title}</Typography>
                                <div>
                                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                                        Description:
                                    </Typography>
                                    <Typography variant="body1">{project.description}</Typography>
                                </div>
                                <div>
                                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                                        Duration:
                                    </Typography>
                                    <Typography variant="body1">{project.duration}</Typography>
                                </div>
                                <div>
                                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                                        Proposed By:
                                    </Typography>
                                    <Typography variant="body1">
                                        {project.proposedByData ? (
                                            <RouterLink
                                                to={{
                                                    pathname: `/studentInfo/${project.proposedByData?._id}`,
                                                    // pathname: `./studentInfo`,
                                                    state: { userData: project.proposedByData },
                                                }}
                                                color="inherit"
                                                style={{ textDecoration: 'none' }}
                                            >
                                                {`${project.proposedByData?.firstName} ${project.proposedByData?.lastName}`}
                                            </RouterLink>
                                        ) : (
                                            'Not specified'
                                        )}
                                    </Typography>
            
                                </div>
                                {/* <div>
                                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                                        Proposed By:
                                    </Typography>
                                    <Typography variant="body1">
                                        {project.proposedByData ? (
                                            // Include StudentInfo as a component here
                                            <StudentInfo studentData={project.proposedByData} />
                                        ) : (
                                            'Not specified'
                                        )}
                                    </Typography>
                                </div> */}
                                {/* Add additional project details as needed */}
                            </CardContent>
                        </Card>
                    </ListItem>
                ))}
            </List>
        </div>
    );
};

export default StudentProList;
