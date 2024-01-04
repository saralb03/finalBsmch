import React, { useRef } from 'react';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Link from '@mui/material/Link';
import languages from '../json/languages';
import ComboBoxSelector from '../comps_stracture/comboBoxSelector';
import { post } from '../api/appApi';

const theme = createTheme();

export default function SignUpStudent({ formData }) {
  const languageRef = useRef();

  const handleLanguageSelect = (selectedLanguage) => {
    // Update the ref with the selected language
    languageRef.current = selectedLanguage;
    console.log('Selected Language:', selectedLanguage);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log(formData)
    // Create an object with form data
    const obj = {
      ...formData,
      institution: data.get('institution'),
      programmingEducation: data.get('programmingEducation'),
      linkedin: data.get('linkedin'),
      languages: languageRef.current,
      experience: data.get('experience'),
      interests: data.get('interests'),
      about: data.get('about'),
    };
    console.log(obj)
    // Use try-catch for asynchronous operations
    try {
      const response = await post(obj, {}, 'student');
      console.log(response);
    } catch (error) {
      console.error(error);
    }
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
            {/* Use a map function to avoid code duplication for similar form fields */}
            {[
              { label: 'Institution', name: 'institution' },
              { label: 'Programming Education', name: 'programmingEducation' },
              { label: 'LinkedIn', name: 'linkedin' },
              { label: 'Experience', name: 'experience' },
              { label: 'Interests', name: 'interests' },
              { label: 'About Me', name: 'about' },
            ].map((field) => (
              <Grid item xs={12} key={field.name}>
                <TextField
                  required
                  fullWidth
                  name={field.name}
                  label={field.label}
                  id={field.name}
                />
              </Grid>
            ))}
            <Grid item xs={12}>
              {/* Use a consistent naming convention for components */}
              <ComboBoxSelector options={languages} onSelect={handleLanguageSelect} selectItem="Select Language" />
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