import React, { useState } from "react";
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
import proffesions from "../json/proffesions";
import ComboBoxSelector from "../comps_stracture/comboBoxSelector";
import workEnvironment from "../json/work";
import Chip from "@mui/material/Chip";
import { post } from '../api/appApi';
import { apiService } from '../api/apiService';
import { useNavigate } from "react-router-dom";

const theme = createTheme();

function ProjectProposal() {
  const [formData, setFormData] = useState(null);
  const [rolled, setRolled] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState("");
  const [selectedProfession, setSelectedProfession] = useState("");
  const [selectedFlexibility, setSelectedFlexibility] = useState("");
  const [selectedWorkEnvironments, setSelectedWorkEnvironments] = useState("");
  const [style, setStyle] = useState(" ");
  const [styles, setStyles] = useState([]);
  const [teamSize, setTeamSize] = useState("");
  const [active, setActive] = useState(false);
  const [errors, setErrors] = useState({});
  const {postData} = apiService();
  const navigate = useNavigate();

  const handleAddStyle = () => {
    if (style.trim() !== "") {
      setStyles((prevStyles) => [...prevStyles, style]);
      setStyle("");
    }
  };

  const handleRemoveStyle = (index) => {
    setStyles((prevStyles) => prevStyles.filter((_, i) => i !== index));
  };

  const handleProfessionSelect = (selectedProfessionName) => {
    setSelectedProfession(selectedProfessionName);
  };

  const handleFlexibilitySelect = (selectedLevel) => {
    setSelectedFlexibility(selectedLevel);
  };

  const handleWorkEnvironmentSelect = (selectedWorkEnvironment) => {
    setSelectedWorkEnvironments(selectedWorkEnvironment);
  };

  const submitForm = async() => {
    const currentDate = new Date();
    const _id = localStorage.getItem('_id');
    const obj = {
      title,
      description,
      duration: parseInt(duration, 10),
      profession: selectedProfession,
      flexible: selectedFlexibility,
      workEnvironment: selectedWorkEnvironments,
      style: styles,
      teamSize: parseInt(teamSize, 10),
      dateCreated: currentDate,
      active,
      createdBy:_id
    };

    const validationErrors = validate(obj);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      console.log(obj);
      setFormData(obj);
    }

    const user = window.localStorage.getItem('user');
    if(user ==="student")
    {
      navigate('/studentProjectProposel', { state: { projectData: obj } })
    }
    else if(user ==="creator")
    {
      navigate('/creatorProjectProposel', { state: { projectData: obj } })
    }

  };

  const validate = (values) => {
    const errors = {};
    if (!values.title) {
      errors.title = "Required";
    } else if (values.title.length < 2 || values.title.length > 99) {
      errors.title = "Title should be between 2 and 99 characters";
    }
    if (!values.description) {
      errors.description = "Required";
    } else if (
      values.description.length < 2 ||
      values.description.length > 99
    ) {
      errors.description =
        "Description should be between 2 and 99 characters";
    }
    if (!values.duration) {
      errors.duration = "Required";
    }
    if (!values.profession) {
      errors.profession = "Required";
    }
    if (!values.flexible) {
      errors.flexible = "Required";
    }
    if (!values.workEnvironment) {
      errors.workEnvironment = "Required";
    }
    if (values.style.length === 0) {
      errors.style = "At least one style is required";
    }
    
    if (!values.teamSize) {
      errors.teamSize = "Required";
    }
    return errors;
  };

  const toggleRoll = () => {
    setRolled(!rolled);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container
        component="main"
        maxWidth={rolled ? "xs" : "sm"}
        style={{ marginTop: "6rem" }}
      >
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Typography component="h1" variant="h5">
            Project Proposal
          </Typography>
          <Box component="form" noValidate id="signup-form" sx={{ mt: 3 }}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  autoComplete="off"
                  name="title"
                  required
                  fullWidth
                  id="title"
                  label="Project Title"
                  autoFocus
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  error={Boolean(errors.title)}
                  helperText={errors.title}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="description"
                  label="Project Description"
                  name="description"
                  multiline
                  rows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  error={Boolean(errors.description)}
                  helperText={errors.description}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="duration"
                  label="Project Duration in days"
                  name="duration"
                  type="number"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  error={Boolean(errors.duration)}
                  helperText={errors.duration}
                />
              </Grid>
              <Grid item xs={12}>
                <ComboBoxSelector
                  options={proffesions}
                  onSelect={handleProfessionSelect}
                  selectItem={"select profession"}
                  error={!!errors.profession}
                />
              </Grid>
              <Grid item xs={12}>
                <ComboBoxSelector
                  options={["Low", "Middle", "High"]}
                  onSelect={handleFlexibilitySelect}
                  selectItem={"select flexibility level"}
                  error={!!errors.flexible}
                />
              </Grid>
              <Grid item xs={12}>
                <ComboBoxSelector
                  options={workEnvironment}
                  onSelect={handleWorkEnvironmentSelect}
                  selectItem={"select work environment"}
                  error={!!errors.workEnvironment}
                />
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" gutterBottom>
                  Style
                </Typography>
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={8}>
                    <TextField
                      fullWidth
                      label="Add Style"
                      variant="outlined"
                      value={style}
                      onChange={(e) => setStyle(e.target.value)}
                      error={Boolean(errors.style)}
                      helperText={errors.style}
                    />
                  </Grid>
                  <Grid item xs={4}>
                    <Button
                      fullWidth
                      variant="contained"
                      color="primary"
                      onClick={handleAddStyle}
                    >
                      Add
                    </Button>
                  </Grid>
                  {styles.map((s, index) => (
                    <Grid item key={index}>
                      <Chip
                        label={s}
                        onDelete={() => handleRemoveStyle(index)}
                      />
                    </Grid>
                  ))}
                  {errors.style && (
                    <div style={{ color: "red" }}>{errors.style}</div>
                  )}
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <TextField
                  required
                  fullWidth
                  id="teamSize"
                  label="Team size"
                  name="teamSize"
                  type="number"
                  value={teamSize}
                  onChange={(e) => setTeamSize(e.target.value)}
                  error={Boolean(errors.teamSize)}
                  helperText={errors.teamSize}
                />
              </Grid>
              <Grid item xs={12}>
                <label>
                  <input
                    type="checkbox"
                    checked={active}
                    onChange={() => setActive(!active)}
                  />
                  Active
                </label>
                {errors.active && (
                  <div style={{ color: "red" }}>{errors.active}</div>
                )}
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
                Continue
              </Button>
            </Grid>
            <Grid item xs={12}>
              <Button
                fullWidth
                variant="contained"
                color="primary"
                onClick={toggleRoll}
                sx={{ mt: 1, mb: 2 }}
              >
                {rolled ? "Expand Form" : "Roll Form"}
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

export default ProjectProposal;
