
// import React, { useEffect, useState } from 'react';
// import { get } from '../api/appApi';
// import Typography from '@mui/material/Typography';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import { useNavigate } from 'react-router-dom';
// import proffesions from '../json/proffesions'; // Adjust the path accordingly

// const CreatorProList = () => {
//   const [projects, setProjects] = useState([]);
//   const [filteredProjects, setFilteredProjects] = useState([]);
//   const [selectedProfession, setSelectedProfession] = useState('');
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
//         setFilteredProjects(projectsWithData);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       }
//     };

//     fetchProjects();
//   }, []);

//   const handleCardClick = (project) => {
//     navigate('/creatorProjectInfo', { state: { projectData: project } });
//   };

//   const handleProfessionChange = (profession) => {
//     setSelectedProfession(profession);
//     if (profession === '') {
//       setFilteredProjects(projects);
//     } else {
//       const filtered = projects.filter((project) => project.profession === profession);
//       setFilteredProjects(filtered);
//     }
//   };

//   return (
//     <div style={{ marginTop: '8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <Typography variant="h2" gutterBottom>
//         Creator Projects
//       </Typography>
//       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '80%' }}>
//         <div style={{ marginBottom: '16px', display:'flex'}}>
//           <Typography variant="subtitle1" style={{ marginBottom: '8px' }}>
//             Search by Profession:
//           </Typography>
//           <select value={selectedProfession} onChange={(e) => handleProfessionChange(e.target.value)}>
//             <option value="">All Professions</option>
//             {proffesions.map((profession) => (
//               <option key={profession} value={profession}>
//                 {profession}
//               </option>
//             ))}
//           </select>
//         </div>
//         {filteredProjects.map((project) => (
//           <Card
//             key={project._id}
//             style={{ width: '50%', marginBottom: '16px', cursor: 'pointer', borderRadius: '8px', overflow: 'hidden' }}
//             onClick={() => handleCardClick(project)}
//           >
//             <CardContent style={{ textAlign: 'left' }}>
//               <Typography variant="h4" style={{ marginBottom: '8px' }}>
//                 {project.title}
//               </Typography>
//               <div style={{ margin: '8px 0' }}>
//                 <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
//                   Description:
//                 </Typography>
//                 <Typography variant="body1">{project.description}</Typography>
//               </div>
//               <div style={{ margin: '8px 0' }}>
//                 <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
//                   Duration:
//                 </Typography>
//                 <Typography variant="body1">{project.duration}</Typography>
//               </div>
//               <div style={{ fontWeight: 'bold', margin: '8px 0', display: 'flex', alignItems: 'center' }}>
//                 <Typography style={{ marginRight: '10px' }}>Proposed By:</Typography>
//                 <button
//                   onClick={(e) => {
//                     e.preventDefault();
//                     e.stopPropagation();
//                     navigate('/creatorInfo', { state: { userData: project.proposedByData } });
//                   }}
//                   className="btn mx-2"
//                   style={{ textDecoration: 'none' }}
//                 >
//                   {project.proposedByData
//                     ? `${project.proposedByData?.firstName} ${project.proposedByData?.lastName}`
//                     : 'Not specified'}
//                 </button>
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default CreatorProList;



import React, { useEffect, useState } from 'react';
import { get } from '../api/appApi';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import proffesions from '../json/proffesions'; // Adjust the path accordingly

const CreatorProList = () => {
  const [projects, setProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [selectedProfession, setSelectedProfession] = useState('');
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
        setFilteredProjects(projectsWithData);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    fetchProjects();
  }, []);

  const handleCardClick = (project) => {
    navigate('/creatorProjectInfo', { state: { projectData: project } });
  };

  const handleProfessionChange = (event) => {
    const profession = event.target.value;
    setSelectedProfession(profession);
    if (profession === '') {
      setFilteredProjects(projects);
    } else {
      const filtered = projects.filter((project) => project.profession === profession);
      setFilteredProjects(filtered);
    }
  };

  return (
    <div style={{ marginTop: '8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h2" gutterBottom>
        Creator Projects
      </Typography>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '55%' }}>
        <FormControl fullWidth style={{ marginBottom: '16px' }}>
          <Typography variant="subtitle1" style={{ marginBottom: '8px' }}>
            Search by Profession:
          </Typography>
          <Select
            value={selectedProfession}
            onChange={handleProfessionChange}
            displayEmpty
            inputProps={{ 'aria-label': 'Without label' }}
          >
            <MenuItem value="" disabled>
              All Professions
            </MenuItem>
            {proffesions.map((profession) => (
              <MenuItem key={profession} value={profession}>
                {profession}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
        {filteredProjects.map((project) => (
          <Card
            key={project._id}
            style={{ width: '100%', marginBottom: '16px', cursor: 'pointer', borderRadius: '8px', overflow: 'hidden' }}
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

