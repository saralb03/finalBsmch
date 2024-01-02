import React, { useState } from 'react';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from "@mui/material/Grid";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Typography from '@mui/material/Typography';

const CheckboxSelector = ({ options, onSelect, selectItem }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleCheckboxChange = (event) => {
    const value = event.target.value;
    const updatedOptions = selectedOptions.includes(value)
      ? selectedOptions.filter((option) => option !== value)
      : [...selectedOptions, value];

    setSelectedOptions(updatedOptions);
    onSelect(updatedOptions); // Notify parent component of the selected options if needed
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
      <Typography variant="h6" gutterBottom>
          {selectItem}
        </Typography>
        <FormControl>
          <FormGroup>
            {options.map((option, index) => (
              <FormControlLabel
                key={index + 1}
                control={
                  <Checkbox
                    checked={selectedOptions.includes(option)}
                    onChange={handleCheckboxChange}
                    value={option}
                  />
                }
                label={option}
              />
            ))}
          </FormGroup>
        </FormControl>
      </Grid>
    </Grid>
  );
};

export default CheckboxSelector;

