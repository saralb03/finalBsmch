// import React, { useEffect, useState } from 'react';
// import { get } from '../api/appApi';
// import Typography from '@mui/material/Typography';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import { useNavigate } from 'react-router-dom';

// const MightInterests = () => {
//   const [projects, setProjects] = useState([]);
//   const storedId = localStorage.getItem('_id');
//   const userType = localStorage.getItem('user');
//   const navigate = useNavigate();

//   useEffect(() => {
//     const fetchProjects = async () => {
//       try {
//         const url = `projects/user/${storedId}`;
//         const myProjectsData = await get(url);

//         let url2;
//         if (userType === 'student') {
//           url2 = 'creator-projects';
//         } else {
//           url2 = 'student-projects';
//         }
//         const mightInterestProjectsData = await get(url2);

//         // Calculate similarity scores for each project
//         const projectsWithSimilarity = mightInterestProjectsData.map((project) => {
//           const { similarityScore, mostSimilarProject } = calculateSimilarity(myProjectsData, project, myProjectsData);
//           return { ...project, similarityScore, mostSimilarProject };
//         });

//         // Sort projects by similarity score in descending order
//         const sortedProjects = projectsWithSimilarity.sort((a, b) => b.similarityScore - a.similarityScore);

//         setProjects(sortedProjects);
//       } catch (error) {
//         console.error('Error fetching projects:', error);
//       }
//     };
//     const calculateSimilarity = (myProject, otherProject, myProjects) => {
//         // Fields for comparison
//         const fieldsToCompare = ['title', 'description', 'duration', 'profession', 'flexible', 'workEnvironment', 'style', 'teamSize'];
      
//         // Count common keywords in specified fields
//         const commonKeywordsCount = fieldsToCompare.reduce((count, field) => {
//           const myFieldValue = String(myProject[field]).toLowerCase();
//           const otherFieldValue = String(otherProject[field]).toLowerCase();
      
//           // Exclude 'active' field from comparison
//           if (field !== 'active') {
//             count += myFieldValue === otherFieldValue ? 1 : 0;
//           } else {
//             // Handle the 'active' field separately
//             count += myFieldValue === otherFieldValue ? 1 : 0;
//           }
      
//           return count;
//         }, 0);
      
//         // Calculate similarity score
//         const totalFieldsCount = fieldsToCompare.length; // Include 'active' field
//         const similarityScore = (commonKeywordsCount / totalFieldsCount) * 100;
      
//         // Find the most similar project from my projects
//         const mostSimilarProject = myProjects.reduce((mostSimilar, myProject) => {
//           const projectSimilarity = fieldsToCompare.reduce((projectCount, field) => {
//             const myFieldValue = String(myProject[field]).toLowerCase();
//             const otherFieldValue = String(otherProject[field]).toLowerCase();
      
//             // Exclude 'active' field from comparison
//             if (field !== 'active') {
//               projectCount += myFieldValue === otherFieldValue ? 1 : 0;
//             } else {
//               // Handle the 'active' field separately
//               projectCount += myFieldValue === otherFieldValue ? 1 : 0;
//             }
      
//             return projectCount;
//           }, 0);
      
//           const similarity = (projectSimilarity / totalFieldsCount) * 100;
      
//           return similarity > mostSimilar.similarity ? { id: myProject._id, similarity } : mostSimilar;
//         }, { id: null, similarity: 0 });
      
//         return { similarityScore, mostSimilarProject };
//       };
      

//     fetchProjects();
//   }, [storedId, userType]);

//   const handleCardClick = (project) => {
//     console.log(project);
//     navigate('/studentProjectInfo', { state: { projectData: project } });
//   };

