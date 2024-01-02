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
import { fetchCountryNames } from "../newApi/countriesAr";
import ComboBoxSelector from '../newApi/comboBoxSelector';

function UploadImageField({ onChange }) {
    return (
        <TextField
            fullWidth
            name="img_url"
            label="Profile Image"
            id="img_url"
            type="file"
            onChange={onChange}
        />
    );
}

function SignUp() {
    const theme = createTheme();
    const countryRef = useRef();
    const [countries, setCountries] = useState([]);
    const [formData, setFormData] = useState(null);
    const [userType, setUserType] = useState(null);
    const [image, setImage] = useState(null);
    // const [allImage, setAllImage] = useState(null);

    // useEffect(() => {
    //     getImage();
    // }, []);
    // const submitImage = async (e) => {
    //     e.preventDefault();

    //     const formData = new FormData();
    //     formData.append("image", image);

    //     const result = await axios.post(
    //         "http://localhost:3000/upload-image",
    //         formData,
    //         {
    //             headers: { "Content-Type": "multipart/form-data" },
    //         }
    //     );
    // };

    // const onInputChange = (e) => {
    //     console.log(e.target.files[0]);
    //     setImage(e.target.files[0]);
    // };

    // const getImage = async () => {
    //     const result = await axios.get("http://localhost:5000/get-image");
    //     console.log(result);
    //     setAllImage(result.data.data);
    // };

    const handleUserTypeSelect = (type) => {
        setUserType(type);
        submitForm(); // Call the form submission function when user type is selected
    };

    const handleCountrySelect = (selectedCountry) => {
        console.log('Selected country:', selectedCountry);
        countryRef.current = selectedCountry;
        console.log('Selected country:', selectedCountry);
    };

    const submitForm = () => {
        // The logic for form submission
        const data = new FormData(document.getElementById('signup-form'));

        let obj = {
            firstName: data.get("firstName"),
            lastName: data.get("lastName"),
            email: data.get("email"),
            password: data.get("password"),
            phone: data.get("phone"),
            birth_date: data.get("birth_date"),
            info: data.get("info"),
            img_url: data.get("img_url"),
            location: countryRef.current
        };
        console.log(obj);
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
                        id="signup-form" // Added an ID to the form
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
                                <UploadImageField onChange={(e) => console.log(e.target.files[0])} />
                                {/* <TextField type="file" accept="image/*" id="img_url" onChange={onInputChange}></TextField> */}
                            </Grid>
                            <Grid item xs={12}>
                                <ComboBoxSelector options={countries} onSelect={handleCountrySelect} selectItem={"select country"} />
                            </Grid>
                            {/* Add more fields as needed */}
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
