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

function StudentProjectProposal() {
    const navigate = useNavigate();
    const [errors, setErrors] = useState({});
    const projecSizes = ["small", "medium", "large"];
    const academicLevels = ["First Degree", "Second Degree", "Diploma", "Course"];
    const [projectSize, setProjectSize] = useState('');
    const [academicLevel, setAcademicLevel] = useState('');
    const [developmentTool, setDevelopmentTool] = useState('');
    const [developmentTools, setDevelopmentTools] = useState([]);
    const [interest, setInterest] = useState('');
    const [interests, setInterests] = useState([]);
    const locatio = useLocation();
    const { projectData: projectProposelData } = locatio.state || {};


    const { postData } = apiService();

    const submitForm = async (event) => {
        event.preventDefault();
        let obj = {
            ...projectProposelData,
            projectSize,
            academicLevel,
            mentorshipRequired,
            developmentTools,
            interests
        }
        const validationErrors = validate(obj);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            console.log(obj);
        }
        try {
            const response = await postData('student-projects', obj);
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

    const handleProjectSizeSelect = (selectedProjectSize) => {
        console.log('Selected project size:', selectedProjectSize);
        setProjectSize(selectedProjectSize);
    };


    const handleAcademicLevelSelect = (selectedAcademicLevel) => {
        console.log('Selected academic level:', selectedAcademicLevel);
        setAcademicLevel(selectedAcademicLevel);
    };
    const handleAddDevelopmentTool = () => {
        if (developmentTool.trim() !== '') {
            setDevelopmentTools((prevTools) => [...prevTools, developmentTool]);
            setDevelopmentTool('');
        }
    };

    const handleRemoveDevelopmentTool = (index) => {
        setDevelopmentTools((prevTools) =>
            prevTools.filter((_, i) => i !== index)
        );
    };
    const handleAddInterest = () => {
        if (interest.trim() !== '') {
            setInterests((prevInterests) => [...prevInterests, interest]);
            setInterest('');
        }
    };

    const handleRemoveInterest = (index) => {
        setInterests((prevInterests) =>
            prevInterests.filter((_, i) => i !== index)
        );
    };
    const [mentorshipRequired, setMentorshipRequired] = useState(false);

    const toggleMentorshipRequired = () => {
      setMentorshipRequired(!mentorshipRequired);
    };
  

    const validate = (values) => {
        const errors = {};
        if (!values.projecSize) {
            errors.projecSize= "Required";
        }
        if (!values.academicLevel) {
            errors.academicLevel= "Required";
        }
        if (values.developmentTools.length === 0) {
            errors.developmentTools = "At least one development tool is required";
        }
        if (values.interests.length === 0) {
            errors.interests = "At least one interest is required";
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
                                <ComboBoxSelector
                                    options={academicLevels}
                                    onSelect={handleAcademicLevelSelect}
                                    selectItem="Select Academic Level"
                                    error={!!errors.academicLevel}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <ComboBoxSelector
                                    options={projecSizes}
                                    onSelect={handleProjectSizeSelect}
                                    selectItem="Select Project Size"
                                    error={!!errors.projectSize}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom>
                                    Development Tools
                                </Typography>
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item xs={8}>
                                        <TextField
                                            fullWidth
                                            label="Add Development Tool"
                                            variant="outlined"
                                            value={developmentTool}
                                            onChange={(e) => setDevelopmentTool(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            onClick={handleAddDevelopmentTool}
                                        >
                                            Add
                                        </Button>
                                    </Grid>
                                    {developmentTools.map((tool, index) => (
                                        <Grid item key={index}>
                                            <Chip
                                                label={tool}
                                                onDelete={() => handleRemoveDevelopmentTool(index)}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>

                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom>
                                    Interests
                                </Typography>
                                <Grid container spacing={1} alignItems="center">
                                    <Grid item xs={8}>
                                        <TextField
                                            fullWidth
                                            label="Add Interest"
                                            variant="outlined"
                                            value={interest}
                                            onChange={(e) => setInterest(e.target.value)}
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            fullWidth
                                            variant="contained"
                                            color="primary"
                                            onClick={handleAddInterest}
                                        >
                                            Add
                                        </Button>
                                    </Grid>
                                    {interests.map((interest, index) => (
                                        <Grid item key={index}>
                                            <Chip
                                                label={interest}
                                                onDelete={() => handleRemoveInterest(index)}
                                            />
                                        </Grid>
                                    ))}
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <Typography variant="h6" gutterBottom>
                                    Mentorship
                                </Typography>
                                <Button
                                    fullWidth
                                    variant={mentorshipRequired ? 'contained' : 'outlined'}
                                    color={mentorshipRequired ? 'secondary' : 'primary'}
                                    onClick={toggleMentorshipRequired}
                                >
                                    {mentorshipRequired ? 'MentorshipRequired' : 'InMentorshipRequired'}
                                </Button>
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

export default StudentProjectProposal;