//   return (
//     <div style={{ marginTop: '8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//       <Typography variant="h2" gutterBottom>
//         Projects Might Interest You
//       </Typography>
//       <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
//         {projects.map((project) => (
//           <Card
//             key={project._id}
//             style={{ width: '600px', marginBottom: '16px', cursor: 'pointer', padding: '16px', borderRadius: '8px' }}
//             onClick={() => handleCardClick(project)}
//           >
//             <CardContent style={{ textAlign: 'left' }}>
//               <Typography variant="h4">{project.title}</Typography>
//               <div style={{ margin: '10px 0' }}>
//                 <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
//                   Description:
//                 </Typography>
//                 <Typography variant="body1">{project.description}</Typography>
//               </div>
//               <div style={{ margin: '10px 0' }}>
//                 <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
//                   Duration:
//                 </Typography>
//                 <Typography variant="body1">{project.duration}</Typography>
//               </div>
//               <div style={{ margin: '10px 0' }}>
//                 <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
//                   Similarity Score:
//                 </Typography>
//                 <Typography variant="body1">{project.similarityScore.toFixed(2)}%</Typography>
//               </div>
//               <div style={{ margin: '10px 0' }}>
//                 <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
//                   Most Similar Project from Yours:
//                 </Typography>
//                 {project.mostSimilarProject.id ? (
//                   <>
//                     <Typography variant="body1">Project ID: {project.mostSimilarProject.id}</Typography>
//                     <Typography variant="body1">Similarity: {project.mostSimilarProject.similarity.toFixed(2)}%</Typography>
//                   </>
//                 ) : (
//                   <Typography variant="body1">No similar project found from your projects</Typography>
//                 )}
//               </div>
//             </CardContent>
//           </Card>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default MightInterests;
import React, { useEffect, useState } from 'react';
import { get } from '../api/appApi';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

const MightInterests = () => {
  const [projects, setProjects] = useState([]);
  const storedId = localStorage.getItem('_id');
  const userType = localStorage.getItem('user');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const url = `projects/user/${storedId}`;
        const myProjectsData = await get(url);

        let url2;
        if (userType === 'student') {
          url2 = 'creator-projects';
        } else {
          url2 = 'student-projects';
        }
        const mightInterestProjectsData = await get(url2);

        // Calculate similarity scores for each project
        const projectsWithSimilarity = mightInterestProjectsData.map((project) => {
          const similarityScore = calculateSimilarity(myProjectsData, project);
          const mostSimilarProject = findMostSimilarProject(myProjectsData, project);
          return { ...project, similarityScore, mostSimilarProject };
        });

        // Sort projects by similarity score in descending order
        const sortedProjects = projectsWithSimilarity.sort((a, b) => b.similarityScore - a.similarityScore);

        setProjects(sortedProjects);
      } catch (error) {
        console.error('Error fetching projects:', error);
      }
    };

    const calculateSimilarity = (myProject, otherProject) => {
      // Fields for comparison
      const fieldsToCompare = ['title', 'description', 'duration', 'profession', 'flexible', 'workEnvironment', 'style', 'teamSize'];

      // Count common keywords in specified fields
      const commonKeywordsCount = fieldsToCompare.reduce((count, field) => {
        const myFieldValue = String(myProject[field]).toLowerCase();
        const otherFieldValue = String(otherProject[field]).toLowerCase();

        // Exclude 'active' field from comparison
        if (field !== 'active') {
          count += myFieldValue === otherFieldValue ? 1 : 0;
        } else {
          // Handle the 'active' field separately
          count += myFieldValue === otherFieldValue ? 1 : 0;
        }

        return count;
      }, 0);

      // Calculate similarity score
      const totalFieldsCount = fieldsToCompare.length; // Include 'active' field
      const similarityScore = (commonKeywordsCount / totalFieldsCount) * 100;

      return similarityScore;
    };

    const findMostSimilarProject = (myProjects, otherProject) => {
      const similarityScores = myProjects.map((myProject) => {
        return { title: myProject.title, similarityScore: calculateSimilarity(myProject, otherProject) };
      });

      const mostSimilar = similarityScores.reduce((mostSimilar, current) => {
        return current.similarityScore > mostSimilar.similarityScore ? current : mostSimilar;
      }, { title: '', similarityScore: 0 });

      return mostSimilar.title ? mostSimilar : null;
    };

    fetchProjects();
  }, [storedId, userType]);

  const handleCardClick = (project) => {
    navigate('/studentProjectInfo', { state: { projectData: project } });
  };

  return (
    <div style={{ marginTop: '8rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <Typography variant="h2" gutterBottom>
        Projects May Interests You
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
              <div style={{ margin: '10px 0' }}>
                <Typography variant="subtitle1" style={{ fontWeight: 'bold' }}>
                  Most Similar Project from Yours:
                </Typography>
                {project.mostSimilarProject && (
                  <Button
                    variant="outlined"
                    onClick={() => navigate('/studentProjectInfo', { state: { projectData: project.mostSimilarProject } })}
                  >
                    {`${project.mostSimilarProject.title} (${project.mostSimilarProject.similarityScore.toFixed(2)}%)`}
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default MightInterests;

