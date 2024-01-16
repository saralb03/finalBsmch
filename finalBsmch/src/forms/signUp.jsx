
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
import  Axios  from "axios";


// Modify UploadImageField to use forwardRef
const UploadImageField = React.forwardRef(({ onChange, imgRef }, ref) => {
    return (
        <TextField
            fullWidth
            name="img_url"
            label="Profile Image"
            id="img_url"
            type="file"
            onChange={(e) => onChange(e, imgRef)}
            inputRef={ref}
        />
    );
});
const handleImageChange = async (e,imgRef) => {
    const file = e.target.files[0];
    if (file) {
      try {
        const imageUrl = await uploadImage(file);
  
        // Update the form state with the Cloudinary image URL
        // setFormData((prevData) => ({
        //   ...prevData,
        //   image: imageUrl,
        // }));
        // imgRef.current = imageUrl;
        // console.log(imageUrl);
        // console.log(imgRef.current);
        imgRef.current = imageUrl;
        console.log("image orogine:"+imageUrl);
        console.log("image ref:"+imgRef.current);
      } catch (error) {
        console.error('Error uploading image to Cloudinary:', error);
      }
    }
  };
  const uploadImage = async (file) => {
    if (!file) {
      throw new Error('No file provided');
    }
  
    try {
      const cloudinaryUrl = 'https://api.cloudinary.com/v1_1/djrm2l6wk/image/upload';
      const uploadPreset = 'u08kwjh7';
  
      const formData = new FormData();
      formData.append('file', file);
      formData.append('upload_preset', uploadPreset);
  
    const response = await Axios.post(cloudinaryUrl, formData);
  
      if (response.status === 200) {
        return response.data.secure_url;
      } else {
        console.error('Cloudinary Response:', response);
        throw new Error('Failed to upload image to Cloudinary');
      }
    } catch (error) {
      console.error('Error uploading image to Cloudinary:', error);
      throw error;
    }
  };
function SignUp() {
    const theme = createTheme();
    const countryRef = useRef();
    const imgRef = useRef();
    const [countries, setCountries] = useState([]);
    const [formData, setFormData] = useState(null);
    const [userType, setUserType] = useState(null);
    const [errors, setErrors] = useState({});

    const handleUserTypeSelect = (type) => {
        setUserType(type);
        submitForm();
    };

    const handleCountrySelect = (selectedCountry) => {
        countryRef.current = selectedCountry;
        console.log('Selected country:', selectedCountry);
        const placeholderElement = document.getElementById('location-placeholder');
        if (placeholderElement) {
            placeholderElement.innerText = selectedCountry;
        }
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
            img_url:imgRef.current,
            location: countryRef.current,
        };
        const validationErrors = validate(obj);
        setErrors(validationErrors);
        if (Object.keys(validationErrors).length === 0) {
            setFormData(obj);
        }
    };

    const validate = (values) => {
        const errors = {}
        if (!values.firstName) {
            errors.firstName = 'Required'
        } else if (values.firstName.length < 2 || values.firstName.length > 99) {
            errors.firstName = 'First name should be between 2 and 99 characters'
        }
        if (!values.lastName) {
            errors.lastName = 'Required'
        } else if (values.lastName.length < 2 || values.lastName.length > 99) {
            errors.lastName = 'Last name should be between 2 and 99 characters'
        }
        if (!values.email) {
            errors.email = 'Required'
        } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
            errors.email = 'Invalid email address'
        }
        if (!values.password) {
            errors.password = 'Required';
        } else {
            // Password regex pattern for at least one digit, one lowercase letter, one uppercase letter, and 8-32 characters
            const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,32}$/;
            if (!reg.test(values.password)) {
                errors.password = 'Password must contain at least one digit, one lowercase letter, one uppercase letter, and be 8-32 characters long';
            }
        }
        if (!values.passwordConfirm) {
            errors.passwordConfirm = 'Required';
        } else {
            if (values.passwordConfirm !== values.password) {
                errors.passwordConfirm = 'Passwords do not match';
            }
        }

        if (!values.phone) {
            errors.phone = 'Required'

        } else if (!values.phone.match(/^\d{10}$/)) {
            errors.phone = 'Please provide a valid phone number'
        }
        if (!values.birth_date) {
            errors.birth_date = 'Required';
        } else {
            const today = new Date();
            today.setHours(0, 0, 0, 0);

            const birthdate = new Date(values.birth_date);

            // Check whether the provided date is equal to or less than the current date.
            if (birthdate > today) {
                errors.birth_date = 'Birth date must not be in the future';
            }
        }
        if (!values.location || !values.location.trim()) {
            errors.location = 'Required';
        }

        console.log(values.location);
        return errors
    }

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
                    <Avatar sx={{ m: 4, bgcolor: "secondary.main" }}>
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
                                    helperText={errors.firstName}
                                    error={Boolean(errors.firstName)}
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
                                    helperText={errors.lastName}
                                    error={Boolean(errors.lastName)}
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
                                    helperText={errors.email}
                                    error={Boolean(errors.email)}
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
                                    helperText={errors.password}
                                    error={Boolean(errors.password)}
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
                                    helperText={errors.passwordConfirm}
                                    error={Boolean(errors.passwordConfirm)}
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
                                    helperText={errors.phone}
                                    error={Boolean(errors.phone)}
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
                                    helperText={errors.birth_date}
                                    error={Boolean(errors.birth_date)}
                                />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    name="info"
                                    label="Info"
                                    id="info"
                                    helperText={errors.info}
                                    error={Boolean(errors.info)}
                                />
                            </Grid> */}
                            <Grid item xs={12}>
                                <UploadImageField onChange={handleImageChange} ref={imgRef} imgRef={imgRef}  />
                            </Grid>
                            {/* <Grid item xs={12}>
                                <UploadImageField onChange={(e) => console.log(e.target.files[0])} ref={imgRef} />
                            </Grid> */}
                            <Grid item xs={12}>
                                <ComboBoxSelector options={countries} onSelect={handleCountrySelect} selectItem="Select Country" error={!!errors.location} />
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
                                <Link href="./login" variant="body2">
                                    Already have an account? Log in
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
