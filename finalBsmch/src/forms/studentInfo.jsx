import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Link from '@mui/material/Link';
import { useLocation } from 'react-router-dom';

const StudentInfo = () => {
  const location = useLocation();
  const { userData: studentData } = location.state || {};
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
    birth_date,
    location: userLocation,
    img_url,
    date_created,
    active,
  } = studentData;

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundImage: `url('img/back2.jpg')`, // Add your image URL here
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    color: 'white', // Text color
    padding: '16px',
    marginTop: '60px',
  };

  const innerContainerStyle = {
    position: 'relative', // Added relative positioning for inner container
    width: '600px',
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background color with opacity
    padding: '16px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional: Add a box shadow for a lifted look
  };

  const imageContainerStyle = {
    position: 'absolute',
    top: 5,
    right: 5,
    width: '100px',
    height: '100px',
    borderRadius: '50%',
    overflow: 'hidden',
  };

  const imageStyle = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  const nameContainerStyle = {
    position: 'absolute',
    top: 0,
    left: 0,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    marginBottom: '16px',
  };

  const listItemStyle = {
    color: 'black', // Text color inside the inner container
  };

  return (
    <div style={containerStyle}>
      <div style={innerContainerStyle}>
        <Typography variant="h4" gutterBottom style={{ color: 'black' }}>
          {`${firstName} ${lastName}`}
        </Typography>
        <List>
        <div style={imageContainerStyle}>
        <img
          src={img_url || ' '} // Use the path to a default image if img_url is not specified
          alt="User"
          style={imageStyle}
        />
      </div>
          
        <ListItem style={listItemStyle}>
            <ListItemText primary="About" secondary={about || 'Not specified'} />
          </ListItem>
          <Divider />
          <ListItem style={listItemStyle}>
            <ListItemText primary="Institution" secondary={institution || 'Not specified'} />
          </ListItem>
          <ListItem style={listItemStyle}>
            <ListItemText
              primary="Programming Education"
              secondary={programmingEducation || 'Not specified'}
            />
          </ListItem>
          <ListItem style={listItemStyle}>
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
          <ListItem style={listItemStyle}>
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
          <ListItem style={listItemStyle}>
            <ListItemText
              primary="Languages"
              secondary={languages ? languages.join(', ') : 'Not specified'}
            />
          </ListItem>
          <ListItem style={listItemStyle}>
            <ListItemText
              primary="Environments"
              secondary={environments ? environments.join(', ') : 'Not specified'}
            />
          </ListItem>
          <ListItem style={listItemStyle}>
            <ListItemText primary="Experience" secondary={experience || 'Not specified'} />
          </ListItem>
          <ListItem style={listItemStyle}>
            <ListItemText
              primary="Interests"
              secondary={interests ? interests.join(', ') : 'Not specified'}
            />
          </ListItem>
          <ListItem style={listItemStyle}>
            <ListItemText primary="Birth Date" secondary={birth_date || 'Not specified'} />
          </ListItem>
          <ListItem style={listItemStyle}>
            <ListItemText primary="Location" secondary={userLocation || 'Not specified'} />
          </ListItem>
          <ListItem style={listItemStyle}>
            <ListItemText primary="Date Created" secondary={date_created || 'Not specified'} />
          </ListItem>
          <ListItem style={listItemStyle}>
            <ListItemText primary="Active" secondary={active ? 'Yes' : 'No'} />
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default StudentInfo;

