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

const theme = createTheme();

function CreatorProjectProposal() {
  const workDomainRef = useRef();
  const experienceLevelRef = useRef();
  const teamSizeRef = useRef();
  const toolsPreferredRef = useRef();

  const submitForm = () => {

    const data = {
      workDomain: workDomainRef.current.value,
      experienceLevel: experienceLevelRef.current.value,
      teamSize: teamSizeRef.current.value,
      toolsPreferred: toolsPreferredRef.current.value.split(",")
    };

    // Handle form submission logic here

    // Optionally, you can redirect or show a success message after submission
    console.log("Form submitted:", data);
  };

  const handleExperienceLevelSelect = (selectedExperienceLevel) => {
    console.log('Selected experience level:', selectedExperienceLevel);
    experienceLevelRef.current = selectedExperienceLevel;
  };

  const handleToolsSelect = (selectedTools) => {
    console.log('Selected tools:', selectedTools);
    toolsPreferredRef.current = selectedTools;
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
                <TextField
                  autoComplete="off"
                  name="workDomain"
                  required
                  fullWidth
                  id="workDomain"
                  label="Work Domain"
                  autoFocus
                  inputRef={workDomainRef}
                />
              </Grid>
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
                <TextField
                  required
                  fullWidth
                  id="teamSize"
                  label="Team Size"
                  name="teamSize"
                  type="number"
                  inputRef={teamSizeRef}
                />
              </Grid>
              <Grid item xs={12}>
                <CheckboxSelector
                  options={toolsPreferredOptions}
                  onSelect={handleToolsSelect}
                  selectItem="Select Tools Preferred"
                />
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

