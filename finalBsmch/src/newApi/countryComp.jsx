// import React from 'react';
// import { useContext, useEffect, useState } from 'react';
// import { doApi } from './appApi';
// import { AppContext } from '../context/context';
// import Grid from '@mui/material/Grid';
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';

// const CountryNamesComponent = ({ defaultCountry }) => {
//   const { setCountriesAr } = useContext(AppContext);
//   const [commonNames, setCommonNames] = useState([]);
//   const {selectedCountry, setSelectedCountry} = useContext(AppContext);

//   useEffect(() => {
//     async function fetchCountryNames() {
//       try {
//         let url = 'https://restcountries.com/v3.1/all?fields=name';
//         let data = await doApi(url);
//         const names = data.map((item) => item.name.common);

//         setCommonNames(names);

//         if (setCountriesAr) {
//           setCountriesAr(names);
//         }
//       } catch (error) {
//         console.error('Error in fetchCountryNames:', error);
//         // Handle the error appropriately, e.g., display an error message to the user
//       }
//     }

//     fetchCountryNames();
//   }, [setCountriesAr]);
//   const handleChange = (event) => {
//     const selectedValue = event.target.value;
//     setSelectedCountry(selectedValue);
//   };

//   return (
//     <Grid item xs={12}>
//       <Select 
//         id="location"
//         label="Location"
//         value={selectedCountry}
//         // defaultValue={defaultCountry || " "}
//         style={{ width: '100%' }} // Adjust the width as needed
//         onChange={handleChange}
//       >
//         {commonNames.map((name) => (
//           <MenuItem key={name} value={name}>
//             {name}
//           </MenuItem>
//         ))}
//       </Select>
//     </Grid>
//   );
// };

// SelectComponent.jsx
import React, { useContext, useEffect, useState } from 'react';
import { doApi } from './appApi';
import { AppContext } from '../context/context';
import Grid from '@mui/material/Grid';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import CountryComp from './countryComp'; // Import the CountryComp component

const SelectComponent = ({ defaultCountry }) => {
  const { setCountriesAr } = useContext(AppContext);
  const [commonNames, setCommonNames] = useState([]);
  const { selectedCountry, setSelectedCountry } = useContext(AppContext);

  useEffect(() => {
    async function fetchCountryNames() {
      try {
        let url = 'https://restcountries.com/v3.1/all?fields=name';
        let data = await doApi(url);
        const names = data.map((item) => item.name.common);

        setCommonNames(names);

        if (setCountriesAr) {
          setCountriesAr(names);
        }
      } catch (error) {
        console.error('Error in fetchCountryNames:', error);
        // Handle the error appropriately, e.g., display an error message to the user
      }
    }

    fetchCountryNames();
  }, [setCountriesAr]);

  const handleChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedCountry(selectedValue);
  };

  return (
    <Grid container spacing={2}>
      {/* Include the CountryComp component */}
      <CountryComp />
      <Grid item xs={12}>
        <Select
          id="location"
          label="Location"
          value={selectedCountry}
          style={{ width: '100%' }} // Adjust the width as needed
          onChange={handleChange}
        >
          {commonNames.map((name) => (
            <MenuItem key={name} value={name}>
              {name}
            </MenuItem>
          ))}
        </Select>
      </Grid>
    </Grid>
  );
};

export default SelectComponent;
