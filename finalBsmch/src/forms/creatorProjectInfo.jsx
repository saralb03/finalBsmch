
import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';

const CreatorProjectInfo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { projectData: creatorProject } = location.state || {};

    const {
        title,
        description,
        duration,
        profession,
        flexible,
        workEnvironment,
        style,
        teamSize,
        dateCreated,
        active,
        experienceLevel,
        toolsPreferred,
        skillrequired,
        createdBy
        // Add other fields as needed
    } = creatorProject;

    // Assume _id is stored in local storage after login
    const storedId = localStorage.getItem('_id');

    const handleEdit = () => {
        // Add logic for handling the edit functionality
        console.log('Edit button clicked');
        // Redirect to the edit page or handle editing logic here
        // For example, you can navigate to a different route for editing
        navigate('/editProject'); // Replace with the appropriate route
    };

    return (
        <div style={{ padding: '28px', marginTop: '60px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Paper elevation={3} style={{ maxWidth: '600px', width: '100%', margin: 'auto', padding: '24px' }}>
                <Typography variant="h4" gutterBottom style={{ marginTop: '20px' }}>
                    {title}
                </Typography>
                <List>
                    {description && (
                        <ListItem>
                            <ListItemText primary="Description" secondary={description} />
                        </ListItem>
                    )}
                    {duration && (
                        <ListItem>
                            <ListItemText primary="Duration" secondary={duration} />
                        </ListItem>
                    )}
                    {profession && (
                        <ListItem>
                            <ListItemText primary="Profession" secondary={profession} />
                        </ListItem>
                    )}
                    {flexible && (
                        <ListItem>
                            <ListItemText primary="Flexible" secondary={flexible} />
                        </ListItem>
                    )}
                    {workEnvironment && (
                        <ListItem>
                            <ListItemText primary="Work Environment" secondary={workEnvironment} />
                        </ListItem>
                    )}
                    {style && (
                        <ListItem>
                            <ListItemText primary="Style" secondary={style ? style.join(', ') : 'Not specified'} />
                        </ListItem>
                    )}
                    {teamSize && (
                        <ListItem>
                            <ListItemText primary="Team Size" secondary={teamSize} />
                        </ListItem>
                    )}
                    {dateCreated && (
                        <ListItem>
                            <ListItemText primary="Date Created" secondary={dateCreated} />
                        </ListItem>
                    )}
                    {active !== undefined && (
                        <ListItem>
                            <ListItemText primary="Active" secondary={active ? 'Yes' : 'No'} />
                        </ListItem>
                    )}
                    {experienceLevel && (
                        <ListItem>
                            <ListItemText primary="Experience Level" secondary={experienceLevel} />
                        </ListItem>
                    )}
                    {toolsPreferred && (
                        <ListItem>
                            <ListItemText
                                primary="Tools Preferred"
                                secondary={toolsPreferred.join(', ') || 'Not specified'}
                            />
                        </ListItem>
                    )}
                    {skillrequired && (
                        <ListItem>
                            <ListItemText
                                primary="Skills Required"
                                secondary={skillrequired.join(', ') || 'Not specified'}
                            />
                        </ListItem>
                    )}

                    {createdBy === storedId && (
                        <ListItem>
                            <Button variant="contained" onClick={handleEdit}>
                                Edit
                            </Button>
                        </ListItem>
                    )}
                </List>
                <Divider />
            </Paper>
        </div>
    );
};

export default CreatorProjectInfo;

