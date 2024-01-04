import React, { useEffect, useState, useRef } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import SignUpStudent from "./SignUpStudent";
import SignUpCreator from "./SignUpCreator";
import { fetchCountryNames } from "../api/countriesAr";
import ComboBoxSelector from '../comps_stracture/comboBoxSelector';

// Modify UploadImageField to use forwardRef
const UploadImageField = React.forwardRef(({ onChange }, ref) => {
  return (
    <TextField
      fullWidth
      name="img_url"
      label="Profile Image"
      id="img_url"
      type="file"
      onChange={onChange}
      inputRef={ref}
    />
  );
});

function SignUp() {
  const theme = createTheme();
  const countryRef = useRef();
  const imgRef = useRef();
  const [countries, setCountries] = useState([]);
  const [formData, setFormData] = useState(null);
  const [userType, setUserType] = useState(null);

  const handleUserTypeSelect = (type) => {
    setUserType(type);
    submitForm();
  };

  const handleCountrySelect = (selectedCountry) => {
    countryRef.current = selectedCountry;
    console.log('Selected country:', selectedCountry);
  };

  const submitForm = () => {
    const data = new FormData(document.getElementById('signup-form'));
    const obj = {
      firstName: data.get("firstName"),
      lastName: data.get("lastName"),
      email: data.get("email"),
      password: data.get("password"),
      passwordConfirm: data.get("passwordConfirm"),
      phone: data.get("phone"),
      birth_date: data.get("birth_date"),
      info: data.get("info"),
      img_url: imgRef.current ? imgRef.current.files[0] : null,
      location: countryRef.current,
    };
    setFormData(obj);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const countryData = await fetchCountryNames();
        setCountries(countryData);
      } catch (error) {
        console.error('Error fetching country data:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <Box
            component="form"
            noValidate
            id="signup-form"
            sx={{ mt: 3 }}
          >
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="given-name"
                  name="firstName"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="family-name"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="new-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="Password Confirmation"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="repeated-password"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="phone"
                  label="Phone"
                  type="number"
                  id="phone"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="birth_date"
                  label="Birth Date"
                  type="date"
                  id="birth_date"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  name="info"
                  label="Info"
                  id="info"
                />
              </Grid>
              <Grid item xs={12}>
                <UploadImageField onChange={(e) => console.log(e.target.files[0])} ref={imgRef} />
              </Grid>
              <Grid item xs={12}>
                <ComboBoxSelector options={countries} onSelect={handleCountrySelect} selectItem="Select Country" />
              </Grid>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => handleUserTypeSelect('student')}
                sx={{ mt: 3, mb: 2 }}
              >
                Continue as Student
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={() => handleUserTypeSelect('creator')}
                sx={{ mt: 1, mb: 2 }}
              >
                Continue as Creator
              </Button>
            </Grid>
            <Grid container justifyContent="flex-end">
              <Grid item>
                <Link href="./signin" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
      {formData && userType === 'student' && <SignUpStudent formData={formData} />}
      {formData && userType === 'creator' && <SignUpCreator formData={formData} />}
    </ThemeProvider>
  );
}

export default SignUp;
