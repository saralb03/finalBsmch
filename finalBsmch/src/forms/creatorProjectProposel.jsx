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
import ComboBoxSelector from '../comps_stracture/comboBoxSelector';
import experienceLevels from "../json/experienceLevels";
import toolsPreferredOptions from "../json/toolsPreferredOptions";
import CheckboxSelector from "../comps_stracture/checkBoxSelector";
import { apiService } from '../api/apiService';
import { useLocation } from 'react-router-dom';
import Chip from "@mui/material/Chip";
import { useNavigate } from 'react-router-dom';
const theme = createTheme();

function CreatorProjectProposal({ formData }) {
  const navigate = useNavigate();
  const [errors, setErrors] = useState({});
  const [skill, setSkill] = useState('');
  const [skills, setSkills] = useState([]);
  const [tool, setTool] = useState('');
  const [tools, setTools] = useState([]);
  const [experienceLevel, setExperienceLevel] = useState('');
  const {postData}= apiService();
  const locatio = useLocation();
  const { projectData: projectProposelData } = locatio.state || {};

  const submitForm = async(event) => {
    event.preventDefault();
        let obj = {
            ...projectProposelData,
            experienceLevel,
            tools,
            skills
        }
    const validationErrors = validate(obj);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log(obj);
    }
    try {
      const response = await postData('creator-projects',obj);
      navigate('/homeComp');
      console.log(response);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }

    // Handle form submission logic here

    // Optionally, you can redirect or show a success message after submission
    console.log("Form submitted:", obj);
  };

  const handleExperienceLevelSelect = (selectedExperienceLevel) => {
    console.log('Selected experience level:', selectedExperienceLevel);
    setExperienceLevel(selectedExperienceLevel);
  };

  const handleAddTool = () => {
    if (tool.trim() !== '') {
      setTools((prevTools) => [...prevTools, tool]);
      setTool('');
    }
  };

  const handleRemoveTool = (index) => {
    setTools((prevTools) =>
      prevTools.filter((_, i) => i !== index)
    );
  };

  const handleAddSkill = () => {
    if (skill.trim() !== '') {
      setSkills((prevSkills) => [...prevSkills, skill]);
      setSkill('');
    }
  };

  const handleRemoveSkill = (index) => {
    setSkills((prevSkills) =>
      prevSkills.filter((_, i) => i !== index)
    );
  };

  const validate = (values) => {
    const errors = {};
    if (!values.experienceLevel) {
      errors.experienceLevel = "Required";
    }
    if (values.tools.length === 0) {
      errors.tool = "At least one tool is required";
    }
    if (values.skills.length === 0) {
      errors.skill = "At least one skill is required";
    }
    

    return errors;
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="sm" style={{ marginTop: '8rem' }}>
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
            Creator Project Proposal
          </Typography>
          <Box
            component="form"
            noValidate
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12}>
                {/* ComboBoxSelector for experienceLevels */}
                <ComboBoxSelector
                  options={experienceLevels}
                  onSelect={handleExperienceLevelSelect}
                  selectItem="Select Experience Level"
                //   error = {!!errors.location}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Tools
                </Typography>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      label="Add Tool"
                      variant="outlined"
                      value={tool}
                      onChange={(e) => setTool(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleAddTool}
                    >
                      Add
                    </Button>
                  </Grid>
                  {tools.map((tool, index) => (
                    <Grid item key={index}>
                      <Chip
                        label={tool}
                        onDelete={() => handleRemoveTool(index)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Skills
                </Typography>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      label="Add Skill"
                      variant="outlined"
                      value={skill}
                      onChange={(e) => setSkill(e.target.value)}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleAddSkill}
                    >
                      Add
                    </Button>
                  </Grid>
                  {skills.map((skill, index) => (
                    <Grid item key={index}>
                      <Chip
                        label={skill}
                        onDelete={() => handleRemoveSkill(index)}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>

            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={submitForm}
                sx={{ mt: 3, mb: 2 }}
              >
                Submit Form
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
    </ThemeProvider>
  );
}

export default CreatorProjectProposal;

