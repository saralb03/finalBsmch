import React, { useState, useEffect } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";

const SelectComponent = ({ onSelectChange }) => {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState("");

  useEffect(() => {
    // Replace 'YOUR_API_ENDPOINT' with the actual API endpoint
    fetch("https://restcountries.com/v3.1/all?fields=name")
      .then((response) => response.json())
      .then((data) => setCountries(data))
      .catch((error) => console.error("Error fetching countries:", error));
  }, []);

  const handleCountryChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCountry(selectedValue);
    onSelectChange(selectedValue);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="country-label">Select Country</InputLabel>
      <Select
        labelId="country-label"
        id="country"
        value={selectedCountry}
        onChange={handleCountryChange}
      >
        {countries.map((country, index) => (
          <MenuItem key={index} value={country}>
            {country}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectComponent;
