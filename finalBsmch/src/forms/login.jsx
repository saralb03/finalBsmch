import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import {
  API_URL, doApiMethodSignUpLogin,
  TOKEN_NAME, TOKEN_ROLE, TOKEN_ID, regEmail, regPassword
} from '../services/service1';
import { useState } from 'react';
import { post } from '../api/appApi';
import { apiService } from '../api/apiService';



function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const defaultTheme = createTheme();

export default function LogIn() {
  const { postData } = apiService();
  const { getAuthenticatedData } = apiService();

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let obj = {
      email: data.get('email'),
      password: data.get('password')
    }
    try {
      const response1 = await postData('login', obj);
      const token = response1.token;
      console.log(token);
      window.localStorage.setItem('token', token);
      const response2 = await getAuthenticatedData('myInfo', token);
      console.log(response2);

      const role = response2.role;
      const _id = response2._id;
      const firstName = response2.firstName;
      const lastName = response2.lastName;
      const email = response2.email;
      const phone = response2.phone;
      const birthDate = response2.birth_date;
      const imgUrl = response2.img_url;
      const location = response2.location;
      const dateCreated = response2.date_created;
      const user = response2.__t;
      window.localStorage.setItem('token', token);
      window.localStorage.setItem('role', role);
      window.localStorage.setItem('_id', _id);
      window.localStorage.setItem('firstName', firstName);
      window.localStorage.setItem('lastName', lastName);
      window.localStorage.setItem('email', email);
      window.localStorage.setItem('phone', phone);
      window.localStorage.setItem('birthDate', birthDate);
      window.localStorage.setItem('imgUrl', imgUrl);
      window.localStorage.setItem('location', location);
      window.localStorage.setItem('dateCreated', dateCreated);

      if (user ==='students') {

        const institution = response2.institution;
        const linkedin = response2.linkedin;
        const experience = response2.experience;
        const about = response2.about;
        const github = response2.github;
        window.localStorage.setItem('institution', institution);
        window.localStorage.setItem('linkedin', linkedin);
        window.localStorage.setItem('experience', experience);
        window.localStorage.setItem('about', about);
        window.localStorage.setItem('github', github);
        window.localStorage.setItem('user','student');
      }
      else if (user ==='creators') {
        const entrepreneurshipExperience = response2.entrepreneurshipExperience;
        const professionalBackground = response2.professionalBackground;
        const about = response2.about;
        const linkedin = response2.linkedin;
        const portfolio = response2.portfolio;
        window.localStorage.setItem('entrepreneurshipExperience', entrepreneurshipExperience);
        window.localStorage.setItem('professionalBackground', professionalBackground);
        window.localStorage.setItem('about', about);
        window.localStorage.setItem('linkedin', linkedin);
        window.localStorage.setItem('portfolio', portfolio);
        window.localStorage.setItem('user','creator');

      }
      else{
        window.localStorage.setItem('user','user');
      }


      // Add more constants as needed


      window.localStorage.setItem('role', role);
      window.localStorage.setItem('_id', _id);




    } catch (error) {
      console.error(error);
      alert(error.message);
    }


  };
  const doApi = async (_dataBody) => {
    try {
      const url = API_URL + '/login';
      const { data } = await post(url);
      console.log(data);
      if (data.token) {
        localStorage.setItem(TOKEN_ROLE, data.userRole);
        localStorage.setItem(TOKEN_NAME, data.token);
        localStorage.setItem(TOKEN_ID, data.id);
        console.log(data);
        if (data.userRole == "admin" || data.userRole == "superadmin") {
          nav("/admin");
        } else if (data.userRole == 'user') {
          nav("/");
        }
      }

    } catch (err) {

      setIsSubmitted(false);
      alert(err.response.data.msg);
    }
  }

  return (
    <ThemeProvider theme={defaultTheme} >
      <CssBaseline />
      <Box
        sx={{
          height: '100vh',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container component="main" sx={{ height: '100%', width: '100%' }}>
          {/* Left Section - Image */}
          <Grid
            item
            xs={6}
            sm={6}
            sx={{
              backgroundImage: 'url(https://source.unsplash.com/random?wallpapers)',
              backgroundRepeat: 'no-repeat',
              backgroundColor: (t) =>
                t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {/* You can customize this section with additional content */}
            <Typography component="h1" variant="h5" color="white">
              Welcome to My Website
            </Typography>
          </Grid>
          {/* Right Section - Sign In Form */}
          <Grid item xs={6} sm={6} component={Paper} elevation={6} square>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                height: '100%',
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                Log in
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1, width: '100%' }}>
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  autoFocus
                />
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                />
                <FormControlLabel
                  control={<Checkbox value="remember" color="primary" />}
                  label="Remember me"
                />
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  sx={{ mt: 3, mb: 2 }}
                >
                  Log In
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="/forgotPassword" variant="body2">
                      {"Forgot password?"}
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="/signUp" variant="body2">
                      {"Don't have an account? Sign Up"}
                    </Link>
                  </Grid>
                </Grid>
                <Copyright sx={{ mt: 5 }} />
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </ThemeProvider>
  );
}




