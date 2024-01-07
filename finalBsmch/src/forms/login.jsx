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
  TOKEN_NAME, TOKEN_ROLE,TOKEN_ID ,regEmail, regPassword
} from '../services/service1';
import {useState} from 'react';
import { post } from '../api/appApi';
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

  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async(event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let obj = {
        email: data.get('email'),
        password: data.get('password')
    }
    try {
      const response = await post(obj, {}, 'login');
      console.log(response);
      const token = response.data;
      console.log(token);
      window.localStorage.setItem('token', token);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };
  const doApi = async (_dataBody) => {
    try {
      const url = API_URL + '/users/login';
      const { data } = await doApiMethodSignUpLogin(url, "POST", _dataBody);
      console.log(data);
      if (data.token) {
        localStorage.setItem(TOKEN_ROLE, data.userRole);
        localStorage.setItem(TOKEN_NAME, data.token);
        localStorage.setItem(TOKEN_ID, data.id);
        console.log(data);
        if (data.userRole == "admin"||data.userRole == "superadmin") {
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
          width:'100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid container component="main" sx={{ height: '100%', width:'100%'}}>
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




