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
import ComboBoxSelector from '../comps_stracture/comboBoxSelector';
import { post } from '../api/appApi'

const theme = createTheme();

export default function SignUpCreator({ formData }) {
    const languageRef = useRef();

    const handleSubmit = async (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log(formData)
        let obj = {
            ...formData,
            entrepreneurshipExperience: data.get('entrepreneurshipExperience'),
            professionalBackground: data.get('professionalBackground'),
            about: data.get('about'),
            linkedin: data.get('linkedin'),
            portfolio: data.get('portfolio'),
        };

        console.log(obj);
        // Do something with the form data, e.g., send it to the server
        // navigate('/signUpStudent', { state: { formData: obj } });
        try {
            const response = await post(obj, {}, 'creator');
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
                    Sign up Creator
                </Typography>
                <form noValidate onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="entrepreneurshipExperience"
                                label="Entrepreneurship Experience"
                                id="entrepreneurshipExperience"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="professionalBackground"
                                label="Professional Background"
                                id="professionalBackground"
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
                            <TextField
                                required
                                fullWidth
                                name="portfolio"
                                label="Portfolio"
                                id="portfolio"
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
