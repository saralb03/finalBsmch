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
//     const { creatorData } = locatio.state || {};
//     const {
//         about,
//         active,
//         birth_date,
//         date_created,
//         email,
//         entrepreneurshipExperience,
//         firstName,
//         img_url,
//         lastName,
//         linkedin,
//         location,
//         portfolio,
//         professionalBackground,
        
//     } = creatorData;

//     return (
//         <div style={{ padding: '16px', marginTop: '70px' }}>
//             <Typography variant="h4" gutterBottom>
//                 {`${firstName} ${lastName}'s profile`}
//             </Typography>
//             <List>
//                 <ListItem>
//                     <ListItemText primary="About" secondary={about || 'Not specified'} />
//                 </ListItem>
//                 <ListItem>
//                     <ListItemText primary="Active" secondary={active ? 'Yes' : 'No'} />
//                 </ListItem>
//                 <ListItem>
//                     <ListItemText primary="Birth Date" secondary={birth_date || 'Not specified'} />
//                 </ListItem>
//                 <ListItem>
//                     <ListItemText primary="Date Created" secondary={date_created || 'Not specified'} />
//                 </ListItem>
//                 <ListItem>
//                     <ListItemText primary="Email" secondary={email} />
//                 </ListItem>
//                 <ListItem>
//                     <ListItemText
//                         primary="Entrepreneurship Experience"
//                         secondary={entrepreneurshipExperience || 'Not specified'}
//                     />
//                 </ListItem>
//                 <ListItem>
//                     <ListItemText primary="First Name" secondary={firstName} />
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
//                     <ListItemText primary="Last Name" secondary={lastName} />
//                 </ListItem>
//                 <ListItem>
//                     <ListItemText
//                         primary="LinkedIn"
//                         secondary={
//                             linkedin ? (
//                                 <Link href={linkedin} target="_blank" rel="noopener">
//                                     {linkedin}
//                                 </Link>
//                             ) : (
//                                 'Not specified'
//                             )
//                         }
//                     />
//                 </ListItem>
//                 <ListItem>
//                     <ListItemText primary="Location" secondary={location || 'Not specified'} />
//                 </ListItem>
//                 <ListItem>
//                     <ListItemText primary="Portfolio" secondary={portfolio || 'Not specified'} />
//                 </ListItem>
//                 <ListItem>
//                     <ListItemText
//                         primary="Professional Background"
//                         secondary={professionalBackground || 'Not specified'}
//                     />
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
import Link from '@mui/material/Link';
import { useLocation } from 'react-router-dom';

const CreatorInfo = () => {
    const locatio = useLocation();
    const { creatorData } = locatio.state || {};
    const {
        firstName,
        lastName,
        email,
        birth_date,
        location,
        img_url,
        date_created,
        role,
        active,
    } = creatorData;

    return (
        <div style={{ padding: '16px', marginTop: '70px' }}>
            <Typography variant="h4" gutterBottom>
                {`${firstName} ${lastName}'s profile`}
            </Typography>
            <List>
                <ListItem>
                    <ListItemText primary="First Name" secondary={firstName || 'Not specified'} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Last Name" secondary={lastName || 'Not specified'} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Email" secondary={email || 'Not specified'} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Birth Date" secondary={birth_date || 'Not specified'} />
                </ListItem>
                <ListItem>
                    <ListItemText primary="Location" secondary={creatorLocation || 'Not specified'} />
                </ListItem>
                <ListItem>
                    <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                        Image:
                    </Typography>
                    <img
                        src={img_url || ''}  // Use the path to a default image if img_url is not specified
                        alt="User"
                        style={{ maxWidth: '100%', maxHeight: '200px', marginTop: '8px' }}
                    />
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
                <Divider />
            </List>
        </div>
    );
};

export default CreatorInfo;
