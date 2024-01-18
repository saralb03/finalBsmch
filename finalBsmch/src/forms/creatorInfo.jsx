
// import React from 'react';
// import Typography from '@mui/material/Typography';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import ListItemText from '@mui/material/ListItemText';
// import Divider from '@mui/material/Divider';
// import Link from '@mui/material/Link';
// import { useLocation } from 'react-router-dom';

// const CreatorInfo = () => {
//     const locatio = useLocation();
//     const { userData: creatorData } = locatio.state || {};
//     console.log(creatorData);
//     const {
//         firstName,
//         lastName,
//         email,
//         birth_date,
//         location,
//         img_url,
//         date_created,
//         role,
//         active,
//     } = creatorData;

//     return (
//         <div style={{ padding: '16px', marginTop: '70px' }}>
//             <Typography variant="h4" gutterBottom>
//                 {`${firstName} ${lastName}'s profile`}
//             </Typography>
//             <List>
//                 <ListItem>
//                     <ListItemText primary="First Name" secondary={firstName || 'Not specified'} />
//                 </ListItem>
//                 <ListItem>
//                     <ListItemText primary="Last Name" secondary={lastName || 'Not specified'} />
//                 </ListItem>
//                 <ListItem>
//                     <ListItemText primary="Email" secondary={email || 'Not specified'} />
//                 </ListItem>
//                 <ListItem>
//                     <ListItemText primary="Birth Date" secondary={birth_date || 'Not specified'} />
//                 </ListItem>
//                 <ListItem>
//                     <ListItemText primary="Location" secondary={location || 'Not specified'} />
//                 </ListItem>
//                 <ListItem>
//                     <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
//                         Image:
//                     </Typography>
//                     <img
//                         src={img_url || ''}  // Use the path to a default image if img_url is not specified
//                         alt="User"
//                         style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '8px' }}
//                     />
//                 </ListItem>
//                 <ListItem>
//                     <ListItemText primary="Date Created" secondary={date_created || 'Not specified'} />
//                 </ListItem>
//                 <ListItem>
//                     <ListItemText primary="Role" secondary={role || 'Not specified'} />
//                 </ListItem>
//                 <ListItem>
//                     <ListItemText primary="Active" secondary={active ? 'Yes' : 'No'} />
//                 </ListItem>
//                 <Divider />
//             </List>
//         </div>
//     );
// };

// export default CreatorInfo;
import React from 'react';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useLocation, useNavigate } from 'react-router-dom';

const CreatorInfo = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { userData: creatorData } = location.state || {};

    const {
        firstName,
        lastName,
        email,
        birth_date,
        location: userLocation,
        img_url,
        date_created,
        role,
        active,
    } = creatorData;

    // Assume _id is stored in local storage after login
    const storedId = localStorage.getItem('_id');

    const handleEdit = () => {
        // Add logic for handling the edit functionality
        console.log('Edit button clicked');
        // Redirect to the edit page or handle editing logic here
        // For example, you can navigate to a different route for editing
        navigate('/editProfile'); // Replace with the appropriate route
    };

    const containerStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        //backgroundImage: `url('img/back2.jpg')`, // Add your image URL here
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        color: 'white', // Text color
        padding: '16px',
        marginTop: '60px',
    };

    const innerContainerStyle = {
        width: '600px',
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background color with opacity
        padding: '16px',
        borderRadius: '8px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', // Optional: Add a box shadow for a lifted look
    };

    const imageContainerStyle = {
        width: '100px',
        height: '100px',
        borderRadius: '50%',
        overflow: 'hidden',
        position: 'absolute',
        top: 60,
        left: '50%',
        transform: 'translateX(-50%)',
    };

    const imageStyle = {
        width: '100%',
        height: '100%',
        objectFit: 'cover',
    };

    const nameContainerStyle = {
           top: 90,
        left: '13%',
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
                <div style={nameContainerStyle}>
                    <Typography variant="h4" gutterBottom style={{ color: 'black' }}>
                        {`${firstName} ${lastName}`}
                    </Typography>
                </div>
                <div style={imageContainerStyle}>
                    <img src={img_url || ' '} alt="User" style={imageStyle} />
                </div>
                <List>
                    <ListItem style={listItemStyle}>
                        <ListItemText primary="Email" secondary={email || 'Not specified'} />
                    </ListItem>
                    <ListItem style={listItemStyle}>
                        <ListItemText primary="Birth Date" secondary={birth_date || 'Not specified'} />
                    </ListItem>
                    <ListItem style={listItemStyle}>
                        <ListItemText primary="Location" secondary={userLocation || 'Not specified'} />
                    </ListItem>
                    {/* Add other information as needed */}
                    <ListItem style={listItemStyle}>
                        <ListItemText primary="Date Created" secondary={date_created || 'Not specified'} />
                    </ListItem>
                    <ListItem style={listItemStyle}>
                        <ListItemText primary="Role" secondary={role || 'Not specified'} />
                    </ListItem>
                    <ListItem style={listItemStyle}>
                        <ListItemText primary="Active" secondary={active ? 'Yes' : 'No'} />
                    </ListItem>
                    {storedId === creatorData._id && (
                        <ListItem style={listItemStyle}>
                            <Button variant="contained" onClick={handleEdit}>
                                Edit
                            </Button>
                        </ListItem>
                    )}
                </List>
            </div>
        </div>
    );
};

export default CreatorInfo;
