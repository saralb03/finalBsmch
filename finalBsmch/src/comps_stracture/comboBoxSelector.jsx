// import React, { useState } from 'react';
// import Grid from "@mui/material/Grid";
// import Select from '@mui/material/Select';
// import MenuItem from '@mui/material/MenuItem';

// const ComboBoxSelector = ({ options, onSelect, selectItem }) => {
//   const [selectedOption, setSelectedOption] = useState('');

//   const handleSelectChange = (event) => {
//     const value = event.target.value;
//     setSelectedOption(value);
//     onSelect(value); // Notify parent component of the selected option if needed
//   };

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={12}>
//         <Select
//           value={selectedOption}
//           onChange={handleSelectChange}
//           style={{ width: '100%' }}
//         >
//           <MenuItem value="" disabled>
//             {selectItem}
//           </MenuItem>
//           {options.map((option, index) => (
//             <MenuItem key={index + 1} value={option}>
//               {option}
//             </MenuItem>
//           ))}
//         </Select>
//       </Grid>
//     </Grid>
//   );
// };
// export default ComboBoxSelector


// import React, { useState } from 'react';
// import Grid from '@mui/material/Grid';
// import Autocomplete from '@mui/material/Autocomplete';
// import TextField from '@mui/material/TextField';

// const ComboBoxSelector = ({ options, onSelect, selectItem }) => {
//   const [selectedOption, setSelectedOption] = useState(null);

//   const handleSelectChange = (event, newValue) => {
//     const value = event.target.value;
//     setSelectedOption(newValue);
//     onSelect(newValue); // Notify parent component of the selected option if needed
//   };

//   return (
//     <Grid container spacing={2}>
//       <Grid item xs={12}>
//         <Autocomplete
//           value={selectedOption}
//           onChange={handleSelectChange}
//           options={options}
//           getOptionLabel={(option) => option}
//           renderInput={(params) => (
//             <TextField {...params} label={selectItem} fullWidth />
//           )}
//         />
//       </Grid>
//     </Grid>
//   );
// };

// export default ComboBoxSelector;

import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

const ComboBoxSelector = ({ options, onSelect, selectItem, error }) => {
  const [selectedOption, setSelectedOption] = useState(null);

  const handleSelectChange = (event, newValue) => {
    const value = event.target.value;
    setSelectedOption(newValue);
    onSelect(newValue); // Notify parent component of the selected option if needed
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Autocomplete
          value={selectedOption}
          onChange={handleSelectChange}
          options={options}
          getOptionLabel={(option) => option}
          renderInput={(params) => (
            <TextField
              {...params}
              label={selectItem}
              fullWidth
              error={error}
              helperText={error ? 'This field is required' : ''}
            />
          )}
        />
      </Grid>
    </Grid>
  );
};

export default ComboBoxSelector;