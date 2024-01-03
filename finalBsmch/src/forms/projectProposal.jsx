import React, { useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import proffesions from "../json/proffesions";
// import projects from "../json/projects";
import allJson from "../json/alljson";
import ComboBoxSelector from '../comps_stracture/comboBoxSelector';
import CheckboxSelector from "../comps_stracture/checkBoxSelector";

const theme = createTheme();

function ProjectProposal() {

  const [formData, setFormData] = useState(null);
  const [rolled, setRolled] = useState(false);
  const titleRef = useRef();
  const descriptionRef = useRef();
  const durationRef = useRef();
  const professionRef = useRef();
  const projectRef = useRef();
  const languagesRef = useRef();
  const toolsRef = useRef();
  const skillsRequiredRef = useRef();
  const flexibleRef = useRef();
  const fieldOfWorkRef = useRef();
  const workEnvironmentRef = useRef();
  const requiredLanguagesRef = useRef();
  const styleRef = useRef();

  const [projectsAr, setProjectsAr] = useState([]);
  const [languagesAr, setLanguagesAr] = useState([]);
  const [toolsAr, setToolsAr] = useState([]);
  const [selectedProfession, setSelectedProfession] = useState("");

  const handleProfessionSelect = (selectedProfessionName) => {
    console.log('Selected profession:', selectedProfessionName);
    setSelectedProfession(selectedProfessionName);
    const selectedProfession = allJson.find((profession) => profession.name === selectedProfessionName);
    if (selectedProfession) {
      // Access other fields of the selected profession
      const optionalProjects = selectedProfession.optionalProjects;
      const optionalLanguages = selectedProfession.optionalLanguages;
      const environmentsOfWork = selectedProfession.environmentsOfWork;
      setProjectsAr(optionalProjects);
      setLanguagesAr(optionalLanguages);
      setToolsAr(environmentsOfWork);
    }
    // const filteredProjects = projects.filter((project) =>
    //   Object.keys(project).includes(selectedProfessionName)
    // );
    // setProjectsAr(filteredProjects[0][selectedProfession]);
    professionRef.current = selectedProfession;
  };
  const handleProjectSelect = (selectedProject) => {
    console.log('Selected project:', selectedProject);
    projectRef.current = selectedProject;
  };

  const handleLanguagesSelect = (selectedLanguage) => {
    console.log('Selected language:', selectedLanguage);
    languagesRef.current = selectedLanguage;
  };

  const handleToolsSelect = (selectedTools) => {
    console.log('Selected tools:', selectedTools);
    toolsRef.current = selectedTools;
  };




  const submitForm = () => {
    const data = {
      title: titleRef.current.value,
      description: descriptionRef.current.value,
      duration: durationRef.current.value,
      proffesion: professionRef.current.value,
      project: projectRef.current.value,
      languages: languagesRef.current.value.split(","),
      tools: toolsRef.current.value.split(","),
      skillsRequired: skillsRequiredRef.current.value.split(","),
      flexible: flexibleRef.current.checked,
      fieldOfWork: fieldOfWorkRef.current.value,
      workEnvironment: workEnvironmentRef.current.value,
      requiredLanguages: requiredLanguagesRef.current.value.split(","),
      style: styleRef.current.value,
    };

    console.log(data);
    setFormData(data);
  };

  const toggleRoll = () => {
    setRolled(!rolled);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth={rolled ? 'xs' : 'sm'} style={{ marginTop: '6rem' }}>
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Project Proposal
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Project Title"
                  autoFocus
                  inputRef={titleRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Project Description"
                  name="description"
                  multiline
                  rows={4}
                  inputRef={descriptionRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="duration"
                  label="Project Duration in days"
                  name="duration"
                  type="number"
                  inputRef={durationRef}
                />
              </Grid>
              <Grid item xs={12}>
                <ComboBoxSelector options={proffesions} onSelect={handleProfessionSelect} selectItem={"select proffesion"} />
              </Grid>
              {selectedProfession && (
                <Grid item xs={12}>
                  <CheckboxSelector
                    options={projectsAr}
                    onSelect={handleProjectSelect}
                    selectItem="Select Project"
                  />
                </Grid>
              )}
              {selectedProfession && (
                <Grid item xs={12}>
                  <CheckboxSelector
                    options={languagesAr}
                    onSelect={handleLanguagesSelect}
                    selectItem="Select Languages"
                  />
                </Grid>
              )}

              {selectedProfession && (
                <Grid item xs={12}>
                  <CheckboxSelector
                    options={toolsAr}
                    onSelect={handleToolsSelect}
                    selectItem="Select tools"
                  />
                </Grid>
              )}

              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="skillsRequired"
                  label="Skills Required (comma-separated)"
                  name="skillsRequired"
                  inputRef={skillsRequiredRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="fieldOfWork"
                  label="Field of Work"
                  name="fieldOfWork"
                  inputRef={fieldOfWorkRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="workEnvironment"
                  label="Work Environment"
                  name="workEnvironment"
                  inputRef={workEnvironmentRef}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="style"
                  label="Project Style"
                  name="style"
                  inputRef={styleRef}
                />
              </Grid>
              {/* Add more fields as needed */}
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={submitForm}
                sx={{ mt: 3, mb: 2 }}
              >
                Submit Proposal
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={toggleRoll}
                sx={{ mt: 1, mb: 2 }}
              >
                {rolled ? 'Expand Form' : 'Roll Form'}
              </Button>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="/" variant="body2">
                  Back to Home
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {formData && (
        <Box mt={4}>
          <Typography variant="h6" align="center">
            Submitted Proposal:
          </Typography>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </Box>
      )}
    </ThemeProvider>
  );
}

export default ProjectProposal;


