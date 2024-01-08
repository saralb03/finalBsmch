// import React, { useEffect, useState } from 'react';
// import { get } from '../api/appApi'; // replace with the correct path
// import Typography from '@mui/material/Typography';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import List from '@mui/material/List';
// import ListItem from '@mui/material/ListItem';
// import { useNavigate } from 'react-router-dom';

// const CreatorProList = () => {
//   const [projects, setProjects] = useState([]);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const url = 'creator-projects'; // replace with the correct URL
//         const projectsData = await get(url);
//         const projectsWithData = await Promise.all(
//           projectsData.map(async (project) => {
//             try {
//               const creatorId = project.createdBy;
//               const creatorUrl = `getCreatorById/${creatorId}`; // replace with the correct URL
//               const creatorData = await get(creatorUrl);
//               return { ...project, proposedByData: creatorData.creator };
//             } catch (error) {
//               console.error('Error fetching user data:', error);
//               return project;
//             }
//           })
//         );
//         setProjects(projectsWithData);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const handleCardClick = (project) => {
//     navigate('/creatorProjectInfo', { state: { projectData: project } });
//   };

//   return (
//     <div style={{ marginTop: '8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <Typography variant="h2" gutterBottom>
//         Creator Projects
//       </Typography>
//       <List>
//         {projects.map((project) => (
//           <ListItem key={project._id}>
//             {/* Use onClick to navigate */}
//             <Card
//               style={{ width: '100%', marginBottom: '16px', cursor: 'pointer' }}
//               onClick={() => handleCardClick(project)}
//             >
//               <CardContent>
//                 <Typography variant="h4">{project.title}</Typography>
//                 <div>
//                   <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
//                     Description:
//                   </Typography>
//                   <Typography variant="body1">{project.description}</Typography>
//                 </div>
//                 <div>
//                   <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
//                     Duration:
//                   </Typography>
//                   <Typography variant="body1">{project.duration}</Typography>
//                 </div>
//                 <div style={{ fontWeight: 'bold', marginLeft: '10px' }}>
//                   Proposed By:
//                 </div>
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation(); // Stop the event from propagating to the card
//                     navigate('/creatorInfo', { state: { userData: project.proposedByData } });
//                   }}
//                   className="btn mx-2"
//                   style={{ textDecoration: 'none' }}
//                 >
//                   {project.proposedByData
//                     ? `${project.proposedByData?.firstName} ${project.proposedByData?.lastName}`
//                     : 'Not specified'}
//                 </button>
//               </CardContent>
//             </Card>
//           </ListItem>
//         ))}
//       </List>
//     </div>
//   );
// };

// export default CreatorProList;
import React, { useEffect, useState } from 'react';
import { get } from '../api/appApi';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import { useNavigate } from 'react-router-dom';

const CreatorProList = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const url = 'creator-projects'; // replace with the correct URL
        const projectsData = await get(url);
        const projectsWithData = await Promise.all(
          projectsData.map(async (project) => {
            try {
              const creatorId = project.createdBy;
              const creatorUrl = `getCreatorById/${creatorId}`; // replace with the correct URL
              const creatorData = await get(creatorUrl);
              return { ...project, proposedByData: creatorData.creator };
            } catch (error) {
              console.error('Error fetching user data:', error);
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
    navigate('/creatorProjectInfo', { state: { projectData: project } });
  };

  return (
    <div style={{ marginTop: '8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h2" gutterBottom>
        Creator Projects
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
        {projects.map((project) => (
          <Card
            key={project._id}
            style={{ width: '50%', marginBottom: '16px', cursor: 'pointer', borderRadius: '8px', overflow: 'hidden' }}
            onClick={() => handleCardClick(project)}
          >
            <CardContent style={{ textAlign: 'left' }}>
              <Typography variant="h4" style={{ marginBottom: '8px' }}>
                {project.title}
              </Typography>
              <div style={{ margin: '8px 0' }}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Description:
                </Typography>
                <Typography variant="body1">{project.description}</Typography>
              </div>
              <div style={{ margin: '8px 0' }}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Duration:
                </Typography>
                <Typography variant="body1">{project.duration}</Typography>
              </div>
              <div style={{ fontWeight: 'bold', margin: '8px 0', display: 'flex', alignItems: 'center' }}>
                <Typography style={{ marginRight: '10px' }}>Proposed By:</Typography>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    navigate('/creatorInfo', { state: { userData: project.proposedByData } });
                  }}
                  className="btn mx-2"
                  style={{ textDecoration: 'none' }}
                >
                  {project.proposedByData
                    ? `${project.proposedByData?.firstName} ${project.proposedByData?.lastName}`
                    : 'Not specified'}
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default CreatorProList;
