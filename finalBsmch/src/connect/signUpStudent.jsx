import React, { useContext,useRef } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Checkbox from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import languages from '../json/languages';
import ComboBoxSelector from '../newApi/comboBoxSelector';

const theme = createTheme();

export default function SignUpStudent({ formData }) {
    
    const languageRef = useRef();

    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        let obj = {
            institution: data.get('institution'),
            programmingEducation: data.get('programmingEducation'),
            linkedin: data.get('linkedin'),
            languages:  languageRef.current ,
            // environments: data.getAll('environments'), // Use getAll for multiple checkboxes
            experience: data.get('experience'),
            interests: data.get('interests'),
            about: data.get('about'),

        };

        console.log(obj);
        // Do something with the form data, e.g., send it to the server
        // navigate('/signUpStudent', { state: { formData: obj } });
    };
    const handleLanguageSelect = (selectedLanguage) => {
        // Do something with the selected language, e.g., update the state
        console.log('Selected Language:', selectedLanguage);
        languageRef.current = selectedLanguage;
        console.log('Selected Language:', selectedLanguage);
    };


    return (
        <ThemeProvider theme={theme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Grid container justifyContent="center">
                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>
                </Grid>
                <Typography component="h1" variant="h5" align="center">
                    Sign up Student
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="institution"
                                label="Institution"
                                id="institution"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="programmingEducation"
                                label="Programming Education"
                                id="programmingEducation"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="linkedin"
                                label="LinkedIn"
                                id="linkedin"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <ComboBoxSelector options={languages} onSelect={handleLanguageSelect} />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="experience"
                                label="Experience"
                                id="experience"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="interests"
                                label="Interests"
                                id="interests"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="about"
                                label="About Me"
                                id="about"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Submit
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Link href="./signin" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </Container>
        </ThemeProvider>
    );
}
