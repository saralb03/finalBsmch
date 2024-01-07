import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';

const StudentInfo = ({studentData}) => {
  const {
    institution,
    programmingEducation,
    linkedin,
    github,
    languages,
    environments,
    experience,
    interests,
    about,
    firstName,
    lastName,
    email,
    birth_date,
    location,
    img_url,
    date_created,
    role,
    active,
  } = studentData;

  return (
    <div style={{ padding: '16px' }}>
      <Typography variant="h4" gutterBottom>
        {`${firstName} ${lastName}'s Resume`}
      </Typography>
      <List>
        <ListItem>
          <ListItemText primary="Institution" secondary={institution || 'Not specified'} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Programming Education"
            secondary={programmingEducation || 'Not specified'}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="LinkedIn"
            secondary={
              linkedin ? (
                <Link href={linkedin} target="_blank" rel="noopener">
                  {linkedin}
                </Link>
              ) : (
                'Not specified'
              )
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="GitHub"
            secondary={
              github ? (
                <Link href={github} target="_blank" rel="noopener">
                  {github}
                </Link>
              ) : (
                'Not specified'
              )
            }
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Languages"
            secondary={languages ? languages.join(', ') : 'Not specified'}
          />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Environments"
            secondary={environments ? environments.join(', ') : 'Not specified'}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="Experience" secondary={experience || 'Not specified'} />
        </ListItem>
        <ListItem>
          <ListItemText
            primary="Interests"
            secondary={interests ? interests.join(', ') : 'Not specified'}
          />
        </ListItem>
        <ListItem>
          <ListItemText primary="About" secondary={about || 'Not specified'} />
        </ListItem>
        <Divider />
        <ListItem>
          <ListItemText primary="First Name" secondary={firstName} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Last Name" secondary={lastName} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Email" secondary={email} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Birth Date" secondary={birth_date || 'Not specified'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Location" secondary={location || 'Not specified'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Image URL" secondary={img_url || 'Not specified'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Date Created" secondary={date_created || 'Not specified'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Role" secondary={role || 'Not specified'} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Active" secondary={active ? 'Yes' : 'No'} />
        </ListItem>
      </List>
    </div>
  );
};

export default StudentInfo;
