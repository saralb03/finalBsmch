
import React, { useState } from 'react';
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
import { post } from '../api/appApi';
import Chip from '@mui/material/Chip';

const theme = createTheme();

export default function SignUpStudent({ formData }) {
  const [experience, setExperience] = useState('');
  const [experiences, setExperiences] = useState([]);

  const handleAddExperience = () => {
    if (experience.trim() !== '') {
      setExperiences((prevExperiences) => [...prevExperiences, experience]);
      setExperience('');
    }
  };

  const handleRemoveExperience = (index) => {
    setExperiences((prevExperiences) =>
      prevExperiences.filter((_, i) => i !== index)
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    // Create an object with form data
    const obj = {
      ...formData,
      institution: data.get('institution'),
      linkedin: data.get('linkedin'),
      experience:experiences,
      about: data.get('about'),
    };
    console.log(obj);

    // Use try-catch for asynchronous operations
    try {
      const response = await post(obj, {}, 'student');
      console.log(response);
    } catch (error) {
      console.error(error);
      alert(error.message);
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
          <Grid item xs={12} marginBottom={2}>
            <Typography variant="h6" gutterBottom>
              About Me
            </Typography>
            <TextField
              required
              fullWidth
              name="about"
              label="Tell us about yourself..."
              id="about"
              multiline
              rows={3}
            />
          </Grid>
          <Grid container spacing={2}>
            {[
              { label: 'Institution', name: 'institution' },
              { label: 'LinkedIn', name: 'linkedin' },
              { label: 'GitHub', name: 'GitHub' },
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
              <Typography variant="h6" gutterBottom>
                Experience
              </Typography>
              <Grid container spacing={1} alignItems="center">
                <Grid item xs={8}>
                  <TextField
                    fullWidth
                    label="Add Experience"
                    variant="outlined"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  />
                </Grid>
                <Grid item xs={4}>
                  <Button
                    fullWidth
                    variant="contained"
                    color="primary"
                    onClick={handleAddExperience}
                  >
                    Add
                  </Button>
                </Grid>
                {experiences.map((exp, index) => (
                  <Grid item key={index}>
                    <Chip
                      label={exp}
                      onDelete={() => handleRemoveExperience(index)}
                    />
                  </Grid>
                ))}
              </Grid>
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
              <Link href="./login" variant="body2">
                Already have an account? Log in
              </Link>
            </Grid>
          </Grid>
        </form>
      </Container>
    </ThemeProvider>
  );
}
